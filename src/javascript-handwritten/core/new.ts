/**
 * 手写 new
 *
 * 主要还是一样，通过 Object.create 基于 fn 的 prototype 创建一个对象
 * 然后该对象执行构造函数执行的时候所需要的参数，并且把 this 指向新建的对象
 *
 * 有一点需要注意，就是最后返回的时候，判断了一下 instanceof Object
 *
 * 传统语言中，构造函数不应该有返回值，在 js 中可以有返回值
 *
 * 1. 没有返回值则按照其他语言一样返回实例化对象
 * 2. 若有返回值则检查其返回值是否为引用类型
 * 3. 如果是非引用类型，如基本类型，则与无返回值相同，返回其实例化对象
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
const two = new Two("king");

// const two = _new(Two, "king");

console.log(two);
console.log(two.name);
