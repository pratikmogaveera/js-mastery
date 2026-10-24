// ─────────────────────────────────────────────
// L1 — scope chain (nested 3 levels deep)
// ─────────────────────────────────────────────

function nested() {
  const value = 1
  function depth1() {
    const value = 2
    function depth2() {
      const value = 3
      function depth3() {
        console.log(value)  // 3 — found in depth2 (nearest outer scope)
      }
      depth3()
    }
    depth2()
  }
  depth1()
}

console.log('L1 -----')
nested()  // 3


// ─────────────────────────────────────────────
// L2 — var in loops (classic gotcha)
// ─────────────────────────────────────────────

console.log('var loop -----')
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 3, 3, 3 — var is function-scoped, all callbacks share the same i
}

console.log('let loop -----')
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)  // 0, 1, 2 — let is block-scoped, each iteration gets its own i
}


// ─────────────────────────────────────────────
// L3 — IIFE fix for var loop (pre-let solution)
// ─────────────────────────────────────────────

// IIFE creates a new function scope per iteration
// i is passed as j — j is a new variable local to each IIFE call
// each callback closes over its own j, not the shared i

console.log('L3 -----')
for (var i = 0; i < 3; i++) {
  (function isolatedScope(j) {
    setTimeout(() => console.log(j), 0)  // 0, 1, 2 — j is isolated per iteration
  })(i)
}
