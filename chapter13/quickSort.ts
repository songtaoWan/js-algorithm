import { compare, getChaoticArray } from './test';

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
    while(i <= j) {
      // 如果值小于（大于）基准值则继续比较下一个值，大于（小于）则跳出循环
      while(compareFn(pivot, arr[i])) {
        i++;
      }
      // 如果值大于（小于）基准值则继续比较下一个值，小于（大于）则跳出循环
      while(compareFn(arr[j], pivot)) {
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

const qarr = getChaoticArray();
const qres = quickSort(qarr, compare);

console.log(qres);
