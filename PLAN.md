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
  - _Resources: [javascript.info/variables](https://javascript.info/variables) · [javascript.info/var](https://javascript.info/var) · [MDN — Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)_

- [ ] **Data Types** 🎯
  - Primitives (`string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`) vs reference types
  - Type coercion — implicit (`==`, `+`, template literals) vs explicit (`Number()`, `String()`, `Boolean()`)
  - `typeof` quirks (`typeof null === 'object'`)
  - `instanceof`, `Object.prototype.toString.call()`
  - _Interview: coercion gotchas (`[] + []`, `[] + {}`, `+[]`), `==` vs `===` edge cases_
  - _Resources: [javascript.info/types](https://javascript.info/types) · [javascript.info/type-conversions](https://javascript.info/type-conversions) · [javascript.info/comparison](https://javascript.info/comparison)_

- [ ] **Operators**
  - Logical: `&&`, `||`, `??` (nullish coalescing), `&&=`, `||=`, `??=`
  - Optional chaining: `?.`, `?.[`, `?.(`
  - Ternary, comma operator, `void`, `delete`, `in`
  - Operator precedence gotchas
  - _Resources: [javascript.info/logical-operators](https://javascript.info/logical-operators) · [javascript.info/nullish-coalescing-operator](https://javascript.info/nullish-coalescing-operator) · [javascript.info/optional-chaining](https://javascript.info/optional-chaining)_

- [ ] **Functions** 🎯
  - Declarations vs expressions vs arrow functions — hoisting differences
  - IIFE — why and when
  - Default parameters, rest parameters (`...args`), arguments object
  - `return` in arrow vs regular functions
  - _Interview: why arrow functions can't be used as constructors, `arguments` vs rest params_
  - _Resources: [javascript.info/function-basics](https://javascript.info/function-basics) · [javascript.info/function-expressions](https://javascript.info/function-expressions) · [javascript.info/arrow-functions](https://javascript.info/arrow-functions-basics)_

- [ ] **Strings**
  - Basics: `length`, `indexOf`, `lastIndexOf`, `includes`, `startsWith`, `endsWith`
  - Extraction: `slice`, `substring`
  - Transformation: `toUpperCase`, `toLowerCase`, `trim`, `trimStart`, `trimEnd`, `padStart`, `padEnd`, `repeat`
  - Split/join: `split`
  - Replace: `replace`, `replaceAll`
  - Template literals, tagged template literals (intro)
  - Newer: `at()`, `matchAll()`
  - _Resources: [javascript.info/string](https://javascript.info/string) · [MDN — String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)_

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
  - _Resources: [javascript.info/array](https://javascript.info/array) · [javascript.info/array-methods](https://javascript.info/array-methods) · [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)_

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
  - _Resources: [javascript.info/object](https://javascript.info/object) · [javascript.info/property-descriptors](https://javascript.info/property-descriptors) · [javascript.info/object-methods](https://javascript.info/object-methods)_

- [ ] **Control Flow**
  - `for`, `for...of`, `for...in` — when to use which, gotchas with `for...in` on arrays
  - `while`, `do...while`
  - `switch` — fall-through, `break`, using with non-primitives
  - Labelled statements — `break label`, `continue label`
  - Short-circuit evaluation as control flow
  - _Resources: [javascript.info/for](https://javascript.info/while-for) · [javascript.info/switch](https://javascript.info/switch)_

- [ ] **Error Handling**
  - `try/catch/finally` — execution order, `finally` always runs
  - Built-in error types: `Error`, `TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`
  - Creating custom errors — extending `Error`
  - Rethrowing — when to catch vs let bubble up
  - _Resources: [javascript.info/try-catch](https://javascript.info/try-catch) · [javascript.info/custom-errors](https://javascript.info/custom-errors)_

---

## Section 2 — Core Concepts

> Where JS starts to feel deep. Every senior JS developer is expected to know these cold.

- [x] **Scope & Lexical Environment** 🎯
  - Scope chain, lexical vs dynamic scope, execution context
  - _Interview: predict variable lookup in nested functions_
  - _Resources: [javascript.info/closure](https://javascript.info/closure) · [YDKJS — Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/README.md)_
  - [x] L1 — scope chain (nested 3 levels)
  - [x] L2 — var in loops gotcha
  - [x] L3 — IIFE fix for var loop

- [x] **Closures** 🎯
  - Lexical scope retention, private state, factory functions
  - _Interview: closure in loops (`var` vs `let`), private counter, memoize_
  - _Resources: [javascript.info/closure](https://javascript.info/closure) · [MDN — Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)_
  - [x] makeAdder
  - [x] makeCounter
  - [x] once
  - [x] memoize

- [x] **`this` keyword** 🎯
  - How `this` is determined — call site, implicit binding, explicit binding, `new`, arrow functions
  - `this` in callbacks, event handlers, class methods
  - _Interview: output questions on `this`, lost `this` in callbacks_
  - _Resources: [javascript.info/object-methods](https://javascript.info/object-methods) · [YDKJS — this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/README.md)_
  - [x] v1 — implicit binding + lost `this` when detached
  - [x] v2 — arrow function fix for nested `this`
  - [x] v3 — bind placeholder (revisit after bind)

- [x] **call, apply, bind** 🎯
  - Explicit `this` binding, method borrowing, partial application
  - `call` vs `apply` vs `bind` — when to use which
  - _Interview: implement `Function.prototype.bind` from scratch (see Section 7 — Polyfills)_
  - _Resources: [javascript.info/call-apply-decorators](https://javascript.info/call-apply-decorators) · [javascript.info/bind](https://javascript.info/bind) · [MDN — bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)_
  - [x] call — basic (method borrowing)
  - [x] apply — basic (args from array)
  - [x] call — L2 (toArray, array-like conversion)
  - [x] apply — L3 (createLogger, dynamic args)
  - [x] Extra practice (runForAll, applyAll, getType)
  - [x] bind — basic task (fix lost this in setTimeout callback)
  - [x] bind — L2 (partial application — double/triple)
  - [x] bind — L3 (bindAll)

- [x] **Currying & Partial Application** 🎯
  - Transforming multi-arg functions, `fn.length`, recursive accumulation
  - _Interview: implement `curry()` supporting all partial application patterns_
  - _Resources: [javascript.info/currying-partials](https://javascript.info/currying-partials)_
  - [x] curry() implementation
  - [x] L2 — specialised functions via partial application
  - [x] L3 — pipe()

- [ ] **Prototypes & Prototype Chain** 🎯
  - `[[Prototype]]`, `Object.create`, `__proto__`, `prototype` property
  - Property lookup chain, shadowing
  - _Interview: how does inheritance work without classes, `instanceof` under the hood_
  - _Resources: [javascript.info/prototypes](https://javascript.info/prototypes) · [javascript.info/prototype-inheritance](https://javascript.info/prototype-inheritance) · [YDKJS — this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/README.md)_

- [ ] **Classes & Inheritance**
  - `class` syntax, `extends`, `super`, static methods, private fields (`#`)
  - How `class` maps to prototypes under the hood
  - _Resources: [javascript.info/classes](https://javascript.info/classes) · [javascript.info/class-inheritance](https://javascript.info/class-inheritance) · [javascript.info/private-protected-properties-methods](https://javascript.info/private-protected-properties-methods)_

- [ ] **Higher-Order Functions** 🎯
  - Functions as values, compose, pipe, custom `map`/`filter`/`reduce`
  - _Interview: implement compose/pipe, flatten array using reduce_
  - _Resources: [javascript.info/array-methods](https://javascript.info/array-methods) · [javascript.info/function-object](https://javascript.info/function-object)_

- [ ] **Iterators & the Iteration Protocol**
  - `Symbol.iterator`, custom iterables, `for...of` under the hood
  - _Resources: [javascript.info/iterable](https://javascript.info/iterable) · [MDN — Iteration protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)_

- [ ] **Generators**
  - `function*`, `yield`, lazy sequences, infinite iterators
  - _Resources: [javascript.info/generators](https://javascript.info/generators) · [MDN — Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)_

---

## Section 3 — Async JavaScript

> The most misunderstood part of JS. Master the event loop and async patterns cold.

- [ ] **Callbacks**
  - Async patterns, error-first callbacks, callback hell
  - _Resources: [javascript.info/callbacks](https://javascript.info/callbacks)_

- [ ] **Promises** 🎯
  - Creation, `.then`/`.catch`/`.finally`, chaining
  - Combinators: `Promise.all`, `Promise.race`, `Promise.allSettled`, `Promise.any`
  - _Interview: output questions on promise chaining order, implement `Promise.all` from scratch_
  - _Resources: [javascript.info/promise-basics](https://javascript.info/promise-basics) · [javascript.info/promises-chaining](https://javascript.info/promises-chaining) · [javascript.info/promise-api](https://javascript.info/promise-api)_

- [ ] **async/await** 🎯
  - Syntax, error handling, sequential vs parallel execution
  - _Interview: convert promise chains to async/await, spot bugs in async code_
  - _Resources: [javascript.info/async-await](https://javascript.info/async-await)_

- [ ] **Event Loop** 🎯
  - Call stack, web APIs, task queue (macrotask), microtask queue, `queueMicrotask`
  - _Interview: output questions mixing setTimeout, Promise, and sync code — extremely common_
  - _Resources: [javascript.info/event-loop](https://javascript.info/event-loop) · [Jake Archibald — In The Loop (YouTube)](https://www.youtube.com/watch?v=cCOL7MC4Pl0) · [javascript.info/microtask-queue](https://javascript.info/microtask-queue)_

- [ ] **Timers**
  - `setTimeout`, `setInterval`, `clearTimeout`, timer precision, why `setTimeout(fn, 0)` is deferred
  - _Resources: [javascript.info/settimeout-setinterval](https://javascript.info/settimeout-setinterval)_

---

## Section 4 — Advanced Features

> Lesser-known but powerful parts of the language.

- [ ] **Symbols**
  - Creating symbols, well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`, `Symbol.hasInstance`)
  - _Resources: [javascript.info/symbol](https://javascript.info/symbol) · [MDN — Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)_

- [ ] **Proxy & Reflect** 🎯
  - Traps (get, set, has, apply), use cases (validation, logging, reactive systems)
  - _Interview: build a validation proxy, explain how Vue 3 reactivity works_
  - _Resources: [javascript.info/proxy](https://javascript.info/proxy) · [MDN — Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)_

- [ ] **WeakMap, WeakSet, WeakRef**
  - Weak references, use cases, GC implications
  - _Resources: [javascript.info/weakmap-weakset](https://javascript.info/weakmap-weakset) · [MDN — WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)_

- [ ] **Modules**
  - CommonJS vs ESM, named vs default exports, dynamic `import()`, circular dependencies
  - _Resources: [javascript.info/modules-intro](https://javascript.info/modules-intro) · [javascript.info/import-export](https://javascript.info/import-export) · [javascript.info/modules-dynamic-imports](https://javascript.info/modules-dynamic-imports)_

- [ ] **Destructuring (deep)**
  - Nested, default values, renaming, rest in objects/arrays, function param destructuring
  - _Resources: [javascript.info/destructuring-assignment](https://javascript.info/destructuring-assignment)_

- [ ] **Tagged Template Literals**
  - Tag functions, use cases (i18n, sanitisation, styling)
  - _Resources: [MDN — Tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)_

- [ ] **Regular Expressions** 🎯
  - Patterns, flags, groups, named groups, lookahead/lookbehind, `exec`, `matchAll`
  - _Interview: write regex for email, URL, phone number validation_
  - _Resources: [javascript.info/regexp-introduction](https://javascript.info/regexp-introduction) · [regex101.com](https://regex101.com) (live tester)_

- [ ] **Typed Arrays & ArrayBuffer**
  - Binary data, `DataView`, use cases (file I/O, WebSockets, WebGL)
  - _Resources: [javascript.info/arraybuffer-binary-arrays](https://javascript.info/arraybuffer-binary-arrays) · [MDN — Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)_

---

## Section 5 — Design Patterns

> Patterns used in real codebases. Knowing these makes you a better library/framework consumer and author.

- [ ] **Module Pattern**
  - IIFE-based encapsulation, revealing module pattern
  - _Resources: [patterns.dev/vanilla/module-pattern](https://www.patterns.dev/vanilla/module-pattern)_

- [ ] **Observer / PubSub / Event Emitter** 🎯
  - Subscribe, publish, unsubscribe, implement from scratch
  - _Interview: implement an EventEmitter class with `on`, `off`, `emit`_
  - _Resources: [patterns.dev/vanilla/observer-pattern](https://www.patterns.dev/vanilla/observer-pattern) · [refactoring.guru/observer](https://refactoring.guru/design-patterns/observer)_

- [ ] **Factory Pattern**
  - Object creation without `new`, flexible instantiation
  - _Resources: [patterns.dev/vanilla/factory-pattern](https://www.patterns.dev/vanilla/factory-pattern) · [refactoring.guru/factory-method](https://refactoring.guru/design-patterns/factory-method)_

- [ ] **Singleton**
  - Single instance guarantee, lazy initialisation
  - _Resources: [patterns.dev/vanilla/singleton-pattern](https://www.patterns.dev/vanilla/singleton-pattern)_

- [ ] **Decorator Pattern**
  - Wrapping functions/objects to extend behaviour
  - _Resources: [refactoring.guru/decorator](https://refactoring.guru/design-patterns/decorator) · [MDN — Decorator proposal](https://github.com/tc39/proposal-decorators)_

- [ ] **Strategy Pattern**
  - Swappable algorithms, runtime behaviour selection
  - _Resources: [refactoring.guru/strategy](https://refactoring.guru/design-patterns/strategy)_

- [ ] **Middleware Pattern** 🎯
  - Chaining handlers (like Express), compose-based pipelines
  - _Interview: implement a middleware chain from scratch_
  - _Resources: [Express — Using middleware](https://expressjs.com/en/guide/using-middleware.html) · [refactoring.guru/chain-of-responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)_

---

## Section 6 — Performance & Internals

> What happens under the hood and how to write faster code.

- [ ] **Debounce & Throttle** 🎯
  - Implement from scratch, use cases, differences
  - _Interview: implement debounce and throttle — extremely common_
  - _Resources: [css-tricks — debouncing-throttling](https://css-tricks.com/debouncing-throttling-explained-examples/) · [javascript.info/task/debounce](https://javascript.info/task/debounce)_

- [ ] **Memoization** 🎯
  - Cache by args, limitations, when not to use
  - _Interview: implement memoize with support for multiple args_
  - _Resources: [javascript.info/task/memoize](https://javascript.info/task/memoize)_

- [ ] **Memory Management & Garbage Collection**
  - Mark-and-sweep, memory leaks (closures, detached nodes, timers, event listeners)
  - _Resources: [javascript.info/garbage-collection](https://javascript.info/garbage-collection) · [MDN — Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management)_

- [ ] **V8 Basics**
  - JIT compilation, hidden classes, inline caching, deoptimisation triggers
  - _Resources: [v8.dev/blog](https://v8.dev/blog) · [v8.dev/docs/hidden-classes](https://v8.dev/docs/hidden-classes)_

- [ ] **Performance Measurement**
  - `performance.now()`, `console.time`, profiling in DevTools
  - _Resources: [MDN — performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now) · [Chrome DevTools — Performance](https://developer.chrome.com/docs/devtools/performance/)_

---

## Section 7 — Polyfills & Implementations 🎯

> Implement JS built-ins and utilities from scratch. The most common category of interview questions for mid-senior JS roles. No resources — implement from scratch, then verify against MDN docs.

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
