import { getChaoticArray } from './test';

/**
 * 计数排序，不改变原数组，只支持整数
 * @param arr 
 * @returns 
 */
export default function countingSort(arr: number[]) {
  if (arr.length < 2) {
    return arr;
  }

  const counts: {positive: number, negative: number}[] = [];
  arr.forEach((val) => {
    if (!Number.isInteger(val)) {
      return;
    }

    if (!counts[Math.abs(val)]) {
      counts[Math.abs(val)] = {positive: 0, negative: 0};
    }

    if (val >= 0) {
      counts[val].positive++;
    } else {
      counts[Math.abs(val)].negative++;
    }
  });

  const sorts: number[] = [];
  counts.forEach((value, i) => {
    while(value.positive > 0 || value.negative > 0) {
      if (value.positive > 0) {
        sorts.push(i);
        value.positive--;
      }

      if (value.negative > 0) {
        sorts.unshift(-i);
        value.negative--;
      }
    }
  });
  return sorts;
}

const carr = getChaoticArray(20, -100);
const cres = countingSort(carr);
console.log(cres);
