/**
 * 冒泡排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
 const bubbleSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  for (let i = 0; i < length - 1; i++) {
    // 每进行一次内循环，都可以找出一个极值
    for (let j = 0; j < length - 1 - i; j++) {
      if (compareFn(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = bubbleSort(value);
  const times = performance.now() - begin;
  
  if (result.length <= 30) {
    const text = `冒泡排序结果：[ ${result.join(', ')} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(`冒泡排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`);
});