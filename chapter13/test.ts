/**
 * 测试排序算法
 */

/**
 * a大于b返回true
 * @param a 
 * @param b 
 * @returns 
 */
export const compare = <T = unknown>(a: T, b: T) => {
  return a > b;
};

/**
 * 生成一个没有重复元素乱序数组，如果最大值与最小值的差小于要求的数组长度，则最大值修改为最大值+长度
 * @param len 数组长度，默认 10
 * @param min 默认 10
 * @param max 默认 100
 * @returns 
 */
export const getChaoticArray = (len = 10, min = 10, max = 100) => {
  if (len < 0) {
    len = Math.abs(len);
  }
  if (~~len !== len) {
    len = len | 0;
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  if (max - min < len) {
    max += len;
  }

  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    do {
      const randomNum = Math.floor(Math.random() * (max - min) + min);
      if (!arr.includes(randomNum)) {
        arr.push(randomNum);
        break;
      }
    } while(true);
  }

  return arr;
};