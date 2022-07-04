/**
 * 为数组中的每个元素调用一次callback函数，并返回一个包含所有使callback返回true或等价于true的元素的新数组。
 * 对于那些已经被删除或者从未被赋值的索引不会调用callback。
 * @param arr 
 * @param callback 
 * @returns 
 */
const filter = <T = any>(arr: T[], callback: (element: T, index?: number, array?: T[]) => boolean) => {
  const passArr: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined) {
      continue;
    }

    const res = callback(arr[i], i, arr);
    if (res) {
      passArr.push(arr[i]);
    }
  }

  return passArr;
};

const tempArr = [1, 3, 5, 7];
tempArr[13] = 9;
const filterRes = filter(tempArr, (val, idx, arr) => {
  console.log('---', idx, (arr as number[])[idx as number]);
  
  return val > 3;
});
console.log(tempArr, filterRes);
