/**
 * 洗牌算法
 * @param arr 
 * @returns 
 */
function shuffle<T = unknown>(arr: T[]) {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }

  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * (length - i) + i);

    [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]];
  }

  return arr;
}

const arrs = [1, 2, 3, 4, 6, 8, 9];
console.log(shuffle(arrs));
