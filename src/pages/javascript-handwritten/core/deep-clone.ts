/**
 * 手写 deep-clone
 *
 * 应该主要是临界情况的考虑
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
  };
  // @ts-ignore
  obj.k = obj;

  function deepClone(obj: any) {}

  console.log(deepClone(obj));
})();
