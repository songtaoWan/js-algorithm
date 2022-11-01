import { compare, getChaoticArray } from './test';

/**
 * 插入排序，改变原数组
 * @param arr 
 * @param compareFn 
 * @returns 
 */
export default function insertionSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
) {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  // 将数组的每一项与其前面的每一个元素比较
  for (let i = 1; i < length; i++) {
    let prevIdx = i - 1;
    const currVal = arr[i];

    while(prevIdx >= 0 && compareFn(arr[prevIdx], currVal)) {
      arr[prevIdx + 1] = arr[prevIdx];
      prevIdx--;
    }

    prevIdx++;
    arr[prevIdx] = currVal;
  }

  return arr;
}

// const cha1 = getChaoticArray();

// const r1 = insertionSort(cha1, compare);
// console.log(r1);
// const r2 = insertionSort(cha1, (a, b) => b > a);
// console.log(r2);

