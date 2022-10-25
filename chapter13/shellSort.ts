import { compare, getChaoticArray } from './test';

/**
 * 希尔排序
 * @param arr 
 * @param compareFn a > b 升序，b > a 降序
 * @returns 
 */
export default function shellSort<T = unknown>(arr: T[], compareFn: (a: T, b: T) => boolean) {
  const length = arr.length;
  if (!length) {
    return [];
  }

  let spacing = Math.floor(length / 3);
  do {
    for (let i = 1; i < length; i++) {
      let prevIdx = i - spacing;
      const currVal = arr[i];

      while(prevIdx >= 0 && compareFn(arr[prevIdx], currVal)) {
        arr[prevIdx + spacing] = arr[prevIdx];
        prevIdx -= spacing;
      }

      arr[prevIdx + spacing] = currVal;
    }

    spacing = Math.floor(spacing / 3);
  } while(spacing >= 1);

  return arr;
}

const tempArr = getChaoticArray(15);
// console.log(tempArr);

shellSort(tempArr, compare);
console.log(tempArr);



