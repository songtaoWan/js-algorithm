/**
 * a大于b返回true
 * @param a
 * @param b
 * @returns {boolean}
 */
const compare = (a, b) => {
  return a > b;
};

/**
 * @description 获取伪随机数，可以指定范围
 * @param {number} [min=0]
 * @param {number} [max=65532]
 * @returns {number}
 */
const getPseudoRandomNumber = (min = 0, max = 65532) => {
  if (!Number.isInteger(min) || !Number.isInteger(max) || min === max) {
    throw new Error('argument error');
  }

  if (min > max) {
    const temp = min;
    max = min;
    min = temp;
  }

  try {
    const arr = new Uint16Array(1);
    const maxNum = 65532;

    const randomNum = crypto.getRandomValues(arr)[0] / maxNum;
    return Math.ceil(randomNum * (max - min) + min);
  } catch (ex) {
    console.error(ex.message);
  }
};

/**
 * 生成一个没有重复元素乱序数组，如果最大值与最小值的差小于要求的数组长度，则最大值修改为最大值+长度
 * @param len 数组长度，默认 10
 * @param min 默认 10
 * @param max 默认 100
 * @returns {number[]}
 */
const getChaoticArray = (len = 10, min = 10, max = 100) => {
  if (len < 0) {
    len = Math.abs(len);
  }
  if (~~len !== len) {
    len = len | 0;
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  if (max - min < len) {
    max += len;
  }

  const arr = [];
  for (let i = 0; i < len; i++) {
    let value;
    try {
      value = getPseudoRandomNumber(min, max);
    } catch(e) {
      value = Math.floor(Math.random() * (max - min) + min);
    }
    arr.push(value);
  }

  return arr;
};

/**
 * 冒泡排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
const bubbleSort = (arr, compareFn) => {
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

/**
 * 选择排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
const selectionSort = (arr, compareFn) => {
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
 * 希尔排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns
 */
const shellSort = (arr, compareFn) => {
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

/**
 * 归并排序，不改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns {any[]}
 */
const mergeSort = (arr, compareFn) => {
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

/**
 * 快速排序，改变原数组
 * @param {any[]} arr
 * @param {(a, b) => boolean} compareFn
 * @returns {any[]}
 */
const quickSort = (arr, compareFn) => {
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

/**
 * 桶排序，不改变原数组
 * @param {any[]} arr
 * @param {(a) => number} getValue 获取每个元素用来排序的值
 * @param {number} bucketSize 每个桶的大小，默认5
 * @param isAsc 是否升序，默认是
 * @returns
 */
const bucketSort = (arr, getValue, bucketSize = 5, isAsc = true) => {
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

/**
 * 基数排序，不改变原数组。
 * @param {any[]} arr
 * @param {(a) => number} getValue 获取元素的值，必须返回整数
 * @param isAsc 是否升序，默认是
 * @returns
 */
const radixSort = (arr, getValue, isAsc = true) => {
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

/**
 * 堆排序，改变原数组
 * @param {any[]} arr 待排序数组
 * @param  {(a, b) => boolean} compareFn 比较函数: a > b 升序(构建最大堆)，b > a 降序(构建最小堆)
 * @returns
 */
const heapSort = (arr, compareFn) => {
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
