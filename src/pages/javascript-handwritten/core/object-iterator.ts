/**
 * 手写 实现对象可迭代
 *
 * 对象可迭代是指能够通过 for of 进行迭代对象
 * 将对象的 value 值进行循环迭代
 * 本质是实现对象的 Symbol.iterator 接口
 *
 * 这个题目我是第一次见，比较特别
 * 其实看了一下写法倒也容易，就是给 object 添加一个方法
 * [Symbol.iterator]，然后该方法返回一个可迭代对象
 * 可迭代对象就是 { next() { return { done: xxx, value: xxx } } }
 */

export default (() => {
  const obj = {
    name: "king",
    age: 28,
    address: "杭州",
  };

  // @ts-ignore
  obj[Symbol.iterator] = function () {
    const values = Object.values(this);
    let index = 0;
    return {
      next() {
        return { value: values[index], done: index++ === values.length };
      },
    };
  };

  // @ts-ignore
  for (const iterator of obj) {
    console.log(iterator);
  }
})();
