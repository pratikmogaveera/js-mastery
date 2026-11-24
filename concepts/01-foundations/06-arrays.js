// ─────────────────────────────────────────────
// mutation methods — push, pop, shift, unshift, splice
// these modify the original array in place
// ─────────────────────────────────────────────

const arr = [0, 1, 2, 3]

console.log('push / pop / shift / unshift -----')
console.log(arr.push(4), arr)      // 5, [0,1,2,3,4]   — push returns new length
console.log(arr.pop(), arr)        // 4, [0,1,2,3]     — pop returns removed element
console.log(arr.shift(), arr)      // 0, [1,2,3]       — shift returns removed element
console.log(arr.unshift(-1), arr)  // 4, [-1,1,2,3]    — unshift returns new length

console.log('splice -----')
console.log(arr.splice(0, 1), arr)       // [-1], [1,2,3]       — remove only: splice(start, deleteCount)
console.log(arr.splice(0, 0, 4, 5), arr) // [], [4,5,1,2,3]     — insert only: deleteCount = 0
console.log(arr.splice(0, 2, 0), arr)    // [4,5], [0,1,2,3]    — replace: remove 2, insert 0

// ─────────────────────────────────────────────
// sort — default is lexicographic (string comparison), not numeric
// always pass a comparator for numbers
// ─────────────────────────────────────────────

const arr2 = [0, 1, 2, 3, 10, 100]

console.log('sort -----')
console.log(arr2.sort())               // [0,1,10,100,2,3]  — lexicographic: '10' < '2'
console.log(arr2.sort((a, b) => a - b)) // [0,1,2,3,10,100]  — numeric ascending
console.log(arr2.sort((a, b) => b - a)) // [100,10,3,2,1,0]  — numeric descending

// ─────────────────────────────────────────────
// reverse, fill, copyWithin — all mutate in place
// ─────────────────────────────────────────────

console.log('reverse / fill / copyWithin -----')
console.log([0, 1, 2, 3].reverse())         // [3,2,1,0]

console.log([0, 1, 2, 3].fill(0))           // [0,0,0,0]       — fill entire array
console.log([0, 1, 2, 3].fill(0, 2))        // [0,1,0,0]       — from index 2 to end
console.log([0, 1, 2, 3].fill(-1, 1, 3))    // [0,-1,-1,3]     — indices 1 and 2 only
console.log([0, 1, 2, 3].fill(0, 0, 6))     // [0,0,0,0]       — end out of bounds caps at array length
console.log(new Array(5).fill(0))           // [0,0,0,0,0]     — initialise fixed-size array

// copyWithin(target, start, end) — copies portion of array to another position in same array
console.log([0, 1, 2, 3, 4, 5, 6, 7].copyWithin(0, 4))    // [4,5,6,7,4,5,6,7] — copy from index 4 to end, paste at 0
console.log([0, 1, 2, 3, 4, 5, 6, 7].copyWithin(0, 4, 5)) // [4,1,2,3,4,5,6,7] — copy only index 4, paste at 0


// ─────────────────────────────────────────────
// iteration methods — forEach, map, filter, reduce, reduceRight
// none of these mutate the original array
// ─────────────────────────────────────────────

const x = [1, 2, 3, 4, 5]

console.log('iteration methods -----')

// forEach — runs callback for each element, always returns undefined
let sum = 0
const result = x.forEach(item => sum += item)
console.log(result, sum)  // undefined, 15 — forEach returns undefined, not the array

// map — transforms each element, returns new array of same length
const doubleX = x.map(item => item * 2)
console.log(doubleX)      // [2, 4, 6, 8, 10]

// filter — returns new array of elements where callback is truthy
const evenX = x.filter(item => item % 2 === 0)
console.log(evenX)        // [2, 4]

// reduce — accumulates to a single value
// example 1: sum
const sumX = x.reduce((acc, curr) => acc + curr, 0)
console.log(sumX)         // 15

// example 2: build object from array — reduce isn't just for numbers
const countObj = ['a', 'b', 'a', 'c', 'b', 'a'].reduce((acc, curr) => {
  if (curr in acc) acc[curr] += 1  // 'in' checks own + prototype — safe here since keys are user-defined
  else acc[curr] = 1
  return acc
}, {})
console.log(countObj)     // { a: 3, b: 2, c: 1 }

