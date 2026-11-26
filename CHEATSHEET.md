# js-mastery — Cheatsheet

Quick reference. Syntax, patterns, when to use what. No explanations — see NOTES.md for those.

---

## Section 1 — Foundations

---

### Variables & Scoping

```js
// var — function-scoped, hoisted as undefined
console.log(x)  // undefined
var x = 5
console.log(x)  // 5

// let/const — block-scoped, hoisted but TDZ until declaration
console.log(y)  // ReferenceError: Cannot access 'y' before initialization
let y = 10

// var leaks out of blocks, let/const don't
function fn() {
    if (true) {
        var a = 1   // accessible anywhere in fn()
        let b = 2   // only inside this if block
    }
    console.log(a)  // 1
    console.log(b)  // ReferenceError
}

// var re-declaration — silent, last value wins
var n = 1
var n = 2  // fine — n is 2

// let/const re-declaration — SyntaxError (parse-time, uncatchable)
// let m = 1; let m = 2  // SyntaxError

// const — must be initialized at declaration, cannot be reassigned
const PI = 3.14
// const X      // SyntaxError: Missing initializer
// PI = 3       // TypeError: Assignment to constant variable
```

**TDZ + shadowing trap:**
```js
var x = 'global'
function outer() {
    console.log(x)  // undefined — var x hoisted inside outer, not yet assigned
    var x = 'outer'
}
```

**Key rules:**
- All three are hoisted — only `var` is usable before its declaration line
- TDZ error message: *"Cannot access 'x' before initialization"* → variable exists, not initialized
- Out-of-scope error message: *"x is not defined"* → variable doesn't exist here
- `SyntaxError` = parse-time, `try/catch` won't catch it
- `var` → function scope | `let`/`const` → block scope

---

### Data Types

```js
// typeof — know these cold
typeof 'hi'         // 'string'
typeof 42           // 'number'
typeof true         // 'boolean'
typeof undefined    // 'undefined'
typeof null         // 'object' ← bug
typeof {}           // 'object'
typeof []           // 'object'
typeof function(){} // 'function' ← special case
typeof Symbol()     // 'symbol'
typeof 42n          // 'bigint'

// null check — typeof won't work
value === null      // only reliable check

// array check — typeof won't work
arr instanceof Array                               // true/false
Object.prototype.toString.call(v).slice(8,-1)      // 'Array', 'Null', 'String'...

// primitive — copied by value (independent)
let a = 5; let b = a; b = 10  // a still 5

// object — copied by reference (shared)
let x = { n: 1 }; let y = x; y.n = 2  // x.n is now 2

// shallow copy — top-level independent, nested still shared
let copy = { ...original }

// explicit coercion
Number('')          // 0
Number('42')        // 42
Number('abc')       // NaN
Number(null)        // 0   — intentionally empty
Number(undefined)   // NaN — unknown, no numeric equivalent
Number(true)        // 1

// + with strings — concatenation wins
1 + '2'             // '12'
2 + 3 + '4'         // '54' (left to right: 5, then '54')
'4' + 2 + 3         // '423'
3 - '2'             // 1   (- forces number coercion)
+'5'                // 5   (unary + coerces to number)
```

**Falsy:** `0` `''` `null` `undefined` `NaN` `false` — everything else truthy (including `'0'` `[]` `{}`)

**`==` order:** boolean → number first, then string → number. `null` only `==` `undefined`.

---

### Operators

