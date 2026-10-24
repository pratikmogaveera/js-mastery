// ─────────────────────────────────────────────
// Task 1 — call (method borrowing)
// ─────────────────────────────────────────────
const user = {
  name: "Joe",
  role: "user",
  describe: function () {
    console.log(`My name is ${this.name} and my role is ${this.role}.`)
  },
  greet: function (greeting, punctuation) {
    console.log(`${greeting}, my name is ${this.name}${punctuation}`)
  }
}

const admin = {
  name: "Admin",
  role: "admin"
}

console.log('call -----')
user.describe()               // My name is Joe and my role is user.
user.describe.call(admin)     // My name is Admin and my role is admin.


// ─────────────────────────────────────────────
// Task 2 — apply (args from array)
// ─────────────────────────────────────────────
const args = ['Hey', '!']

console.log('apply -----')
user.greet.apply(admin, args) // Hey, my name is Admin!


// ─────────────────────────────────────────────
// L2 — toArray (borrow Array.prototype.slice via call)
// ─────────────────────────────────────────────
function toArray(args) {
  return Array.prototype.slice.call(args);
}
const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 }
const arrayLike2 = { 0: 'a', 1: 'b', length: 2 }
console.log('toArray -----')
console.log(toArray(arrayLike))    // [1, 2, 3]
console.log(toArray(arrayLike2))   // ['a', 'b']


// ─────────────────────────────────────────────
// L3 — createLogger (apply with dynamic args)
// ─────────────────────────────────────────────
function createLogger(prefix) {
  return {
    log: function (...args) {
      console.log.apply(null, [prefix, ...args])
    }
  }
}

const info = createLogger('[INFO]')
const error = createLogger('[ERROR]')

info.log('Server started', 'port 3000')  // [INFO] Server started port 3000
info.log('Connected')                    // [INFO] Connected
error.log('Something broke')             // [ERROR] Something broke


// ─────────────────────────────────────────────
// Extra Practice
// ─────────────────────────────────────────────
function runForAll(fn, contexts) {
  for (const item of contexts) {
    fn.call(item)
  }
}

const describe = function () {
  console.log(`${this.name} is a ${this.role}`)
}

runForAll(describe, [
  { name: 'Joe', role: 'user' },
  { name: 'Admin', role: 'admin' },
  { name: 'Guest', role: 'guest' },
])
// Joe is a user
// Admin is a admin
// Guest is a guest


function applyAll(fn, argArrays) {
  const result = []
  for (const arg of argArrays) {
    result.push(fn.apply(null, arg))
  }

  return result;
}

console.log(applyAll(Math.max, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]))  // [3, 6, 9]
console.log(applyAll(Math.min, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]))  // [1, 4, 7]


function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

console.log(getType([1, 2, 3]))   // 'Array'
console.log(getType(null))        // 'Null'
console.log(getType({}))          // 'Object'
console.log(getType(42))          // 'Number'