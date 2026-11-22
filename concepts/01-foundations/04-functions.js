// ─────────────────────────────────────────────
// function hoisting — declaration vs expression vs arrow
// declaration: fully hoisted (name + body)
// expression/arrow: variable hoisted, function is not
// ─────────────────────────────────────────────

scope() // works — function declaration is fully hoisted

function scope() {

  console.log('scope() -----')
  console.log('Executing declaration defined function.') // runs fine — called before declaration above

  // ─────────────────────────────────────────────
  // var + expression — TypeError (var hoists as undefined, calling undefined() throws)
  // ─────────────────────────────────────────────

  try {
    sayHi() // TypeError: sayHi is not a function — var hoisted as undefined
  } catch (error) { console.error(error) }
  var sayHi = function () { console.log('Executing expression defined function.') }

  // ─────────────────────────────────────────────
  // let + expression — ReferenceError (TDZ)
  // ─────────────────────────────────────────────

  try {
    greet() // ReferenceError: Cannot access 'greet' before initialization
  } catch (error) { console.error(error) }
  let greet = function () { console.log('Executing let expression function.') }

  // ─────────────────────────────────────────────
  // const + arrow — ReferenceError (TDZ)
  // ─────────────────────────────────────────────

  try {
    congratulate() // ReferenceError: Cannot access 'congratulate' before initialization
  } catch (error) { console.error(error) }
  const congratulate = () => { console.log('Executing const arrow function.') }

}


// ─────────────────────────────────────────────
// default parameters — only triggered by undefined, not other falsy values
// ─────────────────────────────────────────────

function defaultGreet(name = 'Stranger') {
  console.log(`Hello ${name}`)
}

console.log('default parameters -----')
defaultGreet('')        // 'Hello '        — '' is not undefined, default doesn't trigger
defaultGreet('Joey')    // 'Hello Joey'
defaultGreet(null)      // 'Hello null'    ��� null is not undefined, default doesn't trigger
defaultGreet(undefined) // 'Hello Stranger' — undefined triggers the default
defaultGreet()          // 'Hello Stranger' — no arg = undefined

// ─────────────────────────────────────────────
// rest parameters — collects remaining args into a real array
// ─────────────────────────────────────────────

function sums(...nums) {
  console.log(nums.reduce((prev, curr) => prev + curr, 0))
}

console.log('rest parameters -----')
sums(1, 2, 3) // 6

// ─────────────────────────────────────────────
// arguments object — regular functions only
// arrow functions inherit arguments from enclosing scope, not their own call
// ─────────────────────────────────────────────

function oldArguments() {
  console.log(arguments)
}

function outer(a, b) {
  const arrow = () => console.log(arguments)      // inherits outer's arguments
  const arrowWithRest = (...args) => console.log(args) // own args via rest — real array
  arrow(99, 100)        // [Arguments] { '0': 1, '1': 2 } — outer's args, not 99/100
  arrowWithRest(99, 100) // [99, 100] — rest params capture the actual call args
}

console.log('arguments object -----')
oldArguments('A', 1, true, undefined, null) // [Arguments] { '0': 'A', '1': 1, ... }

console.log('arrow arguments vs rest -----')
outer(1, 2)