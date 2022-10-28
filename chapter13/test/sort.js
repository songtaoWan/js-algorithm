/**
 * a大于b返回true
 * @param a
 * @param b
 * @returns
 */
const compare = (a, b) => {
  return a > b;
};

/**
 * 生成一个没有重复元素乱序数组，如果最大值与最小值的差小于要求的数组长度，则最大值修改为最大值+长度
 * @param len 数组长度，默认 10
 * @param min 默认 10
 * @param max 默认 100
 * @returns
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
    do {
      const randomNum = Math.floor(Math.random() * (max - min) + min);
      if (!arr.includes(randomNum)) {
        arr.push(randomNum);
        break;
      }
    } while (true);
  }

  return arr;
};

/**
 * 插入排序
 * @param {*} arr 
 * @param {*} compareFn 
 * @returns 
 */
function insertionSort(arr, compareFn) {
  const length = arr.length;
  if (!length) {
    return [];
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
}

/**
 * 希尔排序
 * @param arr
 * @param compareFn a > b 升序，b > a 降序
 * @returns
 */
function shellSort(arr, compareFn) {
  const length = arr.length;
  if (!length) {
    return [];
  }

  let spacing = Math.floor(length / 3);
  do {
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
}

/**
 * 归并排序，不改变原数组，返回新数组
 * @param arr
 * @param compareFn
 * @returns
 */
function mergeSort(arr, compareFn) {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  const middle = Math.floor(length / 2);
  const left = mergeSort(arr.slice(0, middle), compareFn);
  const right = mergeSort(arr.slice(middle, length), compareFn);

  const merge = (leftArr, rightArr, compareFn) => {
    const result = [];
    if (compareFn(leftArr[0], rightArr[rightArr.length - 1])) {
      return result.concat(rightArr, leftArr);
    }
    if (compareFn(rightArr[0], leftArr[leftArr.length - 1])) {
      return result.concat(leftArr, rightArr);
    }

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
}

function quickSort(arr, compareFn) {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  const quick = (arr, leftIdx, rightIdx, compareFn) => {
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
        [arr[i], arr[j]] = [arr[j], arr[i]];

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
}
