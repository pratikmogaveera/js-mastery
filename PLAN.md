# js-mastery — Plan

Complete JavaScript mastery roadmap. Work through topics in order within each section. Check off as you go.

> 🎯 = high interview value — go deeper, understand every edge case

## Learning Rules

- **Don't move on until it's truly done.** Each topic must be fully understood before starting the next.
- **Progressive tasks.** Every topic has a basic task and a harder real-world task. Both must be completed.
- **Harder tasks are non-negotiable.** Basic tasks confirm the concept. Harder tasks confirm production-ready knowledge.
- **No copy-paste.** Write every line. Understanding comes from typing, not reading.
- **If you already know it confidently**, check it off without tasks. If there's any doubt, do the tasks.

---

## Section 1 — Foundations

> Core language mechanics. Don't skim — even "basic" topics have methods and edge cases most developers haven't encountered. Tick off only what you know cold, including the edge cases listed.

- [ ] **Variables & Scoping** 🎯
  - `var` vs `let` vs `const` — hoisting, temporal dead zone, re-declaration rules
  - Block scope vs function scope vs global scope
  - Scope chain — how JS resolves variable lookups
  - _Interview: output questions on hoisting, TDZ errors, `var` in loops_

- [ ] **Data Types** 🎯
  - Primitives (`string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`) vs reference types
  - Type coercion — implicit (`==`, `+`, template literals) vs explicit (`Number()`, `String()`, `Boolean()`)
  - `typeof` quirks (`typeof null === 'object'`)
  - `instanceof`, `Object.prototype.toString.call()`
  - _Interview: coercion gotchas (`[] + []`, `[] + {}`, `+[]`), `==` vs `===` edge cases_

- [ ] **Operators**
  - Logical: `&&`, `||`, `??` (nullish coalescing), `&&=`, `||=`, `??=`
  - Optional chaining: `?.`, `?.[`, `?.(`
  - Ternary, comma operator, `void`, `delete`, `in`
  - Operator precedence gotchas

- [ ] **Functions** 🎯
  - Declarations vs expressions vs arrow functions — hoisting differences
  - IIFE — why and when
  - Default parameters, rest parameters (`...args`), arguments object
  - `return` in arrow vs regular functions
  - _Interview: why arrow functions can't be used as constructors, `arguments` vs rest params_

- [ ] **Strings**
  - Basics: `length`, `indexOf`, `lastIndexOf`, `includes`, `startsWith`, `endsWith`
  - Extraction: `slice`, `substring`
  - Transformation: `toUpperCase`, `toLowerCase`, `trim`, `trimStart`, `trimEnd`, `padStart`, `padEnd`, `repeat`
  - Split/join: `split`
  - Replace: `replace`, `replaceAll`
  - Template literals, tagged template literals (intro)
  - Newer: `at()`, `matchAll()`

