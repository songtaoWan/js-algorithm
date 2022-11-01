/**
 * 选择排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
const selectionSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  for (let i = 0; i < length - 1; i++) {
    let idx = i;
    // 寻找最大（小）值索引，最大还是最小取决于你的比较函数
    for (let j = i + 1; j < length; j++) {
      if (compareFn(arr[idx], arr[j])) {
        idx = j;
      }
    }

    if (i !== idx) {
      [arr[i], arr[idx]] = [arr[idx], arr[i]];
    }
  }

  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = selectionSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `选择排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `选择排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});