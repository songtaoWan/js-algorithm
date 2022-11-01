/**
 * 插入排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
 const insertionSort = (arr, compareFn) => {
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

/**
 * 桶排序，不改变原数组
 * @param {any[]} arr
 * @param {(a) => number} getValue 获取每个元素用来排序的值
 * @param {number} bucketSize 每个桶的大小，默认5
 * @param isAsc 是否升序，默认是
 * @returns
 */
 const bucketSort = (arr, getValue = (a) => a, bucketSize = 5, isAsc = true) => {
  if (arr.length < 2) {
    return arr;
  }
  if (bucketSize <= 0) {
    bucketSize = 5;
  }
  if (~~bucketSize !== bucketSize) {
    bucketSize = bucketSize | 0;
  }

  const createBucket = (arr, getValue, bucketSize = 5) => {
    let min = getValue(arr[0]);
    arr.forEach((val) => {
      const realValue = getValue(val);

      if (realValue < min) {
        min = realValue;
        return;
      }
    });

    const buckets = [];
    arr.forEach((val) => {
      // 计算元素该放入哪个桶
      const i = Math.floor((getValue(val) - min) / bucketSize);

      if (!buckets[i]) {
        buckets[i] = [];
      }

      buckets[i].push(val);
    });

    return buckets;
  };

  const buckets = createBucket(arr, getValue, bucketSize);
  const newArr = [];
  buckets.forEach((val) => {
    if (!isAsc) {
      insertionSort(val, (a, b) => getValue(a) < getValue(b));
      newArr.unshift(...val);
      return;
    }

    insertionSort(val, (a, b) => getValue(a) > getValue(b));
    newArr.push(...val);
  });

  return newArr;
};

self.addEventListener('message', (e) => {
  const value = e.data;

  const begin = performance.now();
  const result = bucketSort(value);
  const times = performance.now() - begin;
  
  if (result.length <= 30) {
    const text = `桶排序结果：[ ${result.join(', ')} ]，所用时间 ${times.toFixed(3)}ms`;

    self.postMessage(text);
    return;
  }
  self.postMessage(`桶排序（数组长度：${result.length}）所用时间为 ${times.toFixed(3)}ms.`);
});