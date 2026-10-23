// ─────────────────────────────────────────────
// v1 — regular function method (lost `this` when detached)
// ─────────────────────────────────────────────

const counter_v1 = {
  count: 1,
  increment: function () {
    console.log(this.count)
  },
}

console.log('v1 -----')
counter_v1.increment()          // 1 — implicit binding, this = counter_v1

const incr_v1 = counter_v1.increment
incr_v1()                       // undefined — default binding, this = global


// ─────────────────────────────────────────────
// v2 — arrow function inside method (fixes nested `this`, not detached)
// ─────────────────────────────────────────────

const counter_v2 = {
  count: 1,
  increment: function () {
    const inner = () => console.log(this.count)
    inner()
  },
}

console.log('v2 -----')
counter_v2.increment()          // 1 — inner arrow inherits this from increment

const incr_v2 = counter_v2.increment
incr_v2()                       // undefined — increment itself still loses this when detached


// ─────────────────────────────────────────────
// v3 — bind (fix for detached method — revisit after learning bind)
// ─────────────────────────────────────────────

const counter_v3 = {
  count: 1,
  increment: function () {
    console.log(this.count)
  }
}
const incr_v3 = counter_v3.increment.bind(counter_v3)
incr_v3()  // 1 — this permanently locked to counter_v3
