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