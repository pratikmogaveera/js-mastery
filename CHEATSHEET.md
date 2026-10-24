# js-mastery — Cheatsheet

Quick reference. Syntax, patterns, when to use what. No explanations — see NOTES.md for those.

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

```js
// Factory
function makeAdder(base) {
    return (num) => base + num
}

// Stateful
function makeCounter(start = 0) {
    return () => (start += 1)
}

// once — run fn once, cache result
function once(fn) {
    let called = false, result
    return () => {
        if (!called) { result = fn(); called = true }
        return result
    }
}

// memoize — cache by argument
function memoize(fn) {
    const cache = {}
    return (arg) => {
        if (arg in cache) return cache[arg]
        return (cache[arg] = fn(arg))
    }
}
```

**When:** private state, factory functions, `once`, `memoize`, any callback that needs to remember context.

**Gotchas:**
- `var` in loops — all closures share the same variable. Use `let`.
- Cache checks — use `key in cache`, not `if (cache[key])` (falsy values break it).
- `once` guard — use a `called` boolean, not the result value.

## `this` keyword

```js
// Implicit binding — obj before the dot
obj.fn()          // this = obj

// Default binding — no obj, no explicit
fn()              // this = undefined (strict) / global (non-strict)

// Lost this — detaching a method
const fn = obj.method
fn()              // this = global, NOT obj

// Arrow fix — nested functions only
const obj = {
    method: function () {
        const inner = () => console.log(this)  // inherits from method
        inner()
    }
}

// Arrow as method — WRONG, this = global
const obj = { fn: () => console.log(this) }   // ✗
```

**Priority:** `new` > explicit (`call`/`apply`/`bind`) > implicit (`obj.fn()`) > default (`fn()`)

**Arrow functions:** no own `this` — inherit from lexical scope. Never use as object methods.

## call and apply

```js
fn.call(ctx, arg1, arg2)        // invoke immediately, args individually
fn.apply(ctx, [arg1, arg2])     // invoke immediately, args as array

// Method borrowing
user.describe.call(admin)
user.greet.apply(admin, ['Hey', '!'])

// Array-like → real array
Array.prototype.slice.call(arrayLike)

// Type checking
Object.prototype.toString.call(value).slice(8, -1)  // 'Array', 'Null', 'Number'...

// Dynamic multi-call
argArrays.map(args => fn.apply(null, args))
```

**call** — args known, pass individually
**apply** — args in array, pass as-is
**null as context** — when fn doesn't use `this` (Math.max, Math.min etc.)

## bind

```js
fn.bind(ctx)              // lock this, invoke later
fn.bind(ctx, arg1)        // lock this + pre-fill arg1
fn.bind(null, arg1)       // partial application only, no this

// Fix callback
setTimeout(obj.method.bind(obj), 100)

// Partial application
const double = multiply.bind(null, 2)
double(5)  // 10

// bindAll — lock multiple methods at once
function bindAll(obj, methods) {
    for (const method of methods) obj[method] = obj[method].bind(obj)
}
```

**call vs apply vs bind:**
- `call` → invoke now, args individually
- `apply` → invoke now, args as array
- `bind` → invoke later, returns new fn

## Currying & Partial Application

```js
// curry — supports all partial application patterns
function curry(fn) {
  return function check(...args) {
    if (args.length >= fn.length) return fn(...args)
    return check.bind(null, ...args)
  }
}

// usage
const curriedAdd = curry((a, b, c) => a + b + c)
const add10 = curriedAdd(10)       // partial
add10(5, 3)                        // 18

// pipe — chain functions left to right
function pipe(...funcs) {
  return (val) => { for (const fn of funcs) val = fn(val); return val }
}

pipe(x => x * 2, x => x + 1)(3)  // 3→6→7
```

**Key rules:**
- Named inner function — enables self-reference for recursion
- `>=` not `===` — handles excess args
- `check.bind` not `fn.bind` — keeps check logic alive
- `fn.length` — number of declared params

## Scope & Lexical Environment

```js
// Scope chain — looks outward until found or ReferenceError
function outer() {
    const x = 1
    function inner() { console.log(x) }  // sees x — lexical scope
    inner()  // 1
}

// var (function-scoped) vs let (block-scoped)
function fn() {
    if (true) {
        var a = 1   // leaks into fn()
        let b = 2   // stays in block
    }
    console.log(a)  // 1
    console.log(b)  // ReferenceError
}

// var in loops gotcha
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i), 0)  // 3, 3, 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i), 0)  // 0, 1, 2

// IIFE — isolated scope
(function () { var x = 'private' })()  // x not accessible outside
```

**Key rules:**
- Lexical scope: defined by where written, not where called
- Scope chain: outward only — inner sees outer, never reverse
- `var` hoists declaration (not value), initialised as `undefined`
- `let`/`const` hoisted but not initialised — TDZ until declaration line
- `var` loop bug: one shared variable → all callbacks see final value
