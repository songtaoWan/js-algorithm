import { compare, getChaoticArray } from './test';

/**
 * 归并排序，不改变原数组，返回新数组
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

  const middle = Math.floor(length / 2);
  const left = mergeSort(arr.slice(0, middle), compareFn);
  const right = mergeSort(arr.slice(middle, length), compareFn);

  const merge = (
    leftArr: T[],
    rightArr: T[],
    compareFn: (a: T, b: T) => boolean
  ) => {
    const result: T[] = [];
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
