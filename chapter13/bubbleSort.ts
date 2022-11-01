import { compare, getChaoticArray } from "./test";

/**
 * 冒泡排序
 * @param arr 
 * @param compareFn 
 * @returns 
 */
export default function bubbleSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
) {
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
}

const chaotic1 = getChaoticArray(20, -10, 100);
const res1 = bubbleSort(chaotic1, compare);
console.log(res1);

const res2 = bubbleSort(chaotic1, (a, b) => b > a);
console.log(res2);