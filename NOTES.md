# js-mastery — Notes

Detailed concepts, mental models, patterns, and Q&A. Appended after each completed topic.

---

## Section 1 — Foundations

---

### Variables & Scoping

#### Concept

Three keywords, three different scoping and hoisting behaviours:

| | Scope | Hoisted? | Initialised at hoist? | Re-declare? | Reassign? |
|---|---|---|---|---|---|
| `var` | function | yes | yes → `undefined` | yes | yes |
| `let` | block | yes | no → TDZ | no | yes |
| `const` | block | yes | no → TDZ | no | no |

**Hoisting** — JS scans a scope before executing it and registers all declarations upfront. `var` is registered AND initialised to `undefined`. `let`/`const` are registered but not initialised — the gap between registration and initialisation is the **Temporal Dead Zone (TDZ)**.

**Why TDZ?** To prevent a silent bug. Without it, accessing a `let` before its declaration would silently walk up the scope chain and find something unexpected. TDZ makes it a loud `ReferenceError`.

**Scope types:**
- **Global** — declared outside any block or function, accessible everywhere
- **Function** — `var` inside a function, accessible anywhere in that function
- **Block** — `let`/`const` inside `{}`, only accessible within that block

#### Gotchas

**TDZ + shadowing trap (common interview question):**
```js
var x = 'global'
function outer() {
    console.log(x)  // undefined — NOT 'global'
    var x = 'outer'
}
outer()
```
`var x = 'outer'` is hoisted inside `outer()`, shadowing the global `x`. At the time of `console.log`, it exists in scope but isn't assigned yet → `undefined`. If it were `let`, it'd be a `ReferenceError` (TDZ, not `undefined`).

**SyntaxErrors are parse-time — `try/catch` won't help:**
- `let a = 1; let a = 2` → `SyntaxError` at parse time
- `const x` (no initializer) → `SyntaxError` at parse time
- Neither can be caught at runtime with `try/catch`

**`var` re-declaration is silent:**
```js
var a = 1
var a = 2  // no error — a is now 2
```

#### Q&A

**Why does `var` inside an `if` block leak out but `let` doesn't?**
`var` is function-scoped — the `if` block's `{}` is not a new scope for `var`. `let`/`const` are block-scoped — any `{}` creates a new scope.

**What's the difference between `ReferenceError: cannot access 'x' before initialization` and `ReferenceError: x is not defined`?**
First = TDZ — the variable exists in this scope but hasn't been initialized yet. Second = the variable doesn't exist in this scope at all. Same error type, completely different cause.

**If `let`/`const` are also hoisted, what's the practical difference from `var`?**
Hoisting just means the engine knows about the variable before running code. The difference is what state it's in: `var` is immediately usable (as `undefined`), `let`/`const` are in TDZ and inaccessible until the declaration line.

---

### Data Types

#### Concept

JS has 8 data types. 7 primitives, 1 reference type.

**Primitives** — stored by value, copied independently:
`string`, `number`, `bigint`, `boolean`, `null`, `undefined`, `symbol`

**Reference type** — stored by reference (arrays, functions, dates are all objects):
`object`

Copying a primitive creates an independent value. Copying an object copies the reference — both variables point to the same thing in memory. Mutating one mutates the other.

Shallow copy via spread or `Object.assign` fixes top-level properties but nested objects are still shared.

#### typeof table

| Value | `typeof` |
|-------|----------|
| `'hello'` | `'string'` |
| `42` | `'number'` |
| `true` | `'boolean'` |
| `undefined` | `'undefined'` |
| `null` | `'object'` ← bug |
| `{}` or `[]` | `'object'` |
| `function(){}` | `'function'` ← special case |
| `Symbol()` | `'symbol'` |
| `42n` | `'bigint'` |

`typeof` is unreliable for `null` (returns `'object'`) and can't distinguish arrays from plain objects (both `'object'`).

#### Reliable type checking

```js
value === null                                      // only way to check null
value instanceof Array                             // distinguish array from object
Object.prototype.toString.call(value).slice(8,-1)  // 'Null', 'Array', 'String', etc.
```

`Object.prototype.toString.call()` works because it uses the engine's internal type tag, bypassing any overridden `toString` methods. `null.toString()` would throw — `.call(null)` doesn't.

