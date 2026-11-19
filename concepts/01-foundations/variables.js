// ─────────────────────────────────────────────
// var hoisting — declared but initialised as undefined before assignment
// ─────────────────────────────────────────────

function exampleVar() {
  console.log(x) // undefined — hoisted, not yet assigned
  var x = 10
}

console.log('var hoisting -----')
exampleVar()

// ─────────────────────────────────────────────
// TDZ — let/const hoisted but NOT initialised
// ─────────────────────────────────────────────

function exampleLet() {
  try {
    console.log(y) // ReferenceError: Cannot access 'y' before initialization
    let y = 10
  } catch (error) {
    console.error(error)
  }
}

console.log('TDZ -----')
exampleLet()

// ─────────────────────────────────────────────
// function scope (var) vs block scope (let)
// ─────────────────────────────────────────────

function exampleFunVsBlock() {
  if (true) {
    let a = 10  // block-scoped — only inside this if block
    var b = 20  // function-scoped — accessible anywhere in exampleFunVsBlock
  }
  try {
    console.log(a) // ReferenceError: a is not defined — out of scope
  } catch (error) {
    console.error(error)
  }
  try {
    console.log(b) // 20 — var leaks out of the block into the function
  } catch (error) {
    console.error(error)
  }
}

console.log('function scope vs block scope -----')
exampleFunVsBlock()



// ─────────────────────────────────────────────
// re-declaration rules — var allows it, let/const do not
// SyntaxErrors are parse-time — cannot be caught with try/catch
// ─────────────────────────────────────────────

function redeclareVar() {
  var a = 10
  var a = 20  // allowed — second declaration silently wins
  console.log(a) // 20
}

function redeclareLet() {
  // let a = 10
  // let a = 20  // SyntaxError: Identifier 'a' has already been declared
}

function uninitConst() {
  // const a  // SyntaxError: Missing initializer in const declaration
}

console.log('re-declaration rules -----')
redeclareVar()
redeclareLet()
uninitConst()
