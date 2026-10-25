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
const user = { name: 'Joe', role: 'user', describe() { console.log(`${this.name} - ${this.role}`) } }
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

## Currying & Partial Application

### Concept

Currying transforms a function so that when called with **fewer arguments than expected**, it **returns a new function with those arguments pre-filled**. This repeats until all arguments are collected, at which point the **original function executes**.

```js
curriedJoin(1, 2, 3)  // all args at once — executes
curriedJoin(1)(2, 3)  // partial → partial → executes
curriedJoin(1, 2)(3)  // partial → executes
curriedJoin(1)(2)(3)  // partial → partial → executes
```

**Partial application** is the practical benefit — pre-fill some arguments to create specialised, reusable functions:

```js
const add10 = curry((a, b, c) => a + b + c)(10)
add10(5, 3)  // 18
add10(1, 2)  // 13
```

### Implementation

```js
function curry(fn) {
  return function check(...args) {
    if (args.length >= fn.length) return fn(...args)
    else return check.bind(null, ...args)
  }
}
```

**Why named inner function (`check`)?**
The inner function must reference itself to keep the "enough args?" check alive on every call. Anonymous functions can't self-reference. `fn.bind` was the wrong approach — it binds the original function, losing the check entirely.

**Why `>=` not `===`?**
If someone passes more args than expected, `===` would fail and return another function instead of executing. `>=` handles both exact and excess args correctly.

**`fn.length`** — number of declared parameters. Used to know how many args the original function expects.

### pipe

`pipe` chains functions left to right — output of each becomes input of the next:

```js
function pipe(...funcs) {
  return function execute(val) {
    for (const func of funcs)
      val = func(val)
    return val
  }
}

pipe(x => x * 2, x => x + 1, x => x * x)(3)  // 3→6→7→49
```

Idiomatic version uses `reduce` (covered later):
```js
const pipe = (...fns) => val => fns.reduce((acc, fn) => fn(acc), val)
```

### Q&A

**Why `check.bind` and not `fn.bind`?**
`fn.bind(null, ...args)` returns a partially-applied version of `fn` — no check logic. `check.bind(null, ...args)` returns a partially-applied version of the curried wrapper — check logic survives every subsequent call.

**What's the difference between currying and partial application?**
Currying is the transformation (one arg at a time, strictly). Partial application is pre-filling *some* args (not necessarily one at a time). `curry()` enables both — you can call with any number of args at each step.

## Scope & Lexical Environment

### Concept

Scope is the set of rules that determines where a variable is accessible. JS has three kinds:

- **Global scope** — visible everywhere
- **Function scope** — only inside the function it's declared in
- **Block scope** — only inside the block `{}` it's declared in (`let`/`const`)

**Lexical scope** — a function's scope is determined by **where it is written**, not where it is called. The scope chain only goes outward — inner functions see outer variables, never the reverse.

**Scope chain** — when a variable is referenced, JS looks in the current scope first, then the outer scope, then the outer-outer scope, up to global. Stops at the first match. If not found anywhere: `ReferenceError`.

**Execution context** — created every time a function is called. Holds local variables and a link to the outer scope. Normally destroyed when the function returns — kept alive by closures when an inner function holds a reference to it.

### var vs let/const scoping

`var` is **function-scoped** — leaks out of blocks (`if`, `for`, etc.) into the enclosing function.
`let`/`const` are **block-scoped** — contained within the `{}` they're declared in.

```js
function fn() {
    if (true) {
        var x = 1   // function-scoped — accessible anywhere in fn()
        let y = 2   // block-scoped — only inside this if block
    }
    console.log(x)  // 1 ✓
    console.log(y)  // ReferenceError ✗
}
```

### Hoisting

`var` declarations are moved to the top of their function scope before execution. The declaration hoists, not the value:

```js
console.log(a)  // undefined — declared but not yet assigned
var a = 5
console.log(a)  // 5
```

`let`/`const` are also hoisted but **not initialised** — accessing them before the declaration line throws a `ReferenceError`. This period is the **Temporal Dead Zone (TDZ)**.

Why hoist `let`/`const` at all? So JS can detect the variable belongs to the current block and reject lookups before initialization — instead of silently walking up the scope chain and returning the wrong value.

### var in loops — classic gotcha

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0)  // 3, 3, 3
}
```

`var` is function-scoped — there's **one shared `i`**. All callbacks close over the same variable. By the time they run, `i` is already `3`.

Fix with `let` — block-scoped, each iteration gets its own `i`:
```js
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0)  // 0, 1, 2
}
```

### IIFE fix (pre-let solution)

Before `let` existed, an IIFE inside the loop created a new scope per iteration, capturing the current value:

```js
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(j), 0)  // 0, 1, 2
    })(i)
}
```

`i` is passed as `j` — `j` is a new variable local to each IIFE call. Each callback closes over its own `j`, not the shared `i`.

### IIFE — Module Pattern (historical)

Before ES modules, IIFE was used to create private scope and avoid global variable collisions across script files:

```js
var MyModule = (function () {
    var private = 'hidden'
    return { greet: function () { console.log(private) } }
})()
```

Replaced by ES modules (`import`/`export`) in modern JS. Still seen in legacy codebases and jQuery-era code.

### Q&A

**Why does `second()` called from inside `first()` not see `first()`'s variables?**
Lexical scope — `second` is defined at global level. Its scope is determined by where it's written, not where it's called from. Calling it from `first()` doesn't give it access to `first()`'s variables.

**Why does `makeCounter` remember state across calls?**
Each call creates a new execution context. The returned function keeps a reference to it, preventing it from being destroyed. This is the mechanism behind closures — a function keeping its outer execution context alive.

## Prototypes & Prototype Chain

### Concept

Every object in JS has an internal `[[Prototype]]` link pointing to another object. When you look up a property and it's not found on the object itself, JS follows the chain — up through `[[Prototype]]` after `[[Prototype]]` — until found or the chain ends at `null`.

```
instance
  └── [[Prototype]] → Constructor.prototype
                         └── [[Prototype]] → Object.prototype
                                               └── [[Prototype]] → null
