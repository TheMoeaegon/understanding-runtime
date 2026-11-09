# Understanding Runtime

Personal notes on how a JavaScript runtime actually works, using Node.js as the case study.

This is a learning log, not a reference manual. I read a bit every day, keep the lines and ideas that made something click, rephrase them in my own words where I can, and add small experiments to check that I actually understood them.

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
| [`node-architecture`](node-architecture/index.md) | What Node.js is, the parts of the runtime, and the engine that executes JavaScript |

Each topic folder keeps its figures in a local `media/` directory and references them with descriptive names rather than `Pasted image ...` filenames.
