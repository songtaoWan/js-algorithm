import { compare, getChaoticArray } from './test';

/**
 * 归并排序，不改变原数组
 * @param arr 
 * @param compareFn 
 * @returns 
 */
export default function mergeSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
): T[] {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  // 分割数组
  const middle = Math.floor(length / 2);
  const left = mergeSort(arr.slice(0, middle), compareFn);
  const right = mergeSort(arr.slice(middle, length), compareFn);

  const merge = (
    leftArr: T[],
    rightArr: T[],
    compareFn: (a: T, b: T) => boolean
  ) => {
    const result: T[] = [];
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
    } while(i < leftArr.length && j < rightArr.length);

    return result.concat(
      i >= leftArr.length ? rightArr.slice(j) : leftArr.slice(i)
    );
  };

  return merge(left, right, compareFn);
}

const marr = getChaoticArray();
const mres = mergeSort(marr, compare);
console.log(mres);
