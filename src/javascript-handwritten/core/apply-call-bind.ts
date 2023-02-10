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

export default (() => {
  const obj = {
    name: "obj",
  };

  function People(this: any, name: string) {
    this.name = name;
  }

  People.prototype.getName = function (age: number) {
    console.log(this.name, age);
  };

  // @ts-ignore
  const man = new People("king");

  man.getName();
  man.getName.call(obj, 18);
  man.getName.apply(obj, [18]);
  man.getName.bind(obj, [18])();
  man.getName.bind(obj)(18);
})();