```js
// || — first truthy, or last if all falsy
'a' || 'b'          // 'a'
0 || 'default'      // 'default'

// && — first falsy, or last if all truthy
1 && 2 && 3         // 3
0 && 'anything'     // 0

// ?? — fallback only for null/undefined (not 0 or '')
0 ?? 'default'      // 0   — 0 is kept
null ?? 'default'   // 'default'

// logical assignment
x ||= 'default'     // assign if x is falsy
x &&= transform(x)  // assign only if x is truthy (already exists)
x ??= 'default'     // assign only if x is null/undefined

// optional chaining
obj?.prop           // undefined instead of TypeError
obj?.['key']        // computed key
obj?.method?.()     // method call

// misc
x > 0 ? 'pos' : 'neg'   // ternary
delete obj.key            // removes property, returns true
'key' in obj              // true if own or inherited
void 0                    // undefined always
const x = (1, 2, 3)      // 3 — comma operator, returns last
for (let i=0, j=10; i<3; i++, j--) {} // comma in update slot
```

**`||` vs `??`:** use `??` for defaults when `0` or `''` are valid values.
**`in`:** checks prototype chain too — `'toString' in {}` is `true`.
**comma in `let i=0, j=0`:** declaration syntax, not comma operator.

---

### Functions

```js
// declaration — fully hoisted
sayHi()  // works
function sayHi() { console.log('hi') }

// expression — var hoists as undefined → TypeError
sayHello()  // TypeError: sayHello is not a function
var sayHello = function() {}

// expression — let/const → TDZ → ReferenceError
greet()  // ReferenceError
const greet = () => {}

// default parameters — only undefined triggers the default
function fn(x = 'default') {}
fn()          // 'default'
fn(undefined) // 'default'
fn(null)      // null — does NOT trigger default
fn('')        // '' — does NOT trigger default

// rest parameters — real array, works everywhere
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }

// arguments object — regular functions only
function old() { console.log(arguments) }  // Arguments { '0': ..., ... }
const arrow = () => console.log(arguments) // inherits from enclosing scope

// arrow arguments vs rest
function outer(a, b) {
  const arrow = () => console.log(arguments)      // outer's args
  const withRest = (...args) => console.log(args) // arrow's own args
}
```

**Rules:**
- Default params: only `undefined` (and missing args) trigger the fallback
- `arguments` → regular functions only. Use `...args` in arrows
- Arrow at top level of Node.js CJS file: `arguments` resolves to module wrapper args

```js
// IIFE — runs once, leaves nothing in scope
const config = (function() {
  const secret = 'hidden'  // trapped
  return { theme: 'dark' } // exposed
})()
// console.log(secret)  // ReferenceError

// constructor — regular function works, arrow throws
function Person(name) { this.name = name }
const p = new Person('Pratik')  // { name: 'Pratik' }

const Arrow = (name) => { this.name = name }
// new Arrow()  // TypeError: Arrow is not a constructor
```

**Arrow functions can't be constructors because:**
1. No `prototype` property → can't set up prototype chain
2. No own `this` → can't write properties onto new object

---

### Arrays

```js
// mutation — modify original
push(v)/pop()          // end: add/remove
unshift(v)/shift()     // start: add/remove
splice(i, n, ...v)     // remove n items at i, insert v

// sort — always use comparator for numbers
[10,2,1].sort()                // [1,10,2] lexicographic
[10,2,1].sort((a,b) => a-b)   // [1,2,10] numeric asc
[10,2,1].sort((a,b) => b-a)   // [10,2,1] numeric desc

fill(val, start, end)   // fill slice with value
reverse()               // reverses in place
copyWithin(target, start, end)

// iteration — non-mutating
forEach(cb)             // undefined — side effects
map(cb)                 // new array, same length
filter(cb)              // new array, truthy only
reduce((acc,curr)=>{}, init)
reduceRight((acc,curr)=>{}, init)

// search
find(cb) / findLast(cb)              // element or undefined
findIndex(cb) / findLastIndex(cb)    // index or -1
includes(val) / indexOf(val)         // by value (strict =)
// indexOf fails for objects — use find

// test
some(cb)   // ≥1 passes | [].some → false
every(cb)  // all pass  | [].every → true (vacuous)

// flat
flat(depth)    // default 1 | Infinity for full
flatMap(cb)    // map + flat(1)

// creation
Array.from(iterable, mapFn?)
Array.of(3)        // [3] not 3 empty slots
Array.isArray(v)   // only reliable array check

// access
at(-1) / entries() / keys() / values()
```

