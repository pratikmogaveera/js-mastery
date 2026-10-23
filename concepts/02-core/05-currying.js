// ─────────────────────────────────────────────
// L1 — curry() implementation
// ─────────────────────────────────────────────

function join(a, b, c) { return `${a}_${b}_${c}` }

function curry(fn) {
  return function check(...args) {
    if (args.length >= fn.length) return fn(...args)
    else return check.bind(null, ...args)
  }
}

const curriedJoin = curry(join)

console.log('L1 -----')
console.log(curriedJoin(1, 2, 3))  // 1_2_3
console.log(curriedJoin(1)(2, 3))  // 1_2_3
console.log(curriedJoin(1, 2)(3))  // 1_2_3
console.log(curriedJoin(1)(2)(3))  // 1_2_3


// ─────────────────────────────────────────────
// L2 — specialised functions via partial application
// ─────────────────────────────────────────────

const add = curry((a, b, c) => a + b + c)

const add10 = add(10)
const add10and5 = add(10)(5)

console.log('L2 -----')
console.log(add10(5, 3))    // 18
console.log(add10(1, 2))    // 13
console.log(add10and5(2))   // 17


// ─────────────────────────────────────────────
// L3 — pipe (chain functions left to right)
// ─────────────────────────────────────────────

function pipe(...funcs) {
  return function execute(val) {
    for (const func of funcs)
      val = func(val)
    return val
  }
}

const transform = pipe(
  x => x * 2,
  x => x + 1,
  x => x * x
)

console.log('L3 -----')
console.log(transform(3))  // 3→6→7→49
console.log(transform(2))  // 2→4→5→25
