/**
 * 手写 instanceof
 *
 * 主要就是看构造函数的 prototype 是否在实例对象的原型链上出现
 */

export default (() => {
  function People(this: any, name: string) {
    this.name = name;
  }

  function _instanceof(A: any, B: any) {
    let a = A.__proto__;
    let b = B.prototype;

    while (a !== b) {
      if (a === null) return false;
      a = a.__proto__;
    }

    return true;
  }

  // @ts-ignore
  const man = new People("king");

  console.log(man instanceof Object);
  console.log(_instanceof(man, Object));
})();
