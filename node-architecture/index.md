# Node Architecture

Notes on what happens underneath Node.js: the engine that executes JavaScript, the event loop that schedules it, and the native pieces that connect both to the operating system.

## Topics

| Topic | What it covers |
| --- | --- |
| [What is Node.js?](what-is-nodejs.md) | The four parts of the runtime, the blocking I/O problem, libuv, native bindings, and why Node is single-threaded from JavaScript's point of view |
| [V8: The JavaScript Engine](v8-in-nodejs.md) | Parsing, Ignition bytecode, the JIT tiers, the call stack, the heap and garbage collection, isolates, and optimization |

## Reading Order

Start with [What is Node.js?](what-is-nodejs.md) for the overall shape of the runtime. Read [V8: The JavaScript Engine](v8-in-nodejs.md) next if you want to understand what happens after Node hands JavaScript source to the engine.

Scratch experiments from these notes live in [`examples/runtime-experiments.js`](examples/runtime-experiments.js).

More runtime topics can be added here as the notes grow.
