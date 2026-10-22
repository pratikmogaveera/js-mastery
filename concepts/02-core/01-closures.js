function makeAdder(base) {
  return function (num) {
    return base + num
  }
}

const add5 = makeAdder(5)
const add10 = makeAdder(10)

console.log(add5(3))   // 8
console.log(add5(7))   // 12
console.log(add10(3))  // 13


function makeCounter(start = 0) {
  return function () {
    return start += 1;
  }
}

const counter = makeCounter()
console.log(counter())  // 1
console.log(counter())  // 2
console.log(counter())  // 3

const counter2 = makeCounter()
console.log(counter2()) // 1