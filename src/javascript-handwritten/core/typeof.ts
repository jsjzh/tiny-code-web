/**
 * 手写 typeof
 *
 * 其实这个主要是需要知道 typeof 的特性
 * 对于哪些原生的构造函数是显示的 object，另外还有就是 null
 * typeof null 是 object
 *
 * 另外，对于 typeof sss，sss 未定义，会给出 undefined
 * 但是自己写的函数，对于未定义的 sss，会报错
 */

export default (() => {
  function _type(value: any) {
    console.log(111, value[Symbol.toStringTag]);

    let types = [Date, RegExp, Map, Set, WeakMap];
    if (types.some((type) => value instanceof type) || value === null)
      return "object";

    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
  }

  console.log(typeof sss);

  console.log(_type(""));
})();