- [ ] **Arrays** 🎯
  - Mutation methods: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`
  - Iteration methods: `forEach`, `map`, `filter`, `reduce`, `reduceRight`, `flatMap`
  - Search methods: `find`, `findIndex`, `findLast`, `findLastIndex`, `indexOf`, `lastIndexOf`, `includes`
  - Test methods: `some`, `every`
  - Flattening: `flat`, `flatMap`
  - Creation: `Array.from`, `Array.of`, `Array.isArray`
  - Access/info: `at()`, `length`, `entries()`, `keys()`, `values()`
  - Destructuring, spread, rest in arrays
  - `sort` gotchas — default lexicographic sort, custom comparator
  - _Interview: implement `map`, `filter`, `reduce` from scratch (see Section 7 — Polyfills)_

- [ ] **Objects** 🎯
  - Literals, shorthand properties, computed keys
  - Access: dot vs bracket notation
  - `Object.keys`, `Object.values`, `Object.entries`, `Object.fromEntries`
  - Merging: `Object.assign`, spread
  - Freezing: `Object.freeze`, `Object.seal` — differences
  - Property descriptors: `Object.defineProperty`, `writable`, `enumerable`, `configurable`
  - Getters and setters
  - `Object.create(null)` — prototype-less objects
  - `hasOwnProperty` vs `Object.hasOwn`
  - `delete` operator
  - _Interview: deep clone an object, check if two objects are equal, flatten a nested object_

- [ ] **Control Flow**
  - `for`, `for...of`, `for...in` — when to use which, gotchas with `for...in` on arrays
  - `while`, `do...while`
  - `switch` — fall-through, `break`, using with non-primitives
  - Labelled statements — `break label`, `continue label`
  - Short-circuit evaluation as control flow

- [ ] **Error Handling**
  - `try/catch/finally` — execution order, `finally` always runs
  - Built-in error types: `Error`, `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`
  - Creating custom errors — extending `Error`
  - Rethrowing — when to catch vs let bubble up

---

## Section 2 — Core Concepts

> Where JS starts to feel deep. Every senior JS developer is expected to know these cold.

- [ ] **Scope & Lexical Environment** 🎯
  - Scope chain, lexical vs dynamic scope, execution context
  - _Interview: predict variable lookup in nested functions_

- [x] **Closures** 🎯
  - Lexical scope retention, private state, factory functions
  - _Interview: closure in loops (`var` vs `let`), private counter, memoize_
  - [x] makeAdder
  - [x] makeCounter
  - [ ] once
  - [ ] memoize

- [ ] **`this` keyword** 🎯
  - How `this` is determined — call site, implicit binding, explicit binding, `new`, arrow functions
  - `this` in callbacks, event handlers, class methods
  - _Interview: output questions on `this`, lost `this` in callbacks_

- [ ] **call, apply, bind** 🎯
  - Explicit `this` binding, method borrowing, partial application
  - `call` vs `apply` vs `bind` — when to use which
  - _Interview: implement `Function.prototype.bind` from scratch (see Section 7 — Polyfills)_
  - [ ] Basic task
  - [ ] Harder task

- [ ] **Currying & Partial Application** 🎯
  - Transforming multi-arg functions, `fn.length`, recursive accumulation
  - _Interview: implement `curry()` supporting all partial application patterns_
  - [ ] curry() implementation
  - [ ] Harder task

- [ ] **Prototypes & Prototype Chain** 🎯
  - `[[Prototype]]`, `Object.create`, `__proto__`, `prototype` property
  - Property lookup chain, shadowing
  - _Interview: how does inheritance work without classes, `instanceof` under the hood_

- [ ] **Classes & Inheritance**
  - `class` syntax, `extends`, `super`, static methods, private fields (`#`)
  - How `class` maps to prototypes under the hood

- [ ] **Higher-Order Functions** 🎯
  - Functions as values, compose, pipe, custom `map`/`filter`/`reduce`
  - _Interview: implement compose/pipe, flatten array using reduce_

- [ ] **Iterators & the Iteration Protocol**
  - `Symbol.iterator`, custom iterables, `for...of` under the hood

- [ ] **Generators**
  - `function*`, `yield`, lazy sequences, infinite iterators

---

## Section 3 — Async JavaScript

> The most misunderstood part of JS. Master the event loop and async patterns cold.

- [ ] **Callbacks** — async patterns, error-first callbacks, callback hell
- [ ] **Promises** 🎯
  - Creation, `.then`/`.catch`/`.finally`, chaining
  - Combinators: `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`
  - _Interview: output questions on promise chaining order, implement `Promise.all` from scratch_
- [ ] **async/await** 🎯
  - Syntax, error handling, sequential vs parallel execution
  - _Interview: convert promise chains to async/await, spot bugs in async code_
- [ ] **Event Loop** 🎯
  - Call stack, web APIs, task queue (macrotask), microtask queue, `queueMicrotask`
  - _Interview: output questions mixing setTimeout, Promise, and sync code — extremely common_
- [ ] **Timers**
  - `setTimeout`, `setInterval`, `clearTimeout`, timer precision, why `setTimeout(fn, 0)` is deferred

---

## Section 4 — Advanced Features

