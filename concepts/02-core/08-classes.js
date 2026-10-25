// ─────────────────────────────────────────────
// L1 — class syntax rewrite (Animal/Dog with super)
// ─────────────────────────────────────────────

class Animal {
  #sound

  constructor(name, sound) {
    this.name = name
    this.#sound = sound
  }

  speak() {
    console.log(`${this.name} makes a ${this.#sound} sound.`)
  }

  static create(name) {
    return new Animal(name)
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
  }

  speak() {
    super.speak()  // calls Animal's speak with this = Dog instance
  }

  bark() {
    console.log(`${this.name} barks.`)
  }
}

const a1 = new Animal('Tom', 'purr')
const d1 = new Dog('Rex')

console.log('L1 -----')
a1.speak()   // Tom makes a purr sound.
d1.speak()   // Rex makes a undefined sound. — no sound passed to Dog
d1.bark()    // Rex barks.


// ─────────────────────────────────────────────
// L2 — static method (factory without new)
// ─────────────────────────────────────────────

const a2 = Animal.create('Jerry')

console.log('L2 -----')
a2.speak()   // Jerry makes a undefined sound.


// ─────────────────────────────────────────────
// L3 — private fields
// ─────────────────────────────────────────────

const a3 = new Animal('Max', 'roar')

console.log('L3 -----')
a3.speak()              // Max makes a roar sound.
console.log(a3.name)    // Max   — public, accessible
console.log(a3.sound)   // undefined — no public 'sound' property, #sound is private
// console.log(a3.#sound)  // SyntaxError: Property '#sound' is not accessible outside class 'Animal'
