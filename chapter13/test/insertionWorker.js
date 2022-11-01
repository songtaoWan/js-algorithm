/**
 * 插入排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
 const insertionSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  // 将数组的每一项与其前面的每一个元素比较
  for (let i = 1; i < length; i++) {
    let prevIdx = i - 1;
    const currVal = arr[i];

    while (prevIdx >= 0 && compareFn(arr[prevIdx], currVal)) {
      arr[prevIdx + 1] = arr[prevIdx];
      prevIdx--;
    }

    prevIdx++;
    arr[prevIdx] = currVal;
  }

  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = insertionSort(value);
  const times = performance.now() - begin;
  
  if (result.length <= 30) {
    const text = `插入排序结果：[ ${result.join(', ')} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(`插入排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`);
});
