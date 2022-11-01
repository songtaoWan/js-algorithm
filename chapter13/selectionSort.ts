import { compare, getChaoticArray } from "./test";

/**
 * 选择排序，改变原数组
 * @param arr 
 * @param compareFn 
 * @returns 
 */
export default function selectionSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
) {
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
}

const chaotic2 = getChaoticArray(20);
const sele = selectionSort(chaotic2, compare);
console.log(sele);
const sele1 = selectionSort(chaotic2, (a, b) => b > a);
console.log(sele1);
