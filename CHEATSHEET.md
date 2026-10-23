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
