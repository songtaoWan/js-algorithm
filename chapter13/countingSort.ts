import { getChaoticArray } from './test';

/**
 * 计数排序，不改变原数组，只支持整数
 * @param arr 
 * @returns 
 */
export default function countingSort(arr: number[]) {
  if (arr.length < 2) {
    return [...arr];
  }

  const counts: number[] = [];
  const minus: number[] = [];
  arr.forEach((val) => {
    if (!Number.isInteger(val)) {
      return;
    }

    if (val < 0) {
      const num = Math.abs(val);
      if (!minus[num]) {
        minus[num] = 0;
      }
      minus[num]++;
      return;
    }

    if (counts[val] === undefined) {
      counts[val] = 1;
      return;
    }

    counts[val]++;
  });

  const newMinus: number[] = [];
  minus.forEach((val, i) => {
    if (!val) {
      return;
    }

    while(val > 0) {
      newMinus.unshift(-i);
      val--;
    }
  });

  const newArr: number[] = [];
  counts.forEach((val, i) => {
    if (!val) {
      return;
    }

    while(val > 0) {
      newArr.push(i);
      val--;
    }
  });

  return newMinus.concat(newArr);
}

const carr = getChaoticArray();
const cres = countingSort(carr.concat([-11, -1, 2, -2, 1, 11, -3, -100]));
console.log(cres);
