// ─────────────────────────────────────────────
// deepClone — recursively clone an object (no shared references)
// handles: primitives, null, arrays, nested objects
// limitation: does not handle Date, RegExp, Map, Set, circular refs
// ─────────────────────────────────────────────

function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj  // null + primitives
  if (Array.isArray(obj)) return obj.map(item => deepClone(item))  // arrays

  const result = {}
  Object.entries(obj).forEach(([k, v]) => result[k] = deepClone(v))
  return result
}

// ─────────────────────────────────────────────
// verify — mutate clone, original must be unaffected
// ─────────────────────────────────────────────

const original = {
  name: 'Joey',
  address: {
    city: 'Mumbai',
    pincode: { code: 400001 }
  },
  scores: [10, 20, 30]
}

const clone = deepClone(original)
delete clone.name           // primitive — only removes from clone
clone.address.city = 'Pune' // nested object — independent
clone.scores.push(99)       // nested array — independent

console.log('deepClone -----')
console.log(clone)    // { address: { city: 'Pune', ... }, scores: [10,20,30,99] }
console.log(original) // { name: 'Joey', address: { city: 'Mumbai', ... }, scores: [10,20,30] }

// ─────────────────────────────────────────────
// deepEqual — recursively compare two values for structural equality
// === fails for objects — compares references, not structure
// ─────────────────────────────────────────────

function deepEqual(x, y) {
  if (typeof x !== typeof y) return false  // different types — never equal

  if (x === null || y === null) return x === y  // null before object branch (typeof null === 'object')

  // array check — before object check since arrays are objects too
  if (Array.isArray(x) || Array.isArray(y)) {
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) return false
      for (let i = 0; i < x.length; i++)
        if (!deepEqual(x[i], y[i])) return false
      return true
    }
    return false  // one is array, other isn't
  }

  if (typeof x === 'object' || typeof y === 'object') {
    if (typeof x === typeof y) {
      if (Object.keys(x).length !== Object.keys(y).length) return false
      for (const key of Object.keys(x))
        if (!deepEqual(x[key], y[key])) return false
      return true
    }
    return false  // one is object, other isn't
  }

  return x === y  // both primitives
}

// ─────────────────────────────────────────────
// verify — all levels
// ─────────────────────────────────────────────

console.log('deepEqual -----')
console.log('L1 primitives:')
console.log(deepEqual(1, 1))        // true
console.log(deepEqual(1, 2))        // false
console.log(deepEqual('a', 'a'))    // true
console.log(deepEqual(null, null))  // true
console.log(deepEqual(null, {}))    // false

console.log('L2 flat objects:')
console.log(deepEqual({ a: 1 }, { a: 1 }))        // true
console.log(deepEqual({ a: 1 }, { a: 2 }))        // false
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }))  // false

console.log('L3 flat arrays:')
console.log(deepEqual([1, 2, 3], [1, 2, 3]))  // true
console.log(deepEqual([1, 2], [1, 2, 3]))      // false

console.log('L4 nested objects:')
console.log(deepEqual({ a: { b: 1 } }, { a: { b: 1 } }))  // true
console.log(deepEqual({ a: { b: 1 } }, { a: { b: 2 } }))  // false

console.log('L5 mixed nested:')
console.log(deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 2], b: { c: 3 } }))  // true
console.log(deepEqual({ a: [1, 2], b: { c: 3 } }, { a: [1, 3], b: { c: 3 } }))  // false


// ─────────────────────────────────────────────
// flattenObject — flatten nested object into dot-notation keys
// { a: { b: { c: 1 }, d: 2 }, e: 3 } → { 'a.b.c': 1, 'a.d': 2, e: 3 }
// ─────────────────────────────────────────────

function flattenObject(value, prefix) {
  const result = {}
  if (typeof value !== 'object' || value === null) return value
  Object.keys(value).forEach((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const res = flattenObject(value[key], fullKey)
    if (typeof res === 'object' && res !== null)
      Object.assign(result, res)   // merge — don't nest the sub-result
    else
      result[fullKey] = res        // primitive — write directly
  })
  return result
}

console.log('flattenObject -----')
const nested = {
  a: { b: { c: 1 }, d: 2 },
  e: 3,
  f: { g: 4 },
  h: null  // null — returns as-is, res !== null guard prevents Object.assign(result, null)
}

console.log(flattenObject(nested, '')) // { 'a.b.c': 1, 'a.d': 2, e: 3, 'f.g': 4, h: null }