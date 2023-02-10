/**
 * 手写 new
 */

function Two(this: any, name: string) {
  this.name = name;
}

function _new(fn: Function, ...argArray: any[]) {
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, argArray);
  return res instanceof Object ? res : obj;
}

// @ts-ignore
// const two = new Two("king");

const two = _new(Two, "king");

console.log(two);
console.log(two.name);
