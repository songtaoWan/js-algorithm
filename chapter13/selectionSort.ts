import { compare, getChaoticArray } from "./test";

export default function selectionSort<T = unknown>(
  arr: T[],
  compareFn: (a: T, b: T) => boolean
) {
  const length = arr.length;
  if (!length) {
    return [];
  }

  for (let i = 0; i < length - 1; i++) {
    let idx = i;
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