**Destructuring / spread / rest:**
```js
const [a, b=2] = [1]          // default
const [h, ...t] = [1,2,3]     // rest
const [x,,z] = [1,2,3]        // skip
let [p,q]=[1,2]; [p,q]=[q,p]  // swap — ; before [ (ASI)
const m = [...a, ...b]         // spread merge
```

---

### Objects

```js
// literals
const obj = { name, age }              // shorthand
const obj2 = { [key]: 'value' }        // computed key
const obj3 = { [`pre_${key}`]: 1 }     // computed with expression

// access
obj.name    // dot — static key
obj[key]    // bracket — dynamic/variable key
obj.key     // wrong — literal 'key', not variable value

// keys / values / entries / fromEntries
Object.keys(obj)          // own enumerable keys
Object.values(obj)        // own enumerable values
Object.entries(obj)       // [key, value] pairs
Object.fromEntries(pairs) // reverse — pairs → object

// transform pattern
Object.fromEntries(
  Object.entries(obj).map(([k, v]) => [k, transform(v)])
)

// merge
Object.assign({}, obj1, obj2)   // copies into {}, non-mutating
const merged = { ...obj1, ...obj2 }  // cleaner syntax

// freeze / seal
Object.freeze(obj)  // no add/delete/modify (all silent)
Object.seal(obj)    // no add/delete, modify ok

// defineProperty
Object.defineProperty(obj, 'key', {
  value: 42,
  writable: false,     // no reassign
  enumerable: false,   // hidden from keys/spread/log
  configurable: false, // no delete/reconfigure
})
```

---

### Strings

#### Key rule — strings are immutable

Every method returns a new string. The original is never modified.

#### Search methods

| Method | Returns | Notes |
|--------|---------|-------|
| `indexOf(str)` | index or `-1` | first occurrence |
| `lastIndexOf(str)` | index or `-1` | last occurrence |
| `includes(str)` | boolean | case-sensitive |
| `startsWith(str)` | boolean | |
| `endsWith(str)` | boolean | |

**`indexOf` gotcha:** `-1` is truthy. `if (str.indexOf('x'))` is true even when `'x'` is not found. Always use `!== -1` or `includes()`.

#### Extraction

**`slice(start, end)`** — supports negative indices. Returns `''` if `start > end`.

**`substring(start, end)`** — no negative indices (treated as 0). Swaps args if `start > end`.

Prefer `slice` — more predictable behaviour.

```js
'abcdefgh'.slice(2, 5)      // 'cde'
'abcdefgh'.slice(-3)        // 'fgh'
'abcdefgh'.substring(-3)    // 'abcdefgh' — negative → 0
'abcdefgh'.substring(5, 2)  // 'cde'      — args swapped
'abcdefgh'.slice(5, 2)      // ''         — no swap, returns empty
```

#### Transformation

```js
'hello'.toUpperCase()        // 'HELLO'
'  hello  '.trim()           // 'hello'
'  hello  '.trimStart()      // 'hello  '
'  hello  '.trimEnd()        // '  hello'
'5'.padStart(3, '0')         // '005' — total length 3, not 3 zeros
'42'.padStart(3, '0')        // '042' — already 2 chars, adds 1
'999'.padStart(3, '0')       // '999' — at target length, nothing added
'ab'.repeat(3)               // 'ababab'
```

**`padStart`/`padEnd` gotcha:** first arg is **total target length**, not number of chars to add.

#### split, replace, replaceAll

```js
'a,b,c'.split(',')      // ['a', 'b', 'c']
'abc'.split('')         // ['a', 'b', 'c'] — every char
'abc'.split()           // ['abc']         — no separator = one element

'aabbcc'.replace('b', 'X')    // 'aaXbcc'  — first occurrence only
'aabbcc'.replace(/b/g, 'X')   // 'aaXXcc'  — regex /g for all
'aabbcc'.replaceAll('b', 'X') // 'aaXXcc'  — cleaner than regex
```