#### Type coercion

**Implicit** — JS converts automatically. **Explicit** — you do it manually (`Number()`, `String()`, `Boolean()`).

`+` rules — if either operand is a string, the other is coerced to string (concatenation). Every other arithmetic operator coerces to number.

```js
2 + 3 + '4'   // '54' — left to right: 5 then '54'
'4' + 2 + 3   // '423' — left to right: '42' then '423'
3 - '2'       // 1 — string coerced to number
+'5'          // 5 — unary + coerces to number
```

**Falsy values:** `0`, `''`, `null`, `undefined`, `NaN`, `false` — everything else is truthy including `'0'`, `[]`, `{}`.

**`==` coercion order:**
1. boolean operand → convert to number first
2. string vs number → convert string to number
3. `null` only `==` `undefined` — does not follow the number conversion path

**`Number()` gotchas:**
```js
Number('')         // 0
Number('abc')      // NaN — failed conversion
Number(null)       // 0   — null is intentionally empty
Number(undefined)  // NaN — undefined is unknown, no numeric equivalent
```

#### Q&A

**Why does `null == false` return `false` if null is falsy?**
`==` doesn't convert both sides to boolean. It converts booleans to numbers first. `null` doesn't follow that path — `null` only loosely equals `undefined`. Falsy is a boolean concept; `==` has its own coercion rules.

**Why does `typeof function(){}` return `'function'` and not `'object'`?**
Functions are objects, but the spec gives them a special `typeof` result as a convenience. Useful in practice but technically inconsistent.

**`Number(null)` → 0 but `Number(undefined)` → NaN — why?**
`null` is deliberate emptiness → numeric equivalent is `0`. `undefined` is "unknown/never set" → no sensible numeric value → `NaN`.

---

### Operators

#### Logical operators

`||`, `&&`, `??` don't return `true`/`false` — they return one of their operands.

| Operator | Returns |
|----------|---------|
| `\|\|` | first truthy value, or last value if all falsy |
| `&&` | first falsy value, or last value if all truthy |
| `??` | right side only if left is `null` or `undefined` |

**`||` vs `??` for default values:**
Use `??` when `0` or `''` are valid values — `||` treats them as empty and replaces them. `??` only triggers for `null`/`undefined`.

```js
const age = 0
age || 18    // 18 — wrong, 0 is valid
age ?? 18    // 0  — correct
```

#### Logical assignment

```js
x ||= y   // assign if x is falsy
x &&= y   // assign only if x is truthy
x ??= y   // assign only if x is null/undefined
```

Real use: `&&=` to only update a value if it already exists. `??=` to set a default without overwriting falsy-but-valid values.

#### Optional chaining

```js
obj?.prop        // property access
obj?.['key']     // computed property access
obj?.method?.()  // method call
```

Returns `undefined` instead of throwing `TypeError` when any part of the chain is `null`/`undefined`. Short-circuits — once `undefined` is hit, the rest of the chain is not evaluated.

#### Misc operators

- **ternary** — `condition ? a : b` — inline if/else
- **`delete`** — removes a property from an object, returns `true`
- **`in`** — checks if property exists on object OR its prototype chain
- **`void`** — evaluates expression, always returns `undefined`
- **comma** — evaluates left to right, returns last value. In `for` loop update slot: `i++, j--` runs both side effects. Init slot comma (`let i = 0, j = 10`) is declaration syntax, not the comma operator.

#### Q&A

**Why does `'toString' in obj` return true for a plain object?**
`in` checks the full prototype chain, not just own properties. `toString` lives on `Object.prototype` which every plain object inherits from.

**What's the difference between the comma in `let i=0, j=10` and `i++, j--`?**
`let i=0, j=10` is variable declaration syntax — comma separates declarators. `i++, j--` is the comma operator — evaluates both expressions, returns last value. The for loop discards the return value and only uses the side effects.

**When does `?.` short-circuit?**
As soon as any part of the chain is `null` or `undefined`, the rest of the expression is not evaluated — it immediately returns `undefined`.

---

### Functions

#### Three ways to define a function

