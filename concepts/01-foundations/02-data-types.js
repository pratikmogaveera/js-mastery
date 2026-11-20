// ─────────────────────────────────────────────
// primitive types — typeof each
// ─────────────────────────────────────────────

const str = 'Joe'
const num = 25
const bool = true
const bigint = 2n
const nullVal = null
const und = undefined
const symbol = Symbol('description')

console.log('primitive types -----')
console.log(typeof str)     // 'string'
console.log(typeof num)     // 'number'
console.log(typeof bool)    // 'boolean'
console.log(typeof bigint)  // 'bigint'
console.log(typeof nullVal) // 'object' — bug: null is a primitive, not an object
console.log(typeof und)     // 'undefined'
console.log(typeof symbol)  // 'symbol'

// ─────────────────────────────────────────────
// null check — typeof is unreliable for null
// ─────────────────────────────────────────────

console.log('null check -----')
if (typeof nullVal === 'null') console.log('Check 1') // never runs — typeof null returns 'object', not 'null'
if (nullVal === null) console.log('Check 2')          // correct — only way to reliably check for null

// ─────────────────────────────────────────────
// primitives — copied by value (independent)
// ─────────────────────────────────────────────

console.log('primitive copy by value -----')
let original = 10
let copy = original
copy = 20
console.log(original) // 10 — unaffected, copy is independent

// ─────────────────────────────────────────────
// objects — copied by reference (shared)
// ─────────────────────────────────────────────

console.log('object copy by reference -----')
let originalObj = { name: 'Joey' }
let copyObj = originalObj  // both point to the same object in memory
copyObj.name = 'James'
console.log(originalObj) // { name: 'James' } — mutating copy mutated the original

// ─────────────────────────────────────────────
// shallow copy — spread creates independent top-level properties
// ─────────────────────────────────────────────

console.log('shallow copy via spread -----')
let originalObj2 = { name: 'Dave' }
let shallowCopy = { ...originalObj2 }
shallowCopy.age = 26
console.log(shallowCopy)   // { name: 'Dave', age: 26 }
console.log(originalObj2)  // { name: 'Dave' } — unchanged

// ─────────────────────────────────────────────
// instanceof — distinguishes arrays from plain objects
// typeof alone can't — both return 'object'
// ─────────────────────────────────────────────

console.log('instanceof -----')
const arr = [1, 2, 3]
const obj = { one: 1, two: 2, three: 3 }

console.log(typeof arr === typeof obj) // true — both return 'object', typeof can't tell them apart
console.log(arr instanceof Array)      // true
console.log(obj instanceof Array)      // false — the useful check

// ─────────────────────────────────────────────
// Object.prototype.toString.call() — reliable type tag for any value
// returns '[object Type]' format — works correctly on null, arrays, all types
// ─────────────────────────────────────────────

console.log('Object.prototype.toString.call() -----')
const a = 'a'
const b = 1
const c = null
const d = [1, 2, 3]
const e = { x: true }

console.log(Object.prototype.toString.call(a)) // [object String]
console.log(Object.prototype.toString.call(b)) // [object Number]
console.log(Object.prototype.toString.call(c)) // [object Null]  — correctly identifies null
console.log(Object.prototype.toString.call(d)) // [object Array] — correctly identifies array
console.log(Object.prototype.toString.call(e)) // [object Object]


// ─────────────────────────────────────────────
// type coercion — implicit and explicit
// ─────────────────────────────────────────────

// implicit — + prefers string if either operand is a string
console.log('coercion -----')
console.log('First' + 1)      // 'First1'  — number coerced to string
console.log('Second' + 2 + 2) // 'Second22' — left to right: 'Second2' then 'Second22'

// implicit — - only works on numbers, coerces string to number
console.log(3 - '2')          // 1

// explicit — Boolean() — falsy values
console.log(Boolean('abc'))   // true  — non-empty string is truthy
console.log(Boolean(''))      // false — empty string is falsy
console.log(Boolean(0))       // false
console.log(Boolean(null))    // false
console.log(Boolean(undefined)) // false
console.log(Boolean(NaN))     // false

// explicit — Number()
console.log(Number(''))        // 0   — empty string → 0
console.log(Number('42'))      // 42  — numeric string → number
console.log(Number('abc'))     // NaN — non-numeric string → failed conversion
console.log(Number(true))      // 1
console.log(Number(null))      // 0   — null is intentionally empty → 0
console.log(Number(undefined)) // NaN — undefined is unknown → no sensible numeric value



console.log(2 + 3 + '4')
console.log('4' + 2 + 3)
console.log(+'5')
console.log(+true)
console.log(+null)