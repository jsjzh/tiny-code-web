/**
 * TODO
 * 好像有点问题，碰到重复引用还是会循环调用
 * 手写 deep clone
 *
 * 不同类型的引用类型的对象应该怎么 clone 就是重点
 * 类型是 symbol 要用 item.description
 * 非引用类型直接返回
 * 若为函数，直接返回
 * 可以用 weekMap 来防止循环引用重复拷贝
 * 几个特殊的引用类型，Set Map WeakMap Date RegExp
 * 最后再处理 array 和 obj
 */

export default (() => {
  const obj = {
    a: 1,
    b: false,
    c: [1, 2, 3],
    d: [{ k1: 1, k2: 2 }],
    e: new Set([1, 2, 3]),
    f: new Map([
      ["k1", "v1"],
      ["k2", "v2"],
    ]),
    g: new Date(),
    h: Symbol("symbol"),
    i: new RegExp(/\./),
    j: function () {},
    k: "hello",
    l: BigInt(10),
  };
  // @ts-ignore
  // obj.z = obj;

  function deepClone(item: any, weakMap = new WeakMap()) {
    if (typeof item === "symbol") return Symbol(item.description);
    if (typeof item === "bigint") return BigInt(item.valueOf());
    if (!(item instanceof Object)) return item;
    if (typeof item === "function") return item;
    if (weakMap.has(item)) return weakMap.get(item);
    const arr = [Set, WeakSet, Map, WeakMap, Date, RegExp];
    for (let index = 0; index < arr.length; index++) {
      // @ts-ignore
      if (item instanceof arr[index]) return new arr[index](item);
    }

    const obj: { [k: string]: any } = Array.isArray(item) ? [] : {};

    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        obj[key] = deepClone(item[key], weakMap);
      }
    }

    weakMap.set(item, obj);

    return obj;
  }

  console.log(deepClone(obj));
})();
