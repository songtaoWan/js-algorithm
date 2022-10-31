import { getChaoticArray } from './test';
import insertionSort from './insertionSort';
/**
 * 桶排序：分布式排序算法，将元素分为不同的桶（较小的数组），再对每个桶使用一个简单的排序算法排序，
 * 然后，将所有的桶合并为结果数组。
 * 插入排序用来排序小数组较为不错。
 */
/**
 * 桶排序，不改变原数组
 * @param arr 
 * @param getValue 获取每个元素用来排序的值
 * @param bucketSize 每个桶的大小，默认5
 * @param isAsc 是否升序，默认是
 * @returns 
 */
export default function bucketSort<T = unknown>(
  arr: T[],
  getValue: (a: T) => number,
  bucketSize: number = 5,
  isAsc = true
) {
  if (arr.length < 2) {
    return arr;
  }
  if (bucketSize <= 0) {
    bucketSize = 5;
  }
  if (~~bucketSize !== bucketSize) {
    bucketSize = bucketSize | 0;
  }

  const createBucket = (
    arr: T[],
    getValue: (a: T) => number,
    bucketSize: number = 5
  ) => {
    let min = getValue(arr[0]);
    arr.forEach((val) => {
      const realValue = getValue(val);

      if (realValue < min) {
        min = realValue;
        return;
      }
    });

    const buckets: T[][] = [];
    arr.forEach((val) => {
      // 计算元素该放入哪个桶
      const i = Math.floor((getValue(val) - min) / bucketSize);

      if (!buckets[i]) {
        buckets[i] = [];
      }

      buckets[i].push(val);
    });

    return buckets;
  };

  const buckets = createBucket(arr, getValue, bucketSize);
  const newArr: T[] = [];
  buckets.forEach((val) => {
    if (!isAsc) {
      insertionSort(val, (a, b) => getValue(a) < getValue(b));
      newArr.unshift(...val);
      return;
    }

    insertionSort(val, (a, b) => getValue(a) > getValue(b));
    newArr.push(...val);
  });

  return newArr;
}

const barr = getChaoticArray(20, 0);
const bres = bucketSort(barr, (a) => a, 4);

console.log(bres);
