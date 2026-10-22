# js-mastery — Plan

Complete JavaScript mastery roadmap. Work through topics in order within each section. Check off as you go.

## Learning Rules

- **Don't move on until it's truly done.** Each topic must be fully understood before starting the next.
- **Progressive tasks.** Every topic has a basic task and a harder real-world task. Both must be completed.
- **Harder tasks are non-negotiable.** Basic tasks confirm the concept. Harder tasks confirm production-ready knowledge.
- **No copy-paste.** Write every line. Understanding comes from typing, not reading.
- **If you already know it confidently**, check it off without tasks. If there's any doubt, do the tasks.

---

## Section 1 — Foundations

> Core language mechanics. If you've been writing JS for a while, most of these can be skimmed — tick off what you know cold.

- [ ] **Variables & Scoping** — `var` vs `let` vs `const`, hoisting, temporal dead zone, block scope vs function scope
- [ ] **Data Types** — primitives vs reference types, type coercion, `==` vs `===`, `typeof`, `instanceof`
- [ ] **Operators** — logical (`&&`, `||`, `??`), optional chaining (`?.`), ternary, comma operator
- [ ] **Functions** — declarations vs expressions, arrow functions, IIFE, default parameters, rest/spread
- [ ] **Objects** — literals, property descriptors (`writable`, `enumerable`, `configurable`), getters/setters, computed keys, shorthand
- [ ] **Arrays** — core methods (`map`, `filter`, `reduce`, `flat`, `flatMap`), destructuring, spread
- [ ] **Control Flow** — `for...of`, `for...in`, `while`, `switch`, labelled breaks
- [ ] **Error Handling** — `try/catch/finally`, error types (`TypeError`, `RangeError`, etc.), rethrowing

---

## Section 2 — Core Concepts

> Where JS starts to feel deep. Every senior JS developer is expected to know these cold.

- [ ] **Scope & Lexical Environment** — scope chain, lexical vs dynamic scope, execution context
- [x] **Closures** — lexical scope retention, private state, factory functions
  - [x] makeAdder
  - [x] makeCounter
  - [ ] once
  - [ ] memoize
- [ ] **`this` keyword** — how `this` is determined (call site, implicit, explicit, new, arrow)
- [ ] **call, apply, bind** — explicit `this` binding, method borrowing, partial application
  - [ ] Basic task
  - [ ] Harder task
- [ ] **Currying & Partial Application** — transforming multi-arg functions, `fn.length`, recursive accumulation
  - [ ] curry() implementation
  - [ ] Harder task
- [ ] **Prototypes & Prototype Chain** — `[[Prototype]]`, `Object.create`, `__proto__`, `prototype` property
- [ ] **Classes & Inheritance** — `class` syntax, `extends`, `super`, static methods, private fields (`#`)
- [ ] **Higher-Order Functions** — functions as values, compose, pipe, custom `map`/`filter`/`reduce`
- [ ] **Iterators & the Iteration Protocol** — `Symbol.iterator`, custom iterables, `for...of` under the hood
- [ ] **Generators** — `function*`, `yield`, lazy sequences, infinite iterators

---

## Section 3 — Async JavaScript

> The most misunderstood part of JS. Master the event loop and async patterns cold.

- [ ] **Callbacks** — async patterns, error-first callbacks, callback hell
- [ ] **Promises** — creation, `.then`/`.catch`/`.finally`, chaining, `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`
- [ ] **async/await** — syntax, error handling, sequential vs parallel execution
- [ ] **Event Loop** — call stack, web APIs, task queue (macrotask), microtask queue, `queueMicrotask`
- [ ] **Timers** — `setTimeout`, `setInterval`, `clearTimeout`, timer precision, why `setTimeout(fn, 0)` is deferred

---

## Section 4 — Advanced Features

> Lesser-known but powerful parts of the language.

- [ ] **Symbols** — creating symbols, well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`)
- [ ] **Proxy & Reflect** — traps (get, set, has, apply), use cases (validation, logging, reactive systems)
- [ ] **WeakMap, WeakSet, WeakRef** — weak references, use cases, GC implications
- [ ] **Modules** — CommonJS vs ESM, named vs default exports, dynamic `import()`, circular dependencies
- [ ] **Destructuring (deep)** — nested, default values, renaming, rest in objects/arrays, function param destructuring
- [ ] **Tagged Template Literals** — tag functions, use cases (i18n, sanitisation, styling)
- [ ] **Regular Expressions** — patterns, flags, groups, named groups, lookahead/lookbehind, `exec`, `matchAll`
- [ ] **Typed Arrays & ArrayBuffer** — binary data, `DataView`, use cases (file I/O, WebSockets, WebGL)

---

## Section 5 — Design Patterns

> Patterns used in real codebases. Knowing these makes you a better library/framework consumer and author.

- [ ] **Module Pattern** — IIFE-based encapsulation, revealing module pattern
- [ ] **Observer / PubSub / Event Emitter** — subscribe, publish, unsubscribe, implement from scratch
- [ ] **Factory Pattern** — object creation without `new`, flexible instantiation
- [ ] **Singleton** — single instance guarantee, lazy initialisation
- [ ] **Decorator Pattern** — wrapping functions/objects to extend behaviour
- [ ] **Strategy Pattern** — swappable algorithms, runtime behaviour selection
- [ ] **Middleware Pattern** — chaining handlers (like Express), compose-based pipelines

---

## Section 6 — Performance & Internals

> What happens under the hood and how to write faster code.

- [ ] **Debounce & Throttle** — implement from scratch, use cases, differences
- [ ] **Memoization** — cache by args, limitations, when not to use
- [ ] **Memory Management & Garbage Collection** — mark-and-sweep, memory leaks (closures, detached nodes, timers)
- [ ] **V8 Basics** — JIT compilation, hidden classes, inline caching, deoptimisation triggers
- [ ] **Performance Measurement** — `performance.now()`, `console.time`, profiling in DevTools
