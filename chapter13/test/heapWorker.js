/**
 * 堆排序，改变原数组
 * @param {any[]} arr 待排序数组
 * @param  {(a, b) => boolean} compareFn 比较函数: a > b 升序(构建最大堆)，b > a 降序(构建最小堆)
 * @returns
 */
const heapSort = (arr, compareFn = (a, b) => a > b) => {
  /**
   * 通过下移操作堆化：找出自身节点和左右子节点中的最大/小节点，然后交换位置，保证自身大于等于或小于等于子节点
   * @param idx 需要堆化的节点位置
   * @param size 堆在数组中结束位置即堆的大小
   * @param simpleArr 完整数组
   */
  const siftDown = (idx, size, simpleArr) => {
    let tempIdx = idx;
    const leftIdx = tempIdx * 2 + 1;
    const rightIdx = tempIdx * 2 + 2;

    if (leftIdx < size && compareFn(simpleArr[leftIdx], simpleArr[tempIdx])) {
      tempIdx = leftIdx;
    }

    if (rightIdx < size && compareFn(simpleArr[rightIdx], simpleArr[tempIdx])) {
      tempIdx = rightIdx;
    }

    if (tempIdx === idx) {
      return;
    }

    [simpleArr[idx], simpleArr[tempIdx]] = [simpleArr[tempIdx], simpleArr[idx]];
  };

  const buildHeap = (len, arr) => {
    // 一个数组只需要通过下移 （堆的大小 - 1） / 2 次就可以完全堆化
    const begin = Math.floor((len - 1) / 2);
    for (let i = begin; i >= 0; i--) {
      siftDown(i, len, arr);
    }
  };

  let size = arr.length;
  while (size > 1) {
    buildHeap(size, arr);

    // 将堆的最大/小值和堆的最后一个元素交换位置，然后将堆的大小减一
    [arr[0], arr[size - 1]] = [arr[size - 1], arr[0]];
    size--;
  }

  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = heapSort(value);
  const times = performance.now() - begin;
  
  if (result.length <= 30) {
    const text = `堆排序结果：[ ${result.join(', ')} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(`堆排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`);
});
