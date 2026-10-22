# js-mastery

A hands-on JavaScript mastery project — concepts, exercises, and tasks covering everything from foundations to advanced patterns.

## Purpose

Work through every significant JavaScript concept with real exercises. Not a tutorial — a structured, AI-guided learning path where tasks are assigned, your code is reviewed, and progress is tracked automatically.

## How to Use

> **If you're here to start your own learning journey**, clone the `starting-point` branch — it has the full roadmap with no solutions, so you start fresh:

```bash
git clone -b starting-point https://github.com/<username>/js-mastery.git
cd js-mastery
```

> **`main`** is a personal solutions branch. Don't copy from it — use it only as a reference after you've attempted a task yourself.

### AI-Guided Learning (Kiro)

This repo is designed to be used with [Kiro](https://kiro.dev) — an AI agent that reads the steering file and guides you through the curriculum interactively.

1. Install Kiro and open this folder as your workspace
2. `.kiro/steering/learning-path.md` automatically instructs the agent on how to teach, assign tasks, review your code, and track progress
3. Start a session and say **"get ready"** — the agent will read `PLAN.md`, find where you are, and begin

The agent will:
- Explain every concept before assigning tasks
- Review your code and give targeted feedback
- Never write the solution for you
- Update `NOTES.md` and `CHEATSHEET.md` as you complete topics
- Track progress in `PLAN.md`

> You can use any AI agent that supports custom instructions — point it at `.kiro/steering/learning-path.md` to load the curriculum behavior.

## Structure

```
js-mastery/
├── concepts/
│   ├── 01-foundations/   — variables, types, scoping, functions, objects, arrays
│   ├── 02-core/          — closures, this, prototypes, HOF, iterators, generators
│   ├── 03-async/         — callbacks, promises, async/await, event loop
│   ├── 04-advanced/      — proxy, symbols, modules, regex, WeakMap
│   ├── 05-patterns/      — module pattern, observer, factory, decorator
│   └── 06-performance/   — debounce, throttle, memoize, memory management
├── .kiro/steering/
│   └── learning-path.md  — AI agent curriculum instructions
├── PLAN.md               — full topic list + progress tracker
├── NOTES.md              — detailed concepts, mental models, Q&A (agent-maintained)
└── CHEATSHEET.md         — quick reference syntax and patterns (agent-maintained)
```

## Resources

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [javascript.info](https://javascript.info) — best free structured JS resource
- [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS)

## With AI vs Without AI

This repo works in both modes. Here's what you get with each:

### With AI (Kiro or any agent)

| What the agent does | Benefit |
|---------------------|---------|
| Explains every concept before assigning tasks | You understand the why, not just the syntax |
| Assigns tasks one level at a time | Prevents overwhelm, ensures progression |
| Reviews your code and gives targeted feedback | Catches gaps you wouldn't catch yourself |
| Asks output questions and gotcha drills for 🎯 topics | Interview-ready, not just "I read it" |
| Updates NOTES.md and CHEATSHEET.md automatically | Zero friction documentation |

**Best for:** active learning sessions where you want to be guided, challenged, and reviewed.

### Without AI (self-guided)

Every topic in `PLAN.md` includes:
- A full list of subtopics and edge cases to cover
- `_Resources:_` links pointing directly to the best material for that topic
- `_Interview:_` notes flagging what interviewers actually ask

You learn from the linked resources, write code in `concepts/`, fill `NOTES.md` and `CHEATSHEET.md` yourself, and use `PLAN.md` as a checklist to make sure you don't miss anything.

**Best for:** learners who prefer picking their own resources and pace, or those without an AI setup.

### Tradeoffs

| | With AI | Without AI |
|---|---------|------------|
| Concept explanations | Generated dynamically, adapts to your questions | You read external resources |
| Tasks | Assigned progressively, reviewed before moving on | Listed in PLAN.md — self-assigned and self-verified |
| Code review | Immediate, targeted feedback per attempt | None — you verify against expected output yourself |
| NOTES / CHEATSHEET | Agent fills them in | You fill them in |
| Pace | Controlled — can't skip | Self-directed — easy to skip |
| Interview prep | Agent drills output questions and polyfills | You need to seek out practice questions separately |

Both paths produce the same end result if followed honestly. The AI path just removes the friction of finding resources, structuring practice, and self-reviewing.

## Resources

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- [javascript.info](https://javascript.info) — best free structured JS resource
- [You Don't Know JS (book series)](https://github.com/getify/You-Dont-Know-JS)
