/**
 * TODO 感觉有点困，没理清这玩意儿
 * 手写 debounce throttle
 *
 * debounce 就是指触发事件后，在 n 秒内只能执行一次，如果在 n 秒内又重新触发了事件，则会重新计算函数的执行时间
 *
 * throttle 限制一个函数在一定时间内只能执行一次
 */

export default (() => {
  function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    config = { leading: false },
  ) {
    let timer = 0;
    let invoker = false;

    function _debounce(this: any, ...args: any[]) {
      if (config.leading && !invoker) {
        func.apply(this, args);
        invoker = true;
        return;
      }
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    }

    return _debounce;
  }

  const de = debounce(() => {
    console.log("hello debounce");
  }, 100);

  de();
  de();
  de();
  de();

  setTimeout(de, 500);

  function throttle<T extends (...args: any[]) => any>(
    func: T,
    delay: number,
    config = { leading: false },
  ) {
    let prevTime = config.leading ? null : ~~new Date();

    function _throttle(this: any, ...args: any[]) {
      let nowTime = ~~new Date();
      if (!prevTime || nowTime - prevTime >= delay) {
        func.apply(this, args);
        prevTime = nowTime;
      }
    }

    return _throttle;
  }

  const th = throttle(() => {
    console.log("hello throttle");
  }, 500);

  de();
  de();
  de();
  de();

  setTimeout(de, 400);
})();
