// 数组的concat方法实现

/**
 * 返回一个新数组，不改变原数组。浅拷贝数组元素。
 * @param arr1 
 * @param arr2 
 */
const concat = <T = any, U = any>(arr1: T[], arr2: U[]) => {
  return [...arr1, ...arr2];
};

const concat_old = <T, U>(arr1: T[], arr2: U[]) => {
  const arr: (T | U)[] = [];

  for (let i = 0; i < arr1.length; i++) {
    arr.push(arr1[i]);
  }

  for (let i = 0; i < arr2.length; i++) {
    arr.push(arr2[i]);
  }

  return arr;
}

const a = [1, 2, 3];
const b = ['w', 's', 't'];

const res = concat_old(a, b);
console.log(res);
