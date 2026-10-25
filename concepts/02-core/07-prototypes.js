// ─────────────────────────────────────────────
// L1 — prototype methods (shared across instances)
// ─────────────────────────────────────────────

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const p1 = new Person('Joe', 20)
const p2 = new Person('Jill', 18)

console.log('L1 -----')
p1.greet()  // Hello, my name is Joe and I'm 20 years old.
p2.greet()  // Hello, my name is Jill and I'm 18 years old.

console.log(p1.hasOwnProperty('name'))   // true  — name lives on p1 itself
console.log(p1.hasOwnProperty('greet'))  // false — greet lives on Person.prototype


// ─────────────────────────────────────────────
// L2 — walk the prototype chain
// ─────────────────────────────────────────────

console.log('L2 -----')
let proto = Object.getPrototypeOf(p1)
while (proto !== null) {
  console.log(proto)                      // Person.prototype → Object.prototype
  proto = Object.getPrototypeOf(proto)
}


// ─────────────────────────────────────────────
// L3 — prototypal inheritance (Dog extends Animal)
// ─────────────────────────────────────────────

function Animal(name) {
  this.name = name
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`)
}

function Dog(name) {
  Animal.call(this, name)  // borrow Animal's constructor
}

Dog.prototype = Object.create(Animal.prototype)  // link Dog → Animal chain

Dog.prototype.bark = function () {
  console.log(`${this.name} barks.`)
}

const d1 = new Dog('Rex')

console.log('L3 -----')
d1.speak()  // Rex makes a sound. — inherited from Animal.prototype
d1.bark()   // Rex barks.        — Dog's own method