// reduceRight — same as reduce but processes right to left
const reverseX = x.reduceRight((acc, curr) => acc + curr, '')
console.log(reverseX)     // '54321'


// ─────────────────────────────────────────────
// search methods — indexOf, lastIndexOf, includes, find, findIndex, findLast, findLastIndex
// indexOf/includes use strict equality — won't work for finding objects by value
// find/findIndex use a callback — works for objects and complex conditions
// ─────────────────────────────────────────────

console.log('search methods -----')
const y = [1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 9, 1]

console.log(y.indexOf(1))              // 0     — first occurrence
console.log(y.lastIndexOf(1))          // 12    — last occurrence
console.log(y.includes(4), y.includes(-1)) // true, false

const z = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Alice' }]

// indexOf fails for objects — compares by reference, not value
// z.indexOf({ id: 1, name: 'Alice' })  // -1 — different object reference

// find/findIndex/findLast/findLastIndex — use callback, works for objects
console.log(z.find(item => item.id === 1))            // { id: 1, name: 'Alice' }
console.log(z.findIndex(item => item.name === 'Alice')) // 0 — first Alice
console.log(z.findLast(item => item.name === 'Alice')) // { id: 3, name: 'Alice' } — last Alice
console.log(z.findLastIndex(item => item.id === 3))   // 2


// ─────────────────────────────────────────────
// test methods — some, every
// both short-circuit: some stops at first true, every stops at first false
// ─────────────────────────────────────────────

console.log('some / every -----')
console.log([1, 2, 3, 4].some(item => item > 2))     // true  — at least one passes (3, 4)
console.log([2, 4, 6].every(item => item % 2 === 0))  // true  — all pass
console.log([1, 2, 3].every(item => item % 2 === 0))  // false — 1 and 3 fail

// empty array edge case — know these cold
console.log([].some(n => n > 0))   // false — no elements passed, so not "at least one"
console.log([].every(n => n > 0))  // true  — no elements failed (vacuous truth)

// ─────────────────────────────────────────────
// flat, flatMap — flatten nested arrays
// flat: default depth 1 | flatMap: map then flat(1)
// ─────────────────────────────────────────────

console.log('flat / flatMap -----')
const nested = [1, 2, 3, [4, 5, [6], [7, [8, 9]]]]
console.log(nested.flat())          // [1,2,3,4,5,[6],[7,[8,9]]]  — depth 1 (default)
console.log(nested.flat(2))         // [1,2,3,4,5,6,7,[8,9]]      — depth 2
console.log(nested.flat(Infinity))  // [1,2,3,4,5,6,7,8,9]        — fully flatten

const sentences = ['hello world', 'foo bar']
console.log(sentences.map(s => s.split(' ')))     // [['hello','world'],['foo','bar']] — nested
console.log(sentences.flatMap(s => s.split(' '))) // ['hello','world','foo','bar']    — flattened


// ─────────────────────────────────────────────
// creation and access — Array.from, Array.of, Array.isArray, at(), entries/keys/values
// ─────────────────────────────────────────────

console.log('creation and access -----')

// Array.from — create array from any iterable or array-like
console.log(Array.from('Hello'))                          // ['H','e','l','l','o']
console.log(Array.from({ length: 3 }, (_, i) => i * 2))  // [0, 2, 4] — create by index
console.log(Array.from(new Set([1, 2, 3])))               // [1, 2, 3] — Set to array (deduplicate)

// Array.of vs new Array — new Array(3) creates 3 empty slots, not [3]
console.log(new Array(3))   // [ <3 empty items> ] — 3 empty slots
console.log(Array.of(3))    // [3]                 — array containing the value 3

// at() — supports negative indices, bracket notation does not
console.log([1, 2, 3].at(0))   // 1
console.log([1, 2, 3].at(-1))  // 3 — last element

// Array.isArray — only reliable way to check (typeof returns 'object')
console.log(Array.isArray([0, 1, 2, 3]))    // true
console.log(Array.isArray({ name: 'Joey' })) // false

// entries / keys / values — iterators
const sequency = [1, 2, 3]
for (const i of sequency.keys())
  console.log(i)       // 0, 1, 2 — indices only

for (const v of sequency.values())
  console.log(v)       // 1, 2, 3 — values only

for (const [i, v] of sequency.entries())
  console.log(i, v)    // 0 1, 1 2, 2 3 — index + value pairs