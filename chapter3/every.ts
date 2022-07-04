type ICallback<T = any> = (element: T, idx?: number, arr?: T[]) => boolean

/**
 * 为数组中的每个元素执行一次callback函数，直到找到一个元素使callback返回falsy，则立即返回false，反之返回true。
 * 空数组返回true
 * @param arr 
 * @param callback 
 * @returns 
 */
const every = <T = any>(arr: T[], callback: ICallback<T>) => {
  if (arr.length === 0) {
    return true;
  }

  for (let i = 0; i < arr.length; i++) {
    const res = callback(arr[i], i, arr);

    if (!res) {
      return false;
    }
  }

  return true;
};

const test = every([1, 2, 3, 4, 5], (val) => val > 0);
console.log(test);

