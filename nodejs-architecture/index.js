// Scratch experiments for the notes in `what-nodejs-is.md`.
// Every block is commented out so the file can hold several examples at once.

/*
// Inspecting the fs module surface.
import fs from "node:fs";

console.log(fs);
console.log(typeof fs.readFile);
console.log(fs.readFile.toString());
console.log(fs.open.toString());
*/

/*
// Simplified shape of fs.open() from Node's source.
function open(path, flags, mode, callback) {
  if (arguments.length < 3) {
    callback = flags;
    flags = "r";
    mode = 0o666;
  } else if (typeof mode === "function") {
    callback = mode;
    mode = 0o666;
  } else {
    mode = parseFileMode(mode, "mode", 0o666);
  }

  const flagsNumber = stringToFlags(flags);

  const h = vfsState.handlers;
  if (h !== null && vfsResult(h.open(path, flagsNumber, mode), callback)) return;

  path = getValidatedPath(path);
  callback = makeCallback(callback);

  const req = new FSReqCallback();
  req.oncomplete = callback;

  binding.open(path, flagsNumber, mode, req); // native call into libuv
}
*/

/*
// Blocking server: busyWait() holds the event loop for 500ms per request.
import http from "node:http";

function busyWait(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

http.createServer((_req, res) => {
  console.log("Request received. Blocking...");
  busyWait(500);
  res.end("blocking\n");
}).listen(5000);
*/

/*
// Timer server: setTimeout() frees the event loop while the response waits.
import http from "node:http";

http.createServer((_req, res) => {
  console.log("Request received. Scheduling timer...");
  setTimeout(() => {
    console.log("Timer finished. Sending response.");
    res.end("non-blocking\n");
  }, 5000);
}).listen(5001);
*/
