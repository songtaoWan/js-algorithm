/**
 * 计数排序，不改变原数组，只支持整数
 * @param {any[]} arr
 * @returns
 */
const countingSort = (arr) => {
  if (arr.length < 2) {
    return arr;
  }

  const counts = [];
  arr.forEach((val) => {
    if (!Number.isInteger(val)) {
      return;
    }

    if (!counts[Math.abs(val)]) {
      counts[Math.abs(val)] = { positive: 0, negative: 0 };
    }

    if (val >= 0) {
      counts[val].positive++;
    } else {
      counts[Math.abs(val)].negative++;
    }
  });

  const sorts = [];
  counts.forEach((value, i) => {
    while (value.positive > 0 || value.negative > 0) {
      if (value.positive > 0) {
        sorts.push(i);
        value.positive--;
      }

      if (value.negative > 0) {
        sorts.unshift(-i);
        value.negative--;
      }
    }
  });
  return sorts;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = countingSort(value);
  const times = performance.now() - begin;

  if (result.length <= 30) {
    const text = `计数排序结果：[ ${result.join(
      ', '
    )} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(
    `计数排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`
  );
});
