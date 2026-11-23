// ─────────────────────────────────────────────
// search methods — indexOf, lastIndexOf, includes, startsWith, endsWith
// all methods are case-sensitive
// ─────────────────────────────────────────────

const x = 'JavaScript is awesome!'

console.log('search methods -----')
console.log(x.indexOf('Java'))      // 0  — found at index 0
console.log(x.indexOf('Python'))    // -1 — not found

// indexOf gotcha — -1 is truthy, so a bare if check gives wrong result
console.log(x.indexOf('Python') ? 'Awesome!' : 'Boo!')             // 'Awesome!' — WRONG (-1 is truthy)
console.log(x.indexOf('Python') !== -1 ? 'Awesome!' : 'Boo!')      // 'Boo!'    — correct
console.log(x.includes('Python') ? 'Awesome!' : 'Boo!')            // 'Boo!'    — cleanest

console.log(x.lastIndexOf('a'))     // 14 — last 'a' in 'awesome'
console.log(x.includes('awesome'))  // true
console.log(x.includes('Awesome'))  // false — case-sensitive
console.log(x.startsWith('JavaS'))  // true
console.log(x.endsWith('some!'))    // true



// ─────────────────────────────────────────────
// extraction — slice vs substring
// slice: supports negative indices, doesn't swap args
// substring: negatives treated as 0, swaps args if start > end
// ─────────────────────────────────────────────

const y = '012345678'

console.log('extraction -----')
console.log(y.slice(2))        // '2345678' — from index 2 to end
console.log(y.substring(2))    // '2345678' — same

console.log(y.slice(2, 5))     // '234'     — indices 2, 3, 4
console.log(y.substring(2, 5)) // '234'     — same

console.log(y.slice(-3))       // '678'     — last 3 chars (index 9-3=6)
console.log(y.substring(-3))   // '012345678' — negative treated as 0, full string

console.log(y.slice(5, 2))     // ''        — start > end, returns empty (no swap)
console.log(y.substring(5, 2)) // '234'     — start > end, args swapped to (2, 5)


// ─────────────────────────────────────────────
// transformation — case, trim, pad, repeat
// all return new strings — originals are unchanged
// ─────────────────────────────────────────────

const z = '  Hello  '

console.log('transformation -----')
console.log(z.toUpperCase()) // '  HELLO  '
console.log(z.toLowerCase()) // '  hello  '
console.log(z.trimStart())   // 'Hello  '   — whitespace removed from left only
console.log(z.trimEnd())     // '  Hello'   — whitespace removed from right only
console.log(z.trim())        // 'Hello'     — both sides

// padStart/padEnd — first arg is TOTAL target length, not chars to add
console.log('5'.padStart(3, '*'))   // '**5' — 1 char + 2 padding = 3 total
console.log('5'.padEnd(3, '*'))     // '5**'
console.log('42'.padStart(3, '0'))  // '042' — 2 chars, only 1 padding needed
console.log('999'.padStart(3, '0')) // '999' — already at target length, nothing added

console.log('5'.repeat(3))          // '555'


const a = "a,b,c"

// ─────────────────────────────────────────────
// split, replace, replaceAll
// replace — first occurrence only (use replaceAll or regex /g for all)
// ─────────────────────────────────────────────

console.log('split / replace -----')
console.log('a,a,a,b,c'.split(','))  // ['a', 'a', 'a', 'b', 'c'] — splits on each comma
console.log('aaa,b,c'.split(''))     // ['a','a','a',',','b',',','c'] — splits every char
console.log('aaa,b,c'.split())       // ['aaa,b,c'] — no separator = single element array

// replace — first occurrence only
console.log('a,a,a,b,c'.replace('a', 'x'))    // 'x,a,a,b,c' — only first 'a' replaced
console.log('a,a,a,b,c'.replace(/a/g, 'x'))   // 'x,x,x,b,c' — regex /g flag replaces all

// replaceAll — all occurrences, cleaner than regex for simple cases
console.log('a,a,a,b,c'.replaceAll('a', 'x')) // 'x,x,x,b,c'


console.log("Hello".at(0)) // "H"
// ─────────────────────────────────────────────
// at(), template literals, matchAll()
// ─────────────────────────────────────────────

console.log('at / template / matchAll -----')

// at() — supports negative indices, bracket notation does not
console.log('Hello'.at(1))   // 'e'
console.log('Hello'.at(-1))  // 'o' — last char
console.log('Hello'[2])      // 'l' — bracket notation works for positive
console.log('Hello'[-2])     // undefined — bracket notation doesn't support negatives

// template literals — interpolation + multiline
const user = 'John'
console.log(`Hello ${user}`)  // 'Hello John'
console.log(`${user} is a boy.
He lives in London.`)
// 'John is a boy.
//  He lives in London.'

// match() vs matchAll() — match /g loses index info, matchAll keeps it
const str = 'cat bat sat'
console.log([...str.match(/[a-z]at/g)])     // ['cat', 'bat', 'sat'] — just strings, no positions

const matches = [...str.matchAll(/[a-z]at/g)]
console.log(matches)
// [ ['cat', index: 0, ...], ['bat', index: 4, ...], ['sat', index: 8, ...] ]
console.log(matches[0][0])    // 'cat'
console.log(matches[0].index) // 0

// ─────────────────────────────────────────────
// matchAll with capture groups — positional and named
// ─────────────────────────────────────────────

console.log('matchAll capture groups -----')

// positional groups — match[1], match[2]... by parenthesis order
const catMatches = [...'cat bat sat'.matchAll(/([a-z])(at)/g)]
console.log(catMatches[0][0])  // 'cat' — full match
console.log(catMatches[0][1])  // 'c'   — first group ([a-z])
console.log(catMatches[0][2])  // 'at'  — second group (at)

// named groups — (?<name>...) syntax, accessed via match.groups
// groups object has null prototype — intentional, avoids conflicts with built-in names
const date = '2024-01-15'
const dateMatches = [...date.matchAll(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/g)]
console.log(dateMatches[0].groups.year)   // '2024'
console.log(dateMatches[0].groups.month)  // '01'
console.log(dateMatches[0].groups.day)    // '15'