> Lesser-known but powerful parts of the language.

- [ ] **Symbols** — creating symbols, well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`)
- [ ] **Proxy & Reflect** 🎯
  - Traps (get, set, has, apply), use cases (validation, logging, reactive systems)
  - _Interview: build a validation proxy, explain how Vue 3 reactivity works_
- [ ] **WeakMap, WeakSet, WeakRef** — weak references, use cases, GC implications
- [ ] **Modules** — CommonJS vs ESM, named vs default exports, dynamic `import()`, circular dependencies
- [ ] **Destructuring (deep)** — nested, default values, renaming, rest in objects/arrays, function param destructuring
- [ ] **Tagged Template Literals** — tag functions, use cases (i18n, sanitisation, styling)
- [ ] **Regular Expressions** 🎯
  - Patterns, flags, groups, named groups, lookahead/lookbehind, `exec`, `matchAll`
  - _Interview: write regex for email, URL, phone number validation_
- [ ] **Typed Arrays & ArrayBuffer** — binary data, `DataView`, use cases (file I/O, WebSockets, WebGL)

---

## Section 5 — Design Patterns

> Patterns used in real codebases. Knowing these makes you a better library/framework consumer and author.

- [ ] **Module Pattern** — IIFE-based encapsulation, revealing module pattern
- [ ] **Observer / PubSub / Event Emitter** 🎯
  - Subscribe, publish, unsubscribe, implement from scratch
  - _Interview: implement an EventEmitter class with `on`, `off`, `emit`_
- [ ] **Factory Pattern** — object creation without `new`, flexible instantiation
- [ ] **Singleton** — single instance guarantee, lazy initialisation
- [ ] **Decorator Pattern** — wrapping functions/objects to extend behaviour
- [ ] **Strategy Pattern** — swappable algorithms, runtime behaviour selection
- [ ] **Middleware Pattern** 🎯
  - Chaining handlers (like Express), compose-based pipelines
  - _Interview: implement a middleware chain from scratch_

---

## Section 6 — Performance & Internals

> What happens under the hood and how to write faster code.

- [ ] **Debounce & Throttle** 🎯
  - Implement from scratch, use cases, differences
  - _Interview: implement debounce and throttle — extremely common_
- [ ] **Memoization** 🎯
  - Cache by args, limitations, when not to use
  - _Interview: implement memoize with support for multiple args_
- [ ] **Memory Management & Garbage Collection**
  - Mark-and-sweep, memory leaks (closures, detached nodes, timers, event listeners)
- [ ] **V8 Basics** — JIT compilation, hidden classes, inline caching, deoptimisation triggers
- [ ] **Performance Measurement** — `performance.now()`, `console.time`, profiling in DevTools

---

## Section 7 — Polyfills & Implementations 🎯

> Implement JS built-ins and utilities from scratch. The most common category of interview questions for mid-senior JS roles.

### Array Methods
- [ ] `Array.prototype.map`
- [ ] `Array.prototype.filter`
- [ ] `Array.prototype.reduce`
- [ ] `Array.prototype.flat`
- [ ] `Array.prototype.forEach`
- [ ] `Array.prototype.find`
- [ ] `Array.prototype.findIndex`
- [ ] `Array.from`

### Function Methods
- [ ] `Function.prototype.call`
- [ ] `Function.prototype.apply`
- [ ] `Function.prototype.bind`

### Async
- [ ] `Promise` (basic implementation — resolve, reject, then)
- [ ] `Promise.all`
- [ ] `Promise.allSettled`
- [ ] `Promise.race`
- [ ] `Promise.any`

### Utilities
- [ ] `debounce`
- [ ] `throttle`
- [ ] `memoize`
- [ ] `curry`
- [ ] `compose` / `pipe`
- [ ] `deepClone`
- [ ] `deepEqual`
- [ ] `EventEmitter` (`on`, `off`, `emit`, `once`)
- [ ] `groupBy`
- [ ] `chunk` (split array into chunks of size n)
- [ ] `flatten` (deep flatten without `Array.flat`)
