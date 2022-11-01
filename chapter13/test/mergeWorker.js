/**
 * 归并排序，不改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns {any[]}
 */
const mergeSort = (arr, compareFn = (a, b) => a > b) => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  // 分割数组
  const middle = Math.floor(length / 2);
  const left = mergeSort(arr.slice(0, middle), compareFn);
  const right = mergeSort(arr.slice(middle, length), compareFn);

  const merge = (leftArr, rightArr, compareFn) => {
    const result = [];
    // 因为leftArr和rightArr都是排好序的，所以只要leftArr的第一个值大于（小于）rightArr的最后一个值
    // 则leftArr所有元素都大于（小于）rightArr的所有元素
    if (compareFn(leftArr[0], rightArr[rightArr.length - 1])) {
      return result.concat(rightArr, leftArr);
    }
    if (compareFn(rightArr[0], leftArr[leftArr.length - 1])) {
      return result.concat(leftArr, rightArr);
    }

    // 将两个排好序的数组，按顺序插入新数组
    let i = 0;
    let j = 0;
    do {
      if (compareFn(leftArr[i], rightArr[j])) {
        result.push(rightArr[j++]);
      } else {
        result.push(leftArr[i++]);
      }
    } while (i < leftArr.length && j < rightArr.length);

    return result.concat(
      i >= leftArr.length ? rightArr.slice(j) : leftArr.slice(i)
    );
  };

  return merge(left, right, compareFn);
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = mergeSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `归并排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `归并排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});