| | Hoisting | `this` |
|---|---|---|
| Declaration | Fully hoisted (name + body) | Own `this`, determined at call time |
| Expression (`const f = function(){}`) | Variable hoisted (TDZ if `let`/`const`, `undefined` if `var`), body is not | Own `this`, determined at call time |
| Arrow (`const f = () => {}`) | Variable hoisted (TDZ if `let`/`const`), body is not | No own `this` — inherits from lexical scope |

**Hoisting gotcha:** `var` expression hoists to `undefined` → calling it throws `TypeError: f is not a function`. `let`/`const` expression is in TDZ → calling it throws `ReferenceError`.

#### Default parameters

Only triggered by `undefined` — not by any other falsy value:
```js
function greet(name = 'Stranger') { return `Hello ${name}` }
greet('')        // 'Hello '        — '' is not undefined
greet(null)      // 'Hello null'    — null is not undefined
greet(undefined) // 'Hello Stranger' — triggers default
greet()          // 'Hello Stranger' — no arg = undefined
```

#### Rest parameters vs `arguments` object

```js
// rest — real array, works in arrow functions too
function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }

// arguments — array-like object, regular functions only
function old() { console.log(arguments) }  // Arguments { '0': ..., '1': ... }
```

Arrow functions have no own `arguments` — they inherit it from the nearest enclosing regular function's scope. In Node.js CJS files, the top-level scope IS a function (the module wrapper), so `arguments` resolves to Node's internal module args (`exports`, `require`, `module`, etc.) — not a ReferenceError.

```js
function outer(a, b) {
  const arrow = () => console.log(arguments)  // logs outer's args, not arrow's
  const withRest = (...args) => console.log(args) // logs arrow's actual args
  arrow(99, 100)    // [Arguments] { '0': 1, '1': 2 } — outer's
  withRest(99, 100) // [99, 100] — rest captures arrow's own call args
}
outer(1, 2)
```

#### Q&A

**Why does `greet(null)` not use the default value?**
Default parameters only activate for `undefined`. `null` is a deliberate value meaning "no value" — JS respects that choice and passes `null` through.

**Why can't you use `arguments` in arrow functions?**
Arrow functions have no own execution context — no own `this`, no own `arguments`. They borrow from the enclosing scope. Use rest params (`...args`) instead — they always capture the arrow's own call arguments.

#### IIFE

An Immediately Invoked Function Expression — defined and called in one shot. The outer `()` turns it into an expression (not a declaration), the trailing `()` calls it.

```js
const config = (function() {
  const secret = 'hidden'  // not accessible outside
  const version = '1.0'
  return { theme: 'dark', version }  // only this is exposed
})()

console.log(config.theme) // 'dark'
console.log(secret)       // ReferenceError
```

**Why use IIFE over a named function?**
A named function also contains its variables — but the function name itself leaks into the outer scope. IIFE leaves nothing behind: no name, no reference, can't be accidentally called again. Self-documenting intent: "runs once, right now."

Historical use: libraries wrapped entire codebases in IIFEs to contain internals and expose only one value (`jQuery`, `Lodash`, etc.). Today ES modules handle this naturally.

**ASI trap:** a line ending without a semicolon followed by `(` — JS reads the `(` as a function call on the previous line's result. Always put a semicolon before an IIFE (or after the preceding statement) to avoid this.

#### Why arrow functions can't be constructors

`new Fn()` does four things:
1. Creates a new empty object `{}`
2. Links its `[[Prototype]]` to `Fn.prototype`
3. Calls `Fn` with `this = new object`
4. Returns the object

Arrow functions fail at steps 2 and 3:
- No `prototype` property → prototype chain link can't be established
- No own `this` → properties have nowhere to be written

**Interview answer:** Arrow functions have no own `this` and no `prototype` property. `new` requires both — it sets `this` to the new object so the constructor can write properties onto it, and uses `Fn.prototype` to establish the prototype chain. Without either, `new` throws `TypeError: X is not a constructor`.

#### Q&A

**Why does `greet(null)` not use the default value?**
Default parameters only activate for `undefined`. `null` is a deliberate value meaning "no value" — JS respects that choice and passes `null` through.

**Why can't you use `arguments` in arrow functions?**
Arrow functions have no own execution context — no own `this`, no own `arguments`. They borrow from the enclosing scope. Use rest params (`...args`) instead — they always capture the arrow's own call arguments.

