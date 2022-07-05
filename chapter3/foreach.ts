/**
 * 为数组中的每一项有效值执行一次callback函数
 * @param arr 
 * @param callback 
 * @returns 
 */
const foreach = <T = any>(arr: T[], callback: (element: T, index?: number, array?: T[]) => void) => {
  const len = arr.length;

  if (len === 0) {
    return;
  }

  let k = 0;
  do {
    if (arr[k] === undefined) {
      k++;
      continue;
    }

    callback(arr[k], k, arr);
    k++;
  } while(k < len);
};

foreach([1, 2, 3], (val) => console.log(val));