```

This is how method sharing works — methods live on `Constructor.prototype`, shared by all instances. No copying.

### `new` keyword — what it does

1. Creates a new empty object `{}`
2. Links its `[[Prototype]]` to `Constructor.prototype`
3. Calls `Constructor` with `this = new object`
4. Returns the new object

```js
function Person(name) { this.name = name }
const p = new Person('Joe')
// p.__proto__ === Person.prototype — true
```

### `prototype` vs `[[Prototype]]`

- `Constructor.prototype` — the object that instances get linked to (a regular property on the function)
- `[[Prototype]]` — the internal link on an instance (accessed via `Object.getPrototypeOf(obj)` or `obj.__proto__`)

They're different things with similar names.

### `hasOwnProperty`

```js
p1.hasOwnProperty('name')   // true  — name is on p1 directly
p1.hasOwnProperty('greet')  // false — greet is on Person.prototype, not p1
```

### Walking the chain

```js
let proto = Object.getPrototypeOf(p1)
while (proto !== null) {
    console.log(proto)
    proto = Object.getPrototypeOf(proto)
}
// Person.prototype → Object.prototype → (stops)
```

### Prototypal inheritance

Link `Dog.prototype` to `Animal.prototype` using `Object.create` — not a copy, a live link:

```js
function Animal(name) { this.name = name }
Animal.prototype.speak = function () { console.log(`${this.name} makes a sound.`) }

function Dog(name) {
    Animal.call(this, name)  // borrow constructor
}
Dog.prototype = Object.create(Animal.prototype)  // link prototype chain
Dog.prototype.bark = function () { console.log(`${this.name} barks.`) }

const d = new Dog('Rex')
d.speak()  // inherited from Animal.prototype
d.bark()   // Dog's own method
```

`Animal.call(this, name)` — runs Animal's constructor with `this = new Dog instance`. Sets `name` without a second property assignment.

`Object.create(Animal.prototype)` — creates new object whose `[[Prototype]]` is `Animal.prototype`. Link, not copy.

### Q&A

**What's the difference between `Object.create(Animal.prototype)` and copying Animal's methods?**
`Object.create` creates a link — changes to `Animal.prototype` after the fact still affect `Dog`. A copy would be a snapshot — disconnected.

**Why use `Animal.call(this, name)` instead of `this.name = name` directly in Dog?**
If `Animal` does more than set `name` (validation, other properties), you'd have to duplicate that logic in `Dog`. Borrowing the constructor means `Dog` always stays in sync with `Animal`'s initialization logic.

**Why does `hasOwnProperty('greet')` return false?**
`greet` lives on `Person.prototype`, not on the instance. `hasOwnProperty` only checks own properties — not anything in the prototype chain.

## Classes & Inheritance

### Concept

`class` is syntactic sugar over the prototype system. Under the hood it creates the same constructor functions and prototype links — just with cleaner syntax.

```js
// These are equivalent:

// Prototype way
function Animal(name) { this.name = name }
Animal.prototype.speak = function() { console.log(this.name) }

// Class way
class Animal {
    constructor(name) { this.name = name }
    speak() { console.log(this.name) }
}
```

### extends and super

`extends` sets up the prototype chain between classes — equivalent to `Dog.prototype = Object.create(Animal.prototype)`.

`super` has two distinct uses:
- In `constructor` — `super(name)` calls the parent constructor (equivalent to `Animal.call(this, name)`)
- In any other method — `super.speak()` calls the parent's version of that method

```js
class Dog extends Animal {
    constructor(name) {
        super(name)       // must be called before accessing this
    }

    speak() {
        super.speak()     // calls Animal's speak with this = Dog instance
    }
}
```

### Static methods

`static` methods belong to the class itself, not instances. Called on the class, not on objects:

```js
class Animal {
    static create(name) {
        return new Animal(name)  // factory — creates instance without caller using new
    }
}

Animal.create('Tom')  // ✓
a1.create('Tom')      // ✗ — not on instances
```

### Private fields

Declared with `#` — inaccessible outside the class, enforced at the language level:

```js
class Animal {
    #sound                          // declaration required at class top level

    constructor(name, sound) {
        this.name = name
        this.#sound = sound         // private — only accessible inside class
    }

    speak() {
        console.log(`${this.#sound}`)  // ✓ inside class
    }
}

a.#sound  // SyntaxError — not accessible outside
a.sound   // undefined — no public property exists
```

### Q&A

**Why must `super()` be called before `this` in a subclass constructor?**
Until `super()` runs, `this` doesn't exist in the subclass — the parent constructor is responsible for creating the object. Accessing `this` before `super()` throws a ReferenceError.

**What's the difference between static methods and prototype methods?**
Prototype methods (`speak()`) are available on instances. Static methods (`Animal.create()`) are only available on the class itself — they're utility functions that relate to the class but don't need an instance.

**Why use private fields over a naming convention like `_sound`?**
`_sound` is just a convention — anyone can still access `obj._sound`. `#sound` is enforced by the language itself — accessing it outside the class throws a SyntaxError at parse time.