**Arrow function at top level of a Node.js CJS file — why does `arguments` not throw?**
Node.js wraps every CJS file in a module wrapper function. The arrow function's lexical scope IS that wrapper, which has its own `arguments` (`exports`, `require`, `module`, `__filename`, `__dirname`). So `arguments` resolves to the module wrapper's args, not a ReferenceError.

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

Prefer `slice` — more predictable.

```js
'abcdefgh'.slice(2, 5)      // 'cde'
'abcdefgh'.slice(-3)        // 'fgh'
'abcdefgh'.substring(-3)    // 'abcdefgh' — negative → 0
'abcdefgh'.substring(5, 2)  // 'cde'      — args swapped
'abcdefgh'.slice(5, 2)      // ''         — no swap, empty
```

#### Transformation

```js
'hello'.toUpperCase()       // 'HELLO'
'  hello  '.trim()          // 'hello'
'  hello  '.trimStart()     // 'hello  '
'  hello  '.trimEnd()       // '  hello'
'5'.padStart(3, '0')        // '005' — total length 3
'42'.padStart(3, '0')       // '042'
'999'.padStart(3, '0')      // '999' — already at length
'ab'.repeat(3)              // 'ababab'
```

#### split / replace / replaceAll

```js
'a,b,c'.split(',')           // ['a', 'b', 'c']
'abc'.split('')              // ['a', 'b', 'c']
'abc'.split()                // ['abc']
'aabbcc'.replace('b', 'X')   // 'aaXbcc'  — first only
'aabbcc'.replace(/b/g, 'X')  // 'aaXXcc'
'aabbcc'.replaceAll('b', 'X') // 'aaXXcc'
```

#### at(), template literals, matchAll()

```js
'hello'.at(-1)    // 'o'
'hello'[-1]       // undefined — bracket notation doesn't support negatives

`Hello ${name}`   // interpolation, any expression in ${}
// multiline: backtick strings preserve line breaks

// matchAll — full match objects with index and capture groups
const matches = [...str.matchAll(/pattern/g)]
matches[0][0]     // matched string
matches[0].index  // position in original

// positional capture groups
const m = [...'cat bat'.matchAll(/([a-z])(at)/g)]
m[0][1]  // 'c' — first group
m[0][2]  // 'at' — second group

// named capture groups — (?<name>...)
const d = [...'2024-01-15'.matchAll(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g)]
d[0].groups.year   // '2024'
d[0].groups.month  // '01'
// groups has null prototype — intentional, avoids conflicts with built-in names
```

#### Q&A

**Why does `if (str.indexOf('x'))` fail when `'x'` isn't in the string?**
`indexOf` returns `-1` when not found. `-1` is truthy. The if-block runs. Use `str.indexOf('x') !== -1` or `str.includes('x')`.

**`match(/g)` vs `matchAll()`?**
`match` with `/g` returns matched strings only — no index, no groups. `matchAll` returns full match objects with index and capture groups. Use `matchAll` when position or groups matter.

**Why prefer `slice` over `substring`?**
`substring` silently treats negatives as 0 and swaps args when `start > end`. `slice` is explicit and predictable.

---

### Arrays

#### Mutating vs non-mutating

**Mutating:** `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`

**Non-mutating:** `map`, `filter`, `reduce`, `find`, `findIndex`, `some`, `every`, `flat`, `flatMap`, `forEach`

Gotcha: `sort` and `reverse` both mutate AND return the array.

#### Key methods

```js
// mutation
arr.push(v)             // add end, return new length
arr.pop()               // remove end, return item
arr.unshift(v)          // add start, return new length
arr.shift()             // remove start, return item
arr.splice(i, n, ...v)  // remove n from i, insert v, return removed

// sort gotcha
[10,9,2].sort()                // [10,2,9] — lexicographic
[10,9,2].sort((a,b) => a-b)   // [2,9,10] — numeric

// iteration
arr.forEach(cb)   // undefined — side effects only
arr.map(cb)       // new array, same length
arr.filter(cb)    // new array, elements where cb is truthy
arr.reduce((acc, curr) => ..., init)  // single value

// search
arr.find(cb)         // first element or undefined
arr.findIndex(cb)    // first index or -1
arr.findLast(cb)     // last element or undefined
arr.includes(val)    // boolean (strict equality)
arr.indexOf(val)     // index or -1 (fails for objects — use find)

// test
arr.some(cb)   // true if any pass | [].some(cb) → false
arr.every(cb)  // true if all pass | [].every(cb) → true (vacuous)

// flat
arr.flat(depth)       // default depth 1
arr.flatMap(cb)       // map then flat(1)

// creation
Array.from(iterable, mapFn?)  // from any iterable
Array.of(3)                   // [3] (not 3 empty slots like new Array(3))
Array.isArray(val)            // only reliable array check

// access
arr.at(-1)        // last element
arr.entries()     // [index, value] pairs
arr.keys()        // indices
arr.values()      // values
```

