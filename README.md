# Understanding Runtime

Personal notes on how a JavaScript runtime actually works, using Node.js as the case study.

This is a learning log, not a reference manual. I read a bit every day, keep the lines and ideas that made something click, rephrase them in my own words where I can, and add small experiments to check that I actually understood them.

## What I Am Trying to Achieve

- Build a real mental model of what a runtime is: the JavaScript engine, the event loop, native bindings, the OS underneath, and where each one ends and the next begins.
- Be able to answer "what happens when I run `node app.js`?" without hand-waving.
- Understand the failure modes that only show up in production: a blocked event loop, memory leaks, slow requests, file descriptor limits, weird DNS behavior, broken backpressure.
- Keep the notes small enough that I can revisit them, instead of writing a second book I never reread.
- Pair reading with runnable code so the concepts stay testable, not just familiar.

## Why This Repo Exists

For a long time my knowledge stopped at the framework layer. I knew how to write routes, middleware, promises, and the occasional stream, but not what the runtime was doing underneath them or why an app would suddenly stall under load.

Frameworks change. The runtime is the part that keeps showing up in bugs, so it is the part worth understanding properly. Writing these notes down forces me to explain things clearly, and keeping them in git means I can see how my understanding changes over time.

## Credit: NodeBook

Almost everything here starts from [**NodeBook**](https://www.thenodebook.com) by [ishtms](https://github.com/ishtms), and this repo would not exist without it. It is the book I wish I had when I started with Node.

- Read it: [thenodebook.com](https://www.thenodebook.com)
- Source: [github.com/ishtms/nodebook](https://github.com/ishtms/nodebook)

From NodeBook's own introduction:

> Run Node in prod long enough and the internals stop feeling optional. The event loop, libuv, buffers, syscalls, TCP, thread pools, GC, module resolution, process signals, they all show up in bugs.

**A note on copying:** some notes and figures here are copied or lightly adapted from NodeBook chapters, because copying the exact sentence is often the fastest way to keep the original explanation intact. All credit for the original explanations, structure, and diagrams belongs to the NodeBook author. My own additions are the summaries, comparisons, and code experiments. If you want the complete, corrected, and properly edited version, read NodeBook itself.

## Repository Layout

| Path | What it covers |
| --- | --- |
| [`nodejs-architecture/`](nodejs-architecture/) | What Node.js is, the parts of the runtime (V8, libuv, Node core, userland), the blocking I/O problem, and the non-blocking architecture Node was built around |

Each topic folder keeps its figures in a local `media/` directory and references them with descriptive names rather than `Pasted image ...` filenames.

## Notes

- [What is Node.js?](nodejs-architecture/what-nodejs-is.md) — the four parts of the runtime, the C10k problem, and Ryan Dahl's non-blocking I/O argument.

Code experiments live next to the notes (for example [`nodejs-architecture/index.js`](nodejs-architecture/index.js)) and can be run directly:

```bash
node nodejs-architecture/index.js
```

## Progress

- [x] **Week 1, Day 1** — What Node.js is, the four parts of the runtime, the blocking I/O problem, and non-blocking I/O.
- [ ] V8, libuv, and core bindings — next up.

Commit messages follow a loose day-by-day log, for example: `week-1 day1: what Node.js is; runtime parts, blocking I/O and non-blocking architecture`.
