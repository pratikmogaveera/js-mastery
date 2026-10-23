# js-mastery — Notes

Detailed concepts, mental models, patterns, and Q&A. Appended after each completed topic.

---

## Section 1 — Foundations

---

## Section 2 — Core Concepts

---

## Section 3 — Async JavaScript

---

## Section 4 — Advanced Features

---

## Section 5 — Design Patterns

---

## Section 6 — Performance & Internals

## Closures

### Concept

When a function is defined inside another function, it retains access to the outer function's variables even after the outer function has finished executing. The inner function "closes over" the outer scope — that's a closure.

**Backpack mental model:** when an inner function is created, it packs up all variables visible in its outer scope. The outer function can finish and disappear — the inner function's backpack stays with it.

**Key properties:**
- Each call to the outer function creates a new, independent closure — separate backpacks, separate state
- The closed-over variable is the actual variable, not a copy — mutations persist across calls
- Closures enable private state without global variables

### Patterns

```js
// Factory — captures config, returns a function that uses it
function makeAdder(base) {
    return function (num) { return base + num }
}
const add5 = makeAdder(5)
add5(3)  // 8

// Stateful counter — closed-over variable mutates across calls
function makeCounter(start = 0) {
    return function () { return start += 1 }
}
const counter = makeCounter()
counter()  // 1, 2, 3... each call mutates the same `start`

// once — executes fn only on first call, caches result
function once(fn) {
    let called = false
    let result
    return function () {
        if (!called) {
            result = fn()
            called = true
        }
        return result
    }
}

// memoize — caches results by argument
function memoize(fn) {
    const cache = {}
    return function (arg) {
        if (arg in cache) return cache[arg]
        const result = fn(arg)
        cache[arg] = result
        return result
    }
}
```

### Gotchas

**Falsy cache values in memoize:** `if (cache[key])` re-executes `fn` when the cached result is `0`, `false`, `null`, or `""`. Always check key existence with `key in cache`, not value truthiness.

**`once` flag vs result as guard:** using `if (!result)` as the re-execution check breaks when `fn` returns a falsy value. A separate boolean flag (`called`) is always reliable regardless of return value.

**`var` in loops (classic closure gotcha):**
```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0)  // logs 3, 3, 3
}
// var is function-scoped — all callbacks close over the same `i`
// Fix: use let (block-scoped — each iteration gets its own `i`)
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0)  // logs 0, 1, 2
}
```

### Q&A

**Why are two counters independent?**
Each `makeCounter()` call creates a new execution context with its own `start` variable. The returned functions close over *different* `start` variables — they don't share state.

**Why use `num in cache` over `cache[num] !== undefined`?**
`cache[num] !== undefined` still re-executes `fn` if it returns `undefined`. `num in cache` checks key existence regardless of stored value — correct for all return types.

**Why does `once` need a separate `called` flag?**
If you used the result as the guard (`if (!result)`), any falsy return value (`0`, `false`, `null`, `undefined`) would cause `fn` to re-execute. The boolean flag is independent of the return value.

## `this` keyword

### Concept

`this` is not set when a function is *defined* — it's set when a function is *called*. Ask: **who is calling this function?**

JS determines `this` using four rules, applied in priority order:

| Rule | How it looks | `this` is |
|------|-------------|-----------|
| `new` | `new Fn()` | the newly created object |
| Explicit | `fn.call(obj)` / `fn.apply(obj)` / `fn.bind(obj)` | `obj` |
| Implicit | `obj.fn()` | `obj` — the thing before the dot |
| Default | `fn()` | `undefined` (strict) / `global` (non-strict) |

Arrow functions are the exception — they have no own `this`. They inherit `this` from their **lexical scope** (where they were defined).

### The Lost `this` Problem

Detaching a method from its object loses implicit binding:

```js
const counter = { count: 1, increment: function () { console.log(this.count) } }

counter.increment()              // 1 — implicit binding
const fn = counter.increment
fn()                             // undefined — default binding
```

Same function, different `this` — because the **call site** changed, not the function.

### Arrow Function Fix — Nested Functions Only

Arrow functions fix `this` inside nested functions (they inherit from the enclosing method), but **not** the detached method problem:

```js
const counter = {
    count: 1,
    increment: function () {
        const inner = () => console.log(this.count)  // inherits this from increment
        inner()
    }
}
counter.increment()              // 1 ✓
const fn = counter.increment
fn()                             // undefined — increment itself still loses this
```

### Arrow Functions as Object Methods — Gotcha

Never use arrow functions as object methods when you need `this` to refer to the object:

```js
const counter = {
    count: 1,
    increment: () => console.log(this.count)  // lexical scope = global/module, not the object
}
counter.increment()   // undefined
```

Object literals don't create a scope. The arrow function's lexical scope is wherever the object literal was written — typically the module/global scope.

### Fix Summary

