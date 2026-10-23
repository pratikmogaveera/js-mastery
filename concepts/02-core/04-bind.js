// ─────────────────────────────────────────────
// L1 — fix lost this in callback
// ─────────────────────────────────────────────

const user = {
  name: 'Joe',
  greet: function () { console.log(`Hi, I'm ${this.name}`) }
}

console.log('L1 -----')
setTimeout(user.greet, 100)             // Hi, I'm undefined — lost this
setTimeout(user.greet.bind(user), 100)  // Hi, I'm Joe — this locked to user


// ─────────────────────────────────────────────
// L2 — partial application
// ─────────────────────────────────────────────

function multiply(a, b) { return a * b }

const double = multiply.bind(null, 2)  // a pre-filled as 2
const triple = multiply.bind(null, 3)  // a pre-filled as 3

console.log('L2 -----')
console.log(double(5))  // 10
console.log(triple(5))  // 15


// ─────────────────────────────────────────────
// L3 — bindAll (permanently bind methods to object)
// ─────────────────────────────────────────────

function bindAll(obj, methods) {
  for (const method of methods) {
    obj[method] = obj[method].bind(obj)
  }
}

const timer = {
  count: 0,
  increment: function () { this.count++ },
  decrement: function () { this.count-- },
  value: function () { console.log(this.count) }
}

bindAll(timer, ['increment', 'decrement', 'value'])

const { increment, decrement, value } = timer  // destructured — normally loses this

console.log('L3 -----')
increment()
increment()
increment()
decrement()
value()  // 2
