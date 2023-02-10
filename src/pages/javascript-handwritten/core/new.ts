/**
 * 手写 new
 *
 * 主要还是一样，通过 Object.create 基于 fn 的 prototype 创建一个对象
 * 然后该对象执行构造函数执行的时候所需要的参数，并且把 this 指向新建的对象
 *
 * 有一点需要注意，就是最后返回的时候，判断了一下 instanceof Object
 *
 * 传统语言中，构造函数不应该有返回值，在 JavaScript 中可以有返回值
 *
 * 1. 没有返回值则按照其他语言一样返回实例化对象
 * 2. 若有返回值则检查其返回值是否为引用类型
 * 3. 如果是非引用类型，则与无返回值相同，返回实例化对象
 */

export default (() => {
  function People(this: any, name: string) {
    this.name = name;
  }

  function _new(fn: Function, ...argArray: any[]) {
    const obj = Object.create(fn.prototype);
    const res = fn.apply(obj, argArray);
    return res instanceof Object ? res : obj;
  }

  // @ts-ignore
  const man = new People("king");

  const man2 = _new(People, "king");

  console.log(man);
  console.log(man.name);

  console.log(man2);
  console.log(man2.name);
})();