| Problem | Fix |
|---------|-----|
| Nested function loses `this` | Arrow function |
| Detached method loses `this` | `bind` |
| Call method with different `this` | `call` / `apply` |

### Q&A

**Why does `const fn = obj.method` lose `this`?**
Assigning the method to a variable just copies the function reference. The association with `obj` is gone. When called as `fn()`, there's no object before the dot — default binding applies.

**Why can't arrow functions fix the detached method problem?**
Arrow functions inherit `this` from their lexical scope — where they're *defined*. For a method on an object literal, the lexical scope is the module/global scope, not the object. So the arrow function inherits `this = global`, not `this = obj`.

## call and apply

### Concept

Both invoke a function immediately with an explicit `this` context. The only difference is how arguments are passed:

```js
fn.call(thisArg, arg1, arg2)      // args passed individually
fn.apply(thisArg, [arg1, arg2])   // args passed as an array
```

**Memory trick:** `apply` → **a**rray.

### When to use which

- **`call`** — when you know the args upfront and pass them individually
- **`apply`** — when args are already in an array (dynamic arg lists, forwarding args)

### Method borrowing

Use a method from one object on another without copying it:

```js
const user = { name: 'Pratik', role: 'user', describe() { console.log(`${this.name} - ${this.role}`) } }
const admin = { name: 'Admin', role: 'admin' }

user.describe.call(admin)   // Admin - admin
user.describe.apply(admin)  // Admin - admin
```

### Patterns

```js
// Borrow Array.prototype.slice on array-like objects
function toArray(arrayLike) {
    return Array.prototype.slice.call(arrayLike)
}
toArray({ 0: 1, 1: 2, length: 2 })  // [1, 2]

// Run a function across multiple contexts
function runForAll(fn, contexts) {
    for (const ctx of contexts) fn.call(ctx)
}

// Call a function with args from arrays
function applyAll(fn, argArrays) {
    return argArrays.map(args => fn.apply(null, args))
}
applyAll(Math.max, [[1,2,3], [4,5,6]])  // [3, 6]

// Reliable type checking — bypasses overridden toString
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}
getType(null)     // 'Null'
getType([])       // 'Array'
getType(42)       // 'Number'
```

### Gotchas

**Why `Object.prototype.toString.call(value)` and not `value.toString()`?**
- `null.toString()` throws TypeError
- Primitives and built-ins override `toString` — `(42).toString()` returns `"42"`, not `"[object Number]"`
- `Object.prototype.toString` is the original, unoverridden version — `call` lets you invoke it safely against any value including `null` and `undefined`

**`apply` with `Math.max`:**
```js
Math.max.apply(null, [5, 2, 8])  // 8
// null because Math.max doesn't use `this`
// modern equivalent: Math.max(...[5, 2, 8])
```

## bind

### Concept

`bind` returns a **new function** with `this` permanently locked. Unlike `call`/`apply`, it does not invoke immediately.

```js
fn.call(ctx, arg)    // invokes now
fn.apply(ctx, [arg]) // invokes now
fn.bind(ctx, arg)    // returns new function — invokes later
```

Think of `bind` as: *"give me a version of this function that always uses this `this`."*

### The callback problem

When a method is passed as a callback, it detaches from its object and loses `this`:

```js
setTimeout(obj.greet, 100)              // this = global — broken
setTimeout(obj.greet.bind(obj), 100)    // this = obj — fixed permanently
```

### Partial application

`bind` can pre-fill arguments in addition to `this`. Pass `null` as context when `this` isn't needed:

```js
function multiply(a, b) { return a * b }

const double = multiply.bind(null, 2)   // a = 2, permanently
double(5)  // 10
double(8)  // 16
```

### Patterns

```js
// Fix detached method — this permanently locked
const incr = counter.increment.bind(counter)
incr()  // this = counter, always

// Partial application
const double = multiply.bind(null, 2)

// bindAll — bind multiple methods at once
function bindAll(obj, methods) {
    for (const method of methods) {
        obj[method] = obj[method].bind(obj)
    }
}
bindAll(timer, ['increment', 'decrement', 'value'])
const { increment } = timer  // still works — this is locked
```

### call vs apply vs bind

| | Invokes | Args |
|---|---------|------|
| `call` | Immediately | Individually |
| `apply` | Immediately | As array |
| `bind` | Later (returns fn) | Pre-filled or at call time |

### Q&A

**Why `null` as context in `multiply.bind(null, 2)`?**
`multiply` doesn't use `this` — we only want partial application. `null` signals "no specific `this` needed."

**Does `bind` create a new function every time?**
Yes — each `bind` call returns a new function object. Be aware of this in performance-sensitive code (e.g., inside render loops in React).

**Can you bind an already-bound function?**
Yes, but the first `bind` wins. A bound function's `this` cannot be overridden by a second `bind`, `call`, or `apply`.
