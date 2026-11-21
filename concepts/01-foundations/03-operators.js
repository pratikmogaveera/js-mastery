// ─────────────────────────────────────────────
// || — returns first truthy value, or last value if all falsy
// ─────────────────────────────────────────────

console.log('|| operator -----')
console.log(true || 'Truthy')      // true      — first operand is truthy, returns it
console.log(false || 'Truthy')     // 'Truthy'  — false is falsy, moves to next
console.log('' || 'Truthy')        // 'Truthy'  — '' is falsy, moves to next
console.log(0 || 'Truthy')         // 'Truthy'  — 0 is falsy, moves to next
console.log(null || 'Truthy')      // 'Truthy'  — null is falsy, moves to next
console.log(undefined || 'Truthy') // 'Truthy'  — undefined is falsy, returns last

// ─────────────────────────────────────────────
// && — returns first falsy value, or last value if all truthy
// ─────────────────────────────────────────────

console.log('&& operator -----')
console.log(true && 'Truthy')      // 'Truthy'  — all truthy, returns last
console.log(false && 'Truthy')     // false     — first falsy, stops
console.log('' && 'Truthy')        // ''        — first falsy, stops
console.log(0 && 'Truthy')         // 0         — first falsy, stops
console.log(null && 'Truthy')      // null      — first falsy, stops
console.log(undefined && 'Truthy') // undefined — first falsy, stops

// ─────────────────────────────────────────────
// ?? vs || — nullish coalescing is safer for falsy-but-valid values
// || treats 0 and '' as empty; ?? does not
// ─────────────────────────────────────────────

console.log('?? vs || -----')
const age = 0
const name = ''

console.log(age || 18)   // 18 — || treats 0 as empty, replaces with fallback (bug)
console.log(age ?? 18)   // 0  — ?? keeps 0, it's not null/undefined

console.log(name || 'Anonymous')  // 'Anonymous' — || treats '' as empty (bug)
console.log(name ?? 'Anonymous')  // ''          — ?? keeps '', it's not null/undefined

console.log(null ?? 'fallback')      // 'fallback' — ?? triggers for null
console.log(undefined ?? 'fallback') // 'fallback' — ?? triggers for undefined



// ─────────────────────────────────────────────
// logical assignment — &&=, ||=, ??=
// only assigns if the logical condition passes
// ─────────────────────────────────────────────

console.log('logical assignment -----')
const apiResponse = {
  name: 'Joe John',
  email: 'joe@john.com',
  is_active: true,
  team: undefined,
  country: 'India',
  status: null,
}

// &&= — only assigns if current value is truthy (email exists → mask it)
apiResponse.email &&= apiResponse.email[0] + '***@' + apiResponse.email.split('@')[1]

// ||= — assigns if current value is falsy (team is undefined → set default)
apiResponse.team ||= 'None'

// ??= — assigns only if current value is null/undefined (status is null → set default)
apiResponse.status ??= 'Unpaid'

console.log(apiResponse)
// { name: 'Joe John', email: 'j***@john.com', is_active: true, team: 'None', country: 'India', status: 'Unpaid' }


// ─────────────────────────────────────────────
// optional chaining — ?. / ?.[ / ?.()
// returns undefined instead of TypeError when chain hits null/undefined
// ─────────────────────────────────────────────

console.log('optional chaining -----')
const user = {
  name: 'Joey',
  address: { city: 'Mumbai' },
  greet: null
}

console.log(user?.name)               // 'Joey'    — ?. property access
console.log(user.address?.['city'])   // 'Mumbai'  — ?.[ computed property access
console.log(user.address?.['pincode']) // undefined — key doesn't exist, no crash
console.log(user.greet?.())           // undefined — greet is null, ?.( prevents TypeError

// without ?. — crashes when intermediate value is undefined
try {
  console.log(user.phone.number) // TypeError: Cannot read properties of undefined
} catch (error) {
  console.error(error)
}

// with ?. — safely short-circuits to undefined
console.log(user?.phone?.number) // undefined — phone doesn't exist, chain stops safely


