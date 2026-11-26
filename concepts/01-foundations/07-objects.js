// ─────────────────────────────────────────────
// object literals — shorthand, computed keys
// ─────────────────────────────────────────────

const username = 'Joey'
const age = 26
const key = 'name'

console.log('object literals -----')
console.log({ username, age })                    // { username: 'Joey', age: 26 } — shorthand
console.log({ [key]: username, age })             // { name: 'Joey', age: 26 }    — computed key from variable
console.log({ [`key_${key}`]: 'Joey', age })      // { key_name: 'Joey', age: 26 } — computed key with expression

// ─────────────────────────────────────────────
// dot vs bracket notation
// dot: static key known at write time
// bracket: dynamic key, variable, or special chars
// ─────────────────────────────────────────────

const obj = { [key]: username, age }


console.log('dot vs bracket -----')
console.log(obj.name)      // 'Joey'      — dot works when key is known statically
console.log(obj.key)       // undefined   — dot looks for literal property 'key', not the variable's value
console.log(obj[key])      // 'Joey'      — bracket uses variable's value ('name')
// console.log(obj.26)     // SyntaxError — numeric keys require bracket notation


// ─────────────────────────────────────────────
// Object.keys, values, entries, fromEntries
// ─────────────────────────────────────────────

const user = { name: 'Joey', age: 26, is_active: true }

console.log('keys / values / entries -----')
console.log(Object.keys(user))    // ['name', 'age', 'is_active']
console.log(Object.values(user))  // ['Joey', 26, true]
console.log(Object.entries(user)) // [['name','Joey'], ['age',26], ['is_active',true]]

// fromEntries — array of [key, value] pairs → object
const entries = [['1', 1], ['2', 2], ['3', 3]]
const objFromEntries = Object.fromEntries(entries)
console.log(objFromEntries) // { '1': 1, '2': 2, '3': 3 }

// entries → map → fromEntries — transform object values
console.log(
  Object.fromEntries(
    Object.entries(objFromEntries).map(([key, value]) => [key, value * 2])
  )
) // { '1': 2, '2': 4, '3': 6 }

// ─────────────────────────────────────────────
// Object.assign, spread merge, freeze, seal
// ─────────────────────────────────────────────

console.log('assign / freeze / seal -----')

// Object.assign — copies properties into target, mutates target
let emptyObj = {}
Object.assign(emptyObj, { username, age })
console.log(emptyObj) // { username: 'Joey', age: 26 }

// spread merge — same result, cleaner syntax
emptyObj = { ...emptyObj, spread: true }
console.log(emptyObj) // { username: 'Joey', age: 26, spread: true }

// Object.freeze — no add, delete, or modify (silently fails in non-strict)
Object.freeze(emptyObj)
emptyObj.age = 27             // silently fails
emptyObj['new-key'] = true    // silently fails
delete emptyObj.username      // silently fails
console.log(emptyObj)         // { username: 'Joey', age: 26, spread: true } — unchanged

// Object.seal — no add or delete, but modify is allowed
let newEmptyObj = { ...emptyObj }  // shallow copy (not frozen)
Object.seal(newEmptyObj)
newEmptyObj.age = 27          // succeeds — modify existing property
newEmptyObj['new-key'] = true // silently fails — can't add
delete newEmptyObj.username   // silently fails — can't delete
console.log(newEmptyObj)      // { username: 'Joey', age: 27, spread: true }


// ─────────────────────────────────────────────
// property descriptors — defineProperty
// every property has: writable, enumerable, configurable flags
// defineProperty gives per-property control (freeze/seal apply to all properties at once)
// ─────────────────────────────────────────────

console.log('property descriptors -----')
const protectedObject = {
  username: 'Joey',
  gender: 'Male'
}
Object.defineProperty(protectedObject, 'user_id', {
  value: '3782-48329-4832-42834',
  writable: false,      // cannot be reassigned
  enumerable: false,    // hidden from Object.keys, for...in, spread, console.log
  configurable: false,  // cannot be deleted or reconfigured
})

protectedObject.user_id = '12345'      // silently fails — writable: false
delete protectedObject.user_id         // silently fails — configurable: false
console.log(protectedObject.user_id)   // '3782-48329-4832-42834' — still exists, direct access works
console.log(Object.keys(protectedObject)) // ['username', 'gender'] — user_id not enumerable
console.log(protectedObject)           // { username: 'Joey', gender: 'Male' } — user_id hidden

// ─────────────────────────────────────────────
// getters and setters
// get — computed property, called like a property read (no parentheses)
// set — triggered by assignment, used for validation or derived updates
// _prefix convention — internal property, use the getter/setter instead
// ─────────────────────────────────────────────

console.log('getters and setters -----')
const rectangle = {
  _width: 0,
  _height: 0,
  set dimensions(value) {
    [this._height, this._width] = value.split(' ').map(item => Number(item))
  },
  get area() { return this._height * this._width },
  get perimeter() { return 2 * (this._height + this._width) },
}

rectangle.dimensions = '4 5'
console.log(`${rectangle.area} sq. units`)   // 20 sq. units
console.log(`${rectangle.perimeter} units`)  // 18 units
console.log(`${rectangle.area} sq. units`) // 20 sq. units
console.log(`${rectangle.perimeter} units`) // 18 units


// ─────────────────────────────────────────────
// Object.create(null), hasOwnProperty vs hasOwn, delete
// ─────────────────────────────────────────────

console.log('create(null) / hasOwn / delete -----')

// Object.create(null) — no prototype, no inherited methods
const nullObj = Object.create(null)
nullObj.name = 'Joey'
console.log(nullObj.name, nullObj.toString)  // 'Joey', undefined — no toString
// nullObj.hasOwnProperty('name')  // TypeError — method doesn't exist on null-prototype object
console.log(Object.hasOwn(nullObj, 'name'))      // true  — static method, works on any object
console.log(Object.hasOwn(nullObj, 'toString'))  // false — not a property

// delete
// returns true: property deleted | key didn't exist
// returns false: property is non-configurable
const delObject = { a: 1, b: 2 }
Object.defineProperty(delObject, 'b', { configurable: false })
console.log(delete delObject.a, delObject)  // true,  { b: 2 }   — deleted
console.log(delete delObject.b, delObject)  // false, { b: 2 }   — non-configurable, stays
console.log(delete delObject.c, delObject)  // true,  { b: 2 }   — key didn't exist, no error
