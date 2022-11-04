/**
 * 比较函数，等于返回1，大于返回2，小于返回0
 * @param a
 * @param b
 * @returns
 */
function compare<T = unknown>(a: T, b: T) {
  if (a === b) {
    return 1;
  } else if (a > b) {
    return 2;
  } else {
    return 0;
  }
}

/**
 * 二分查找
 * @param arr 已排序数组
 * @param searchValue
 * @param compareFn 比较函数，等于 1，小于 0，大于 2
 * @returns
 */
function binarySearch<T = unknown>(
  arr: T[],
  searchValue: T,
  compareFn = compare
) {
  const length = arr.length;
  if (!length) {
    return -1;
  }

  let beg = 0;
  let end = length - 1;

  while (true) {
    const middle = Math.floor((beg + end) / 2);
    const result = compareFn(searchValue, arr[middle]);

    // 相等
    if (result === 1) {
      return middle;
    }

    // 搜索的值小于中间值，继续查找左边子数组
    if (result === 0 && middle !== beg) {
      end = middle - 1;
      continue;
    }

    // 搜索的值大于中间值，继续查找右边子数组
    if (result === 2 && middle !== end) {
      beg = middle + 1;
      continue;
    }

    return -1;
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const index = binarySearch(arr, 2);

console.log(index);
