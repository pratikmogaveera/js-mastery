// ─────────────────────────────────────────────
// for vs for...of vs for...in
// for...in iterates keys — never use on arrays (string keys + inherited props)
// ─────────────────────────────────────────────

const arr = [1, 2, 3]

console.log('for loops -----')
for (let i = 0; i < arr.length; i++)
  console.log(arr[i])  // 1, 2, 3 — value via index

for (const val of arr)
  console.log(val)     // 1, 2, 3 — value directly

for (const key in arr)
  console.log(key)     // '0', '1', '2' — string keys, not values

// ─────────────────────────────────────────────
// while vs do...while
// do...while always executes at least once
// ─────────────────────────────────────────────

const condition = false

console.log('while / do...while -----')
do {
  console.log('do...while executed')  // runs — condition checked after
} while (condition)

while (condition) {
  console.log('while executed')       // never runs — condition false from start
}

// ─────────────────────────────────────────────
// switch — fall-through vs break
// ─────────────────────────────────────────────

console.log('switch fall-through -----')
switch (2) {
  case 1: console.log('Step 1')
  case 2: console.log('Step 2')   // matches here
  case 3: console.log('Step 3')   // falls through
  default: console.log('Default') // falls through
}
// Step 2, Step 3, Default

console.log('switch with break -----')
switch (2) {
  case 1: { console.log('Step 1'); break }
  case 2: { console.log('Step 2'); break }  // matches, then stops
  case 3: { console.log('Step 3'); break }
  default: console.log('Default')
}
// Step 2 only

// ─────────────────────────────────────────────
// labelled break — exits the outer loop entirely
// use case: searching a 2D structure — stop once found
// ─────────────────────────────────────────────

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]

console.log('labelled break -----')
outerLoop: for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 5) {
      console.log(`Found 5 at row ${i}, col ${j}`)  // row 1, col 1
      break outerLoop  // stops both loops — without label, outer would continue to row 2
    }
  }
}