#### at(), template literals, matchAll()

```js
'hello'.at(-1)   // 'o'  — negative indices supported
'hello'[-1]      // undefined — bracket notation doesn't support negatives

`Hello ${name}`  // interpolation
`line 1
line 2`          // multiline preserved

// matchAll — returns full match objects with index/groups
// match /g — returns just strings, loses position info
const matches = [...str.matchAll(/pattern/g)]
matches[0][0]     // full match string
matches[0].index  // position in original string

// positional capture groups — by parenthesis order
const m = [...'cat bat'.matchAll(/([a-z])(at)/g)]
m[0][1]  // 'c' — first group
m[0][2]  // 'at' — second group

// named capture groups — (?<name>...) — preferred for clarity
const d = [...'2024-01-15'.matchAll(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g)]
d[0].groups.year   // '2024'
d[0].groups.month  // '01'
// groups has null prototype — avoids conflicts with built-in names
```

#### Q&A

**Why does `if (str.indexOf('x'))` fail?**
`indexOf` returns `-1` when not found. `-1` is truthy (non-zero). The condition passes even when the value is absent. Always compare: `str.indexOf('x') !== -1` or just use `str.includes('x')`.

**What's the difference between `match(/g)` and `matchAll()`?**
`match` with `/g` returns an array of matched strings — no index, no groups. `matchAll` returns an iterator of full match objects — each has the match string, index, input, and capture groups. Use `matchAll` when you need position or group data.

**Why prefer `slice` over `substring`?**
`substring` has two surprising behaviours: negative indices become 0, and it silently swaps arguments when `start > end`. `slice` is explicit — negative indices count from the end, `start > end` returns empty string.

---

## Section 2 — Core Concepts---

## Section 3 — Async JavaScript

---

## Section 4 — Advanced Features

---

## Section 5 — Design Patterns

---

## Section 6 — Performance & Internals

---

## Section 2 — Core Concepts (cheatsheet)

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

## Prototypes & Prototype Chain

```js
// Add method to prototype — shared by all instances
Constructor.prototype.method = function () { ... }

// Check own vs inherited
obj.hasOwnProperty('prop')   // true if on obj itself, false if on prototype

// Walk the chain
let proto = Object.getPrototypeOf(obj)
while (proto !== null) { proto = Object.getPrototypeOf(proto) }

// Prototypal inheritance
function Dog(name) { Animal.call(this, name) }         // borrow constructor
Dog.prototype = Object.create(Animal.prototype)         // link chain
Dog.prototype.bark = function () { ... }                // Dog-specific method
```

**Chain:** `instance → Constructor.prototype → Object.prototype → null`

**Key distinctions:**
- `Constructor.prototype` — where methods live (on the function)
- `[[Prototype]]` — the link on instances (access via `Object.getPrototypeOf`)
- `Object.create` — link, not copy
- `hasOwnProperty` — own properties only, ignores prototype chain

## Classes & Inheritance

```js
class Animal {
    #sound                               // private field — class top level
    constructor(name, sound) {
        this.name = name
        this.#sound = sound
    }
    speak() { console.log(this.#sound) } // private access inside class
    static create(name) { return new Animal(name) }  // factory method
}

class Dog extends Animal {
    constructor(name) { super(name) }    // call parent constructor first
    speak() { super.speak() }           // call parent method
    bark() { console.log(`${this.name} barks.`) }
}

// Usage
const a = Animal.create('Tom')          // static — no new needed
const d = new Dog('Rex')
d.speak()   // inherited
d.bark()    // own method
// a.#sound  → SyntaxError
```

**super:** `super()` in constructor = parent constructor. `super.method()` = parent method.
**static:** on class, not instances.
**#field:** enforced private — SyntaxError if accessed outside class.
