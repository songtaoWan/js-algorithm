import { compare, getChaoticArray } from './test';

/**
 * 快速排序，改变原数组
 * @param arr
 * @param compareFn
 * @returns
 */
export default function quickSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
): T[] {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  const quick = (
    arr: T[],
    leftIdx: number,
    rightIdx: number,
    compareFn: (a: T, b: T) => boolean
  ) => {
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
}

function quickSortPlus<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
): T[] {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  const quick = (
    arr: T[],
    leftIdx: number,
    rightIdx: number,
    compareFn: (a: T, b: T) => boolean
  ) => {
    // 当数组长度较小时，使用插入排序（在排序小数组有不错的性能）
    if (rightIdx - leftIdx < 20) {
      // 将数组的每一项与其前面的每一个元素比较
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
}

const qarr = getChaoticArray(30);
const qres = quickSortPlus(qarr, compare);

console.log(qres);

// for (let i = 0; i < 1; i++) {
//   const qarr = getChaoticArray(8000);

//   const arr1 = JSON.parse(JSON.stringify(qarr));
//   console.time('quickSort: ')
//   quickSort(arr1, compare);
//   console.timeEnd('quickSort: ')
  
//   console.time('plus: ')
//   quickSortPlus(qarr, compare);
//   console.timeEnd('plus: ')
// }
