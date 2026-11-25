// ─────────────────────────────────────────────
// Array.prototype.myMap
// ─────────────────────────────────────────────

function myMap(callback) {
  const result = []
  for (let i = 0; i < this.length; i++)
    result.push(callback(this[i], i, this))
  return result
}

// ─────────────────────────────────────────────
// Array.prototype.myFilter
// ─────────────────────────────────────────────

function myFilter(callback) {
  const result = []
  for (let i = 0; i < this.length; i++)
    if (callback(this[i], i, this))
      result.push(this[i])
  return result
}

// ─────────────────────────────────────────────
// Array.prototype.myReduce
// initialValue may be null/undefined — use arguments.length to detect presence
// no initial value: acc = this[0], loop from index 1
// initial value provided: acc = initialValue, loop from index 0
// ─────────────────────────────────────────────

function myReduce(callback, initialValue) {
  const hasInitial = arguments.length > 1
  let acc = hasInitial ? initialValue : this[0]
  for (let i = hasInitial ? 0 : 1; i < this.length; i++)
    acc = callback(acc, this[i], i, this)
  return acc
}

// ─────────────────────────────────────────────
// register on Array.prototype
// ─────────────────────────────────────────────

Array.prototype.myMap = myMap
Array.prototype.myFilter = myFilter
Array.prototype.myReduce = myReduce

// ─────────────────────────────────────────────
// verify — native vs polyfill side by side
// ─────────────────────────────────────────────

const arr = [0, 1, 2, 3, 4, 5]

console.log('map -----')
console.log(arr.map(x => x * 2))    // [0,2,4,6,8,10]
console.log(arr.myMap(x => x * 2))  // [0,2,4,6,8,10]

console.log('filter -----')
console.log(arr.filter(x => x % 2 === 0))    // [0,2,4]
console.log(arr.myFilter(x => x % 2 === 0))  // [0,2,4]

console.log('reduce — with initial value -----')
console.log(arr.reduce((acc, curr) => acc + curr, 0))    // 15
console.log(arr.myReduce((acc, curr) => acc + curr, 0))  // 15

console.log('reduce — no initial value -----')
console.log(arr.reduce((acc, curr) => acc + curr))    // 15
console.log(arr.myReduce((acc, curr) => acc + curr))  // 15
