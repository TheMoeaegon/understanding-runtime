## What is Node.js?

Node.js is a JavaScript runtime for building server-side programs, CLI tools, build tools, and automation scripts. It runs JavaScript through V8, exposes system APIs through Node core, and uses libuv for the event loop, timers, operating-system I/O, and the worker pool behind file-system, dns.lookup(), crypto, and zlib work.

In short, V8 handles JavaScript execution. libuv tracks asynchronous work and reports that it's ready. C++ bindings connect JavaScript API calls to native code, like accessing file system, as Javascript doesn't have any way to read/write files. Node's standard library then gives you modules such as `node:fs`, `node:net`, `node:http`, `node:crypto`, and `node:timers` as ordinary JavaScript entry points into all that machinery.

The main thread still runs JavaScript through the call stack, one frame at a time. Only one JavaScript callback runs on that thread at any moment. The waiting itself happens off the stack. A socket can wait in the operating system. File-system work can run through libuv's worker pool. Timers can sit in libuv until their deadline passes. When waiting work becomes ready, the event loop brings its callback back into JavaScript and queues it to run.

## The Four Parts of Runtime

The runtime has four parts:

- **V8** parses, compiles, optimizes, executes JavaScript, and manages the JavaScript heap.
- **libuv** runs the event loop, tracks handles and requests, provides cross-platform I/O primitives, and owns the worker pool used by several blocking native operations.
- **Node core APIs** expose JavaScript modules such as `node:fs`, `node:http`, `node:net`, `node:crypto`, `node:stream`, and `node:process`.
- **Userland packages** add modules on top of the runtime through npm-compatible package managers.

So, JavaScript runs on one main thread and all native work moves to the runtime. When the native side has a result, Node schedules the matching JavaScript callback or promise reaction.

![[Node-Runtime-Boundary.png]]

*Figure 1.1 - Node core is the JavaScript-facing surface of the runtime. V8 owns execution, while native bindings and libuv connect selected host work to the operating system.*

## Runtime Architecture

### The Blocking I/O problem

Around 2009, many mainstream web stacks still handled a request roughly like this:

- A user's request comes in.
- The server (like apache) dedicates a thread (or a whole process) to handle that request.
- Your application code runs on that thread.
- If your code needs to do something slow - like query a database, read a file from disk, or call another API - that thread blocks while it waits.
- Once the slow thing is done, the thread wakes up, finishes generating the response, sends it back, and is finally free to handle another request.

The model is easy to reason about, and for many applications it was perfectly workable. Its cost appears when a large number of requests are not using the CPU but still occupy execution slots.

In thread-per-request design, each slow request holds a thread or process until its I/O completes. High concurrency therefore means high memory use and scheduler pressure. This was the C10k problem: handling ten thousand concurrent connections on a single server without drowning in per-connection overhead.

![[Blocking-Work-Vs-Non-Blocking-Wait.png]]

*Figure 1.2 - Blocking work holds the JavaScript stack. Non-blocking waits move state into the runtime or operating system and return to JavaScript only when a continuation is ready.*

#### Ryan Dahl and Non-Blocking I/O

Ryan Dahl argued that this model wasted resources. The slowest parts of many web applications were I/O operations - waiting for the network, waiting for the disk, or waiting for another service. The CPU itself was often idle while the request thread was blocked.

High-performance servers such as Nginx approached the same problem with an **event-driven, non-blocking architecture**. Instead of dedicating one worker to one request while that request waits, the server registers interest in sockets and other operations, returns to the loop, and runs the completion handler only when the OS or worker pool reports progress. Node applied the same idea to server-side JavaScript.

> The dominant pattern is to keep the main thread available while slow work proceeds elsewhere.

### V8, libuv and Core Bindings