/**
 * 手写 apply call bind
 *
 * 关键就是，存储当前的 this，也就是被调用的函数
 * 然后新建一个 Object，把上面存储的函数塞进去
 * 在新的 Object 环境下，执行函数，给予参数
 */

Function.prototype._apply = function (thisArg, argArray = []) {
  // 上下文对象为 undefined 和 null 时指向 window, 否者强制转为 Object 的包装类型
  thisArg =
    thisArg === null || thisArg === undefined ? window : Object(thisArg);
  // 创建一个 symbol 保存调用 call 的函数
  const fn = Symbol();
  thisArg[fn] = this;
  // 将上下文 thisArg 作为 this 调用该函数
  const res = thisArg[fn](...argArray);
  // 调用完毕删除引用并返回结果
  delete thisArg[fn];
  return res;
};

Function.prototype._call = function (thisArg, ...argArray) {
  // 上下文对象为 undefined 和 null 时指向 window, 否者强制转为 Object 的包装类型
  thisArg =
    thisArg === null || thisArg === undefined ? window : Object(thisArg);
  // 创建一个 symbol 保存调用 call 的函数
  const fn = Symbol();
  thisArg[fn] = this;
  // 将上下文 thisArg 作为 this 调用该函数
  const res = thisArg[fn](...argArray);
  // 调用完毕删除引用并返回结果
  delete thisArg[fn];
  return res;
};

Function.prototype._bind = function (thisArg, argArray) {
  // 上下文对象为 undefined 和 null 时指向 window, 否者强制转为 Object 的包装类型
  thisArg =
    thisArg === null || thisArg === undefined ? window : Object(thisArg);
  // 创建一个 symbol 保存调用 call 的函数
  const fn = Symbol();
  thisArg[fn] = this;
  // 创建一个新的函数并返回这个新函数
  return function (..._args: any[]) {
    // 将上下文 thisArg 作为 this 调用该函数
    const res = argArray
      ? thisArg[fn](argArray, ..._args)
      : thisArg[fn](..._args);
    // 调用完毕删除引用并返回结果
    delete thisArg[fn];
    return res;
  };
};

const obj = {
  name: "obj",
};

function One(this: any, name: string) {
  this.name = name;
}

One.prototype.getName = function (age: number) {
  console.log(this.name, age);
};

// @ts-ignore
const one = new One("king");

one.getName();
one.getName.call(obj, 18);
one.getName.apply(obj, [18]);
one.getName.bind(obj, [18])();
one.getName.bind(obj)(18);
