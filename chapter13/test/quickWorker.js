/**
 * 快速排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns {any[]}
 */
const quickSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  const quick = (arr, leftIdx, rightIdx, compareFn) => {
    // 当数组长度较小时，使用插入排序（在排序小数组有不错的性能）
    if (rightIdx - leftIdx < 20) {
      for (let i = leftIdx; i <= rightIdx; i++) {
        let prevIdx = i - 1;
        const currVal = arr[i];

        while (prevIdx >= 0 && compareFn(arr[prevIdx], currVal)) {
          arr[prevIdx + 1] = arr[prevIdx];
          prevIdx--;
        }

        prevIdx++;
        arr[prevIdx] = currVal;
      }
      return;
    }

    const pivot = arr[Math.floor((leftIdx + rightIdx) / 2)];
    let i = leftIdx;
    let j = rightIdx;

    // 划分数组，将较大的值放在数组的一边，较小的值放在数组的另一边。
    while (i <= j) {
      // 如果值小于（大于）基准值则继续比较下一个值，大于（小于）则跳出循环
      while (compareFn(pivot, arr[i])) {
        i++;
      }
      // 如果值大于（小于）基准值则继续比较下一个值，小于（大于）则跳出循环
      while (compareFn(arr[j], pivot)) {
        j--;
      }

      /**
       * 将左子序列跳出循环的值与右子序列跳出循环的值交换位置
       * 例如：左边都是小于基准值的值，但发现了一个大于基准值的元素。
       * 右边都是大于基准值的值，但发现了一个小于基准值的元素。
       * 现在将它们交换位置，保证左边都是小于基准值，右边都是大于基准值
       */
      if (i <= j) {
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        // 继续下一个元素
        i++;
        j--;
      }
    }

    // 左子序列的长度大于1，继续划分
    if (leftIdx < i - 1) {
      quick(arr, leftIdx, i - 1, compareFn);
    }

    // 右子序列的长度大于1，继续划分
    if (rightIdx > i) {
      quick(arr, i, rightIdx, compareFn);
    }
  };

  quick(arr, 0, arr.length - 1, compareFn);
  return arr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = quickSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `快速排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `快速排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});