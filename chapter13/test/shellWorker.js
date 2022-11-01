/**
 * 希尔排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
const shellSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  // 设置步长，一个好的步长可以提高算法速度
  let spacing = Math.floor(length / 3);
  do {
    // 将数组的每一项与其前n项比较
    for (let i = 1; i < length; i++) {
      let prevIdx = i - spacing;
      const currVal = arr[i];

      while (prevIdx >= 0 && compareFn(arr[prevIdx], currVal)) {
        arr[prevIdx + spacing] = arr[prevIdx];
        prevIdx -= spacing;
      }

      arr[prevIdx + spacing] = currVal;
    }

    spacing = Math.floor(spacing / 3);
  } while (spacing >= 1);

  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = shellSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `希尔排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `希尔排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});