#### Destructuring / spread / rest

```js
const [a, b = 2] = [1]      // defaults for missing
const [h, ...t] = [1,2,3]   // rest: h=1, t=[2,3]
const [x, , z] = [1,2,3]    // skip: x=1, z=3
let [p, q] = [1,2]; [p,q] = [q,p]  // swap — ASI trap, need ; before [
const merged = [...a, ...b]  // spread merge
```

---

### Objects (in progress)

#### Object literals

```js
const name = 'Pratik'
const obj = { name }                   // shorthand — same as { name: name }
const obj2 = { [key]: 'value' }        // computed key from variable
const obj3 = { [`prefix_${key}`]: 1 }  // computed key with expression
```

#### Dot vs bracket notation

```js
obj.name     // static key — known at write time
obj['name']  // bracket — same result
obj[key]     // bracket — uses variable's value as key
obj.key      // wrong — looks for literal property 'key', not variable value
```

Must use bracket: dynamic keys, keys stored in variables, numeric keys, keys with special characters.

#### Object.keys / values / entries / fromEntries

```js
Object.keys(obj)    // array of own enumerable keys
Object.values(obj)  // array of own enumerable values
Object.entries(obj) // array of [key, value] pairs

Object.fromEntries(pairs)  // reverse — [key, value] pairs → object
```

**Transform pattern** — common interview pattern:
```js
const doubled = Object.fromEntries(
  Object.entries({ a: 1, b: 2 }).map(([k, v]) => [k, v * 2])
)  // { a: 2, b: 4 }
```

#### Object.assign / spread / freeze / seal

```js
// Object.assign — copies into target, mutates target
const merged = Object.assign({}, obj1, obj2)  // {} prevents mutating obj1

// spread merge — same result, cleaner
const merged2 = { ...obj1, ...obj2 }

// freeze — no add, delete, or modify
Object.freeze(obj)
obj.x = 1       // silently fails
delete obj.x    // silently fails

// seal — no add or delete, modify ok
Object.seal(obj)
obj.x = 1       // succeeds
delete obj.x    // silently fails
```

#### Property descriptors

```js
Object.defineProperty(obj, 'key', {
  value: 42,
  writable: false,      // cannot reassign
  enumerable: false,    // hidden from keys/entries/spread/console.log
  configurable: false,  // cannot delete or reconfigure
})

obj.key = 99          // silently fails
delete obj.key        // silently fails
obj.key               // 42 — still accessible directly
Object.keys(obj)      // key not listed
```

`defineProperty` = surgical per-property control.
`freeze` = all flags false on every property.
`seal` = configurable false on every property, writable unchanged.

#### Getters and setters

```js
const obj = {
  _x: 0,
  _y: 0,
  set coords(value) {
    [this._x, this._y] = value.split(',').map(Number)
  },
  get coords() { return `${this._x}, ${this._y}` },
}

obj.coords = '3,4'   // triggers setter
obj.coords           // triggers getter — '3, 4'
```

- `get` — called like a property read (no `()`)
- `set` — triggered by assignment
- `_prefix` — convention for internal properties, not enforced by language
- Use `Object.defineProperty` to add getters/setters to existing objects too

#### Object.create(null) / hasOwn / delete

```js
// Object.create(null) — no prototype chain
const dict = Object.create(null)
dict.key = 'value'
dict.toString   // undefined — no prototype, no inherited methods
// dict.hasOwnProperty('key')  // TypeError — doesn't exist on null-prototype

// Object.hasOwn — works on all objects including null-prototype
Object.hasOwn(obj, 'key')   // true/false
// vs obj.hasOwnProperty('key') — fails on null-prototype, can be overridden

// delete
delete obj.key   // true  — deleted
delete obj.x     // true  — key didn't exist, no error (not false!)
// delete non-configurable → false (use defineProperty configurable: false to test)
```

