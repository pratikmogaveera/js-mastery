// ─────────────────────────────────────────────
// makeAdder
// ─────────────────────────────────────────────
function makeAdder(base) {
  return function (num) {
    return base + num
  }
}

const add5 = makeAdder(5)
const add10 = makeAdder(10)

console.log('makeAdder -----')
console.log(add5(3))    // 8
console.log(add5(7))    // 12
console.log(add10(3))   // 13


// ─────────────────────────────────────────────
// makeCounter
// ─────────────────────────────────────────────

function makeCounter(start = 0) {
  return function () {
    return start += 1
  }
}

const counter = makeCounter()
const counter2 = makeCounter()

console.log('makeCounter -----')
console.log(counter())   // 1
console.log(counter())   // 2
console.log(counter())   // 3
console.log(counter2())  // 1 — independent


// ─────────────────────────────────────────────
// once
// ─────────────────────────────────────────────

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

const random = once(() => Math.random())
const init = once(() => console.log('initialised'))

console.log('once -----')
console.log(random())  // some number
console.log(random())  // same number
console.log(random())  // same number

init()   // logs 'initialised'
init()   // nothing
init()   // nothing


// ─────────────────────────────────────────────
// memoize
// ─────────────────────────────────────────────
function memoize(fn) {
  const cache = {}
  return function (num) {
    if (num in cache) return cache[num]
    else {
      const result = fn(num)
      cache[num] = result;
      return result;
    }
  }
}

function slowDouble(n) {
  console.log('computing...')
  return n * 2
}

const fastDouble = memoize(slowDouble)

console.log(fastDouble(5))  // logs 'computing...' → 10
console.log(fastDouble(5))  // no log → 10  (cached)
console.log(fastDouble(3))  // logs 'computing...' → 6
console.log(fastDouble(3))  // no log → 6  (cached)
