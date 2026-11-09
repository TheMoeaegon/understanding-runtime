// Run from node-architecture/:
// node --allow-natives-syntax examples/hidden-classes-demo.js
const obj1 = {};
const obj2 = {};
console.log(%HaveSameMap(obj1, obj2)); // true

obj1.x = 1;
console.log(%HaveSameMap(obj1, obj2)); // false

obj2.x = 5;
console.log(%HaveSameMap(obj1, obj2)); // true