**`delete` gotcha:** returns `true` for non-existent keys. `true` means "deletion didn't fail", not "a property was removed".

---

### Object Polyfills

#### deepClone

```js
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj  // null + primitives
  if (Array.isArray(obj)) return obj.map(item => deepClone(item))  // arrays
  const result = {}
  Object.entries(obj).forEach(([k, v]) => result[k] = deepClone(v))
  return result
}
```

Limitations: does not handle `Date`, `RegExp`, `Map`, `Set`, or circular references. For those, use `structuredClone()`.

#### deepEqual

```js
function deepEqual(x, y) {
  if (typeof x !== typeof y) return false
  if (x === null || y === null) return x === y  // null before object branch
  if (Array.isArray(x) || Array.isArray(y)) {
    if (!Array.isArray(x) || !Array.isArray(y)) return false
    if (x.length !== y.length) return false
    for (let i = 0; i < x.length; i++)
      if (!deepEqual(x[i], y[i])) return false
    return true
  }
  if (typeof x === 'object') {
    if (Object.keys(x).length !== Object.keys(y).length) return false
    for (const key of Object.keys(x))
      if (!deepEqual(x[key], y[key])) return false
    return true
  }
  return x === y
}
```

#### flattenObject

```js
function flattenObject(value, prefix) {
  const result = {}
  if (typeof value !== 'object' || value === null) return value  // null + primitives
  Object.keys(value).forEach(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const res = flattenObject(value[key], fullKey)
    if (typeof res === 'object' && res !== null)
      Object.assign(result, res)   // object — merge (not nest)
    else
      result[fullKey] = res        // primitive/null — write directly
  })
  return result
}
```

**Key insight:** when recursive call returns an object, use `Object.assign` to merge its keys into the current result. Never assign the sub-object as a value — that nests instead of flattening.

**null guard:** `res !== null` prevents `Object.assign(result, null)` which would throw. `null` is handled like a primitive.

---

### Control Flow

#### for vs for...of vs for...in

| | Iterates | Use for |
|---|---|---|
| `for` | index (manual) | arrays when index needed |
| `for...of` | values | arrays, strings, Maps, Sets, any iterable |
| `for...in` | own + inherited enumerable keys | plain objects only |

**`for...in` on arrays — never do this:**
- Keys are **strings** (`'0'`, `'1'`), not numbers
- Inherited enumerable properties on `Array.prototype` show up too

**`for...of` on plain objects — throws:**
- Plain objects have no iterator — `TypeError: obj is not iterable`
- Use `Object.values(obj)` with `for...of` to iterate values

#### while vs do...while

```js
while (condition) { ... }   // checks before — may never run
do { ... } while (condition) // checks after — always runs at least once
```

#### switch — fall-through

Without `break`, execution continues into the next case after a match:

```js
switch (2) {
  case 2: console.log('two')    // matches
  case 3: console.log('three')  // also runs — no break
  default: console.log('other') // also runs
}
// two, three, other
```

Always use `break` (or `return` inside a function) unless fall-through is intentional.

#### Labelled break

`break` and `continue` target the innermost loop by default. Labels let you exit an outer loop:

```js
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (found) break outerLoop  // exits both loops
  }
}
```

**Use case:** searching a 2D structure — once you find the value, stop all iteration.

#### Q&A

**Why is `for...in` dangerous on arrays?**
Two reasons: keys are strings (`'0'`), not numbers — `key === 0` is `false`. And inherited enumerable properties on `Array.prototype` appear as keys too. Use `for...of` or a regular `for` loop on arrays.

**What's the difference between `for...of` on an object vs `for...in`?**
`for...of` on a plain object throws — objects are not iterable. `for...in` works on objects — it gives enumerable keys. Use `for (const val of Object.values(obj))` to iterate values.

---

## Section 2 — Core Concepts

---

## Section 4 — Advanced Features

---

## Section 5 — Design Patterns

---

## Section 6 — Performance & Internals

---

## Section 2 — Core Concepts (notes)

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
