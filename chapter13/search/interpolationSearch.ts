/**
 * 比较函数，等于返回1，大于返回2，小于返回0
 * @param a
 * @param b
 * @returns
 */
function compares<T = unknown>(a: T, b: T) {
  if (a === b) {
    return 1;
  } else if (a > b) {
    return 2;
  } else {
    return 0;
  }
}

/**
 * 内插搜索算法
 * @param arr 已排序数组
 * @param value 
 * @param getValue 
 * @param compareFn 
 * @returns 
 */
function interpolationSearch<T = unknown>(
  arr: T[],
  value: T,
  getValue: (a: T) => number,
  compareFn = compares
) {
  const length = arr.length;
  if (!length) {
    return -1;
  }

  let begin = 0;
  let end = length - 1;

  /**
   * 比例：(搜索的值 - 数组最小值) / (数组最大值 - 数组最小值)
   * 根据这个比例可以知道搜索的值更靠近最小值还是最大值
   */
  let delta =
    (getValue(value) - getValue(arr[begin])) /
    (getValue(arr[end]) - getValue(arr[begin]));

  while (delta >= 0 && delta <= 1) {
    const position = begin + Math.floor(delta * (end - begin));

    const result = compareFn(value, arr[position]);
    if (result === 1) {
      return position;
    }

    delta =
      (getValue(value) - getValue(arr[begin])) /
      (getValue(arr[end]) - getValue(arr[begin]));

    if (result === 0) {
      // 搜索的值较小
      end = position - 1;
    } else {
      begin = position + 1;
    }
  }

  return -1;
}

const arr1 = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 9, 10];
const idx = interpolationSearch(arr1, -1, (a) => a);
console.log(idx);
