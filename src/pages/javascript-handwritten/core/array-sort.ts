/**
 * 手写 array sort
 *
 * bobbleSort 两个循环，内层循环每次都把大的放到最后，外层循环结束一轮后，最大的就在最后面，然后内层循环的最大数就只到 arr.length - i - 1
 */

export default (() => {
  const array = new Array(100)
    .fill(null)
    .map((_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  const getArray = (): any[] => JSON.parse(JSON.stringify(array));

  console.time("array.sort");
  getArray().sort((a, b) => a - b);
  console.timeEnd("array.sort");

  function bobbleSort(arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }

  console.time("bobbleSort");
  bobbleSort(getArray());
  console.timeEnd("bobbleSort");

  function selectionSort(arr: any[]) {
    for (let i = 0; i < arr.length - 1; i++) {
      // 从起点开始，找更小的值的下标，找到则赋值给 min
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) min = j;
      }
      // 一轮循环结束，找到最小值的小标，进行位置交换
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
  }

  console.time("selectionSort");
  selectionSort(getArray());
  console.timeEnd("selectionSort");

  function insertionSort(arr: any[]) {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let j = i;
      // 初始从下标为 1 的元素开始向前查找更大的元素，找到则直接交换位置
      while (arr[j - 1] > temp && j > 0) {
        arr[j] = arr[j - 1];
        j--;
      }
      // 一轮循环结束，将 j 位置开始下标对应的值
      arr[j] = temp;
    }
    return arr;
  }

  console.time("insertionSort");
  insertionSort(getArray());
  console.timeEnd("insertionSort");

  function quickSortGroupSort(arr: any[]): any[] {
    if (arr.length <= 1) return arr;
    // 设置一个基点用于比较进行分组（选择数组第一位元素作为基点）
    const middleItem = arr[0];

    const leftArray = [];
    const rightArray = [];

    for (let i = 1; i < arr.length; i++) {
      arr[i] >= middleItem ? rightArray.push(arr[i]) : leftArray.push(arr[i]);
    }

    // 递归调用
    return quickSortGroupSort(leftArray).concat(
      middleItem,
      quickSortGroupSort(rightArray),
    );
  }

  console.time("quickSortGroupSort");
  quickSortGroupSort(getArray());
  console.timeEnd("quickSortGroupSort");

  function quickSort(arr: any[], l = 0, r = arr.length - 1) {
    if (l >= r) return;
    // 左指针和右指针
    let left = l;
    let right = r;
    // 基点和基点元素
    let basic = left;
    let basicItem = arr[basic];

    while (left < right) {
      // 尝试从右边找比基点小的元素
      while (left < right && arr[right] > basicItem) {
        right--;
      }
      // 从右边找到了比基点小的元素，则交换和基点的位置
      if (left < right) {
        [arr[basic], arr[right], basic] = [arr[right], basicItem, right];
        left++;
      }

      // 尝试从左边找比基点大的元素
      while (left < right && arr[left] <= basicItem) {
        left++;
      }
      // 从左边找到了比基点大的元素
      if (left < right) {
        [arr[basic], arr[left], basic] = [arr[left], basicItem, left];
        right--;
      }
    }

    quickSort(arr, l, basic - 1);
    quickSort(arr, basic + 1, r);
    return arr;
  }

  console.time("quickSort");
  quickSort(getArray());
  console.timeEnd("quickSort");
})();
