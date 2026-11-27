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
