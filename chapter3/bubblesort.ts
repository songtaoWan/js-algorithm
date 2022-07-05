/**
 * 数组的sort方法实现，采用冒泡排序算法
 * @param arr 
 * @param compare 
 * @returns 
 */
const sort = <T = number>(arr: T[], compare?: (a: T, b: T) => number) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (typeof compare === 'function') {
        const res = compare(arr[j], arr[j + 1]);

        if (res > 0) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }

        continue;
      }

      if (String(arr[j]) > String(arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
};

const arr1 = [23, 9, 0, 10, 'a', 'A', true, null, { a: 1 }, { a: 0 }];
const sortRes1 = sort(arr1);
console.log(sortRes1);

const arr2 = [9, 2, 0, 8, 21, 11, 3, 28, 18, 10];
const res2 = sort(arr2, (a, b) => b - a);
console.log(res2);

