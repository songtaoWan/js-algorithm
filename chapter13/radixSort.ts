import { getChaoticArray } from './test';

/**
 * 基数排序，根据数字的有效位将整数分布到桶中。
 * @param arr 
 * @param getValue 获取元素的值，必须返回整数
 * @param isAsc 是否升序，默认是
 * @returns 不改变原数组，返回新数组
 */
export default function radixSort<T = unknown>(
  arr: T[],
  getValue: (a: T) => number,
  isAsc = true
) {
  if (arr.length < 2) {
    return arr;
  }

  /**
   * 将数组按有效位排序
   * @param arr 
   * @param significantDigit 有效位，例如：个位 1，十位 10
   * @param getValue 
   * @returns 
   */
  const countsRadixSort = (
    arr: T[],
    significantDigit: number,
    getValue: (a: T) => number,
    isAsc = true
  ) => {
    const radixs: T[][] = [];
    arr.forEach((val) => {
      const realValue = getValue(val);
      const absValue = Math.abs(realValue);
      let i = Math.floor((absValue / significantDigit) % 10);

      // 将负数保存到数组索引10-19的十个桶中
      if (realValue < 0) {
        i += 10;
      }

      if (!radixs[i]) {
        radixs[i] = [];
      }
      radixs[i].push(val);
    });

    const results: T[] = [];
    radixs.forEach((val, i) => {
      if (isAsc) {
        if (i < 10) {
          results.push(...val);
          return;
        }
  
        // 将负数插入数组前面
        results.unshift(...val);
        return;
      }

      if (i < 10) {
        results.unshift(...val);
        return;
      }

      // 将负数插入数组前面
      results.push(...val);
    });

    return results;
  };

  let max = getValue(
    arr.reduce((a, b) => (getValue(a) > getValue(b) ? a : b))
  );

  let significantDigit = 1;
  let newArr = arr;
  while (Math.abs(max / significantDigit) >= 1) {
    newArr = countsRadixSort(newArr, significantDigit, getValue, isAsc);
    significantDigit *= 10;
  }

  return newArr;
}

const rarr = getChaoticArray(20, -100, 100);
const rres = radixSort(rarr, (a) => a, false);

console.log(rres);
