
/**
 * @export
 * @param {*} fn 缓动函数
 * @param {*} delay 延时时间
 * @param {*} immediate 是否需要立即执行
 * @returns
 */

export default function debounce(fn, delay, immediate) {
  let timer = null;

  return function() {
    const context = this;
    const args = arguments;

    return new Promise((resolve, reject) => {
      timer && clearTimeout(timer);

      if (immediate) {
        const doNow = !timer;

        timer = setTimeout(() => {
          timer = null;
        }, delay);

        doNow && resolve(fn.apply(context, args));
      } else {
        timer = setTimeout(() => {
          resolve(fn.apply(context, args));
        }, delay);
      }
    });
  };
}
