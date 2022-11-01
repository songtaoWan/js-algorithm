/**
 * 基数排序，不改变原数组。
 * @param {any[]} arr
 * @param {(a) => number} getValue 获取元素的值，必须返回整数
 * @param isAsc 是否升序，默认是
 * @returns
 */
const radixSort = (arr, getValue = (a) => a, isAsc = true) => {
  if (arr.length < 2) {
    return arr;
  }

  /**
   * 将数组按有效位排序
   * @param arr
   * @param significantDigit 有效位，例如：个位 1，十位 10
   * @param getValue
   * @returns
   */
  const countsRadixSort = (arr, significantDigit, getValue, isAsc = true) => {
    const radixs = [];
    arr.forEach((val) => {
      const realValue = getValue(val);
      const absValue = Math.abs(realValue);
      // 计算有效位，例如：60的十位有效位6
      let i = Math.floor((absValue / significantDigit) % 10);

      // 将负数保存到数组索引10-19的十个桶中
      if (realValue < 0) {
        i += 10;
      }

      if (!radixs[i]) {
        radixs[i] = [];
      }
      radixs[i].push(val);
    });

    const results = [];
    radixs.forEach((val, i) => {
      if (isAsc) {
        if (i < 10) {
          results.push(...val);
          return;
        }

        // 将负数插入数组前面
        results.unshift(...val);
        return;
      }

      if (i < 10) {
        results.unshift(...val);
        return;
      }

      // 将负数插入数组前面
      results.push(...val);
    });

    return results;
  };

  let max = getValue(arr.reduce((a, b) => (getValue(a) > getValue(b) ? a : b)));

  let significantDigit = 1;
  let newArr = arr;
  while (Math.abs(max / significantDigit) >= 1) {
    newArr = countsRadixSort(newArr, significantDigit, getValue, isAsc);
    significantDigit *= 10;
  }

  return newArr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = radixSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `基数排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `基数排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});