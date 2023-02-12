/**
 * 手写 array function
 *
 * find 如果没找到，返回的是 undefined
 * findIndex 如果没找到，返回的是 -1
 */

export default (() => {
  const arr = [1, 2, 3, 4, 5];
  const current = 0;

  function find<T = any>(
    arr: T[],
    callback: (item: T, index: number, arr: T[]) => unknown,
  ): T | undefined {
    for (let index = 0; index < arr.length; index++) {
      if (callback(arr[index], index, arr)) return arr[index];
    }
  }

  console.log(arr.find((item) => item === current));
  console.log(find(arr, (item) => item === current));

  function findIndex<T = any>(
    arr: T[],
    callback: (item: T, index: number, arr: T[]) => unknown,
  ): number {
    for (let index = 0; index < arr.length; index++) {
      if (callback(arr[index], index, arr)) return index;
    }
    return -1;
  }

  console.log(arr.findIndex((item) => item === current));
  console.log(findIndex(arr, (item) => item === current));

  function filter<T = any>(
    arr: T[],
    callback: (item: T, index: number, arr: T[]) => unknown,
  ): T[] {
    const res = [];
    for (let index = 0; index < arr.length; index++) {
      if (callback(arr[index], index, arr)) res.push(arr[index]);
    }
    return res;
  }

  console.log(arr.filter((item) => item === current));
  console.log(filter(arr, (item) => item === current));

  function map<T = any, U = any>(
    arr: T[],
    callback: (item: T, index: number, arr: T[]) => U,
  ): U[] {
    const res = [];
    for (let index = 0; index < arr.length; index++) {
      res.push(callback(arr[index], index, arr));
    }
    return res;
  }

  console.log(arr.map((item) => item * 10));
  console.log(map(arr, (item) => item * 10));

  function reduce<T = any, U = any>(
    arr: T[],
    callback: (pre: U, curr: T, index: number, arr: T[]) => U,
    base: U,
  ): U {
    let res = base;
    for (let index = 0; index < arr.length; index++) {
      res = callback(res, arr[index], index, arr);
    }
    return res;
  }

  console.log(arr.reduce((pre, curr) => ({ ...pre, [curr]: curr }), {}));
  console.log(reduce(arr, (pre, curr) => ({ ...pre, [curr]: curr }), {}));

  const arr2 = [[1, [2, [2, 4, 5, [[4, [[5]], 1]]], 6]], 4];

  function flat(arr: any[], depth: number) {
    if (depth === 0) return arr;
    let res: any[] = [];
    for (let index = 0; index < arr.length; index++) {
      const item = arr[index];
      if (Array.isArray(item)) {
        res = res.concat(flat(item, depth - 1));
      } else {
        res.push(item);
      }
    }
    return res;
  }

  console.log(arr2.flat(3));
  console.log(flat(arr2, 3));

  const arr3 = [1, 1, 1, 3, 4, 5, 6, 1, 3, 4, 2, 2, 2];

  function single(arr: any[]) {
    const obj: {} = {};
    const res: any[] = [];
    for (let index = 0; index < arr.length; index++) {
      const item = arr[index];
      // @ts-ignore
      if (!obj[item]) {
        res.push(item);
        // @ts-ignore
        obj[item] = 1;
      }
    }
    return res;
  }

  console.log(Array.from(new Set(arr3)));
  console.log(single(arr3));
})();
