// 斐波那契数列 0 1 1 2 3 5 8 13 ...
// 位置0的斐波那契数为0，1和2位置的斐波那契数都是1
// n(n > 2)的斐波那契数是(n - 1)的斐波那契数加上(n - 2)的斐波那契数

/**
 * 递归求斐波那契数
 * @param index 位置
 * @returns 
 */
function fibonacciRecursion(index: number): number {
  if (index < 1) {
    return 0;
  }

  index = index | 0;
  if (index <= 2) {
    return 1;
  }

  return fibonacciRecursion(index - 1) + fibonacciRecursion(index - 2);
}

const fi1 = fibonacciRecursion(6);
console.log(fi1);

/**
 * 动态规划求斐波那契数
 * @param idx 位置
 * @returns 
 */
function fibonacciIterative(idx: number): number {
  if (idx < 1) {
    return 0;
  }

  idx = idx | 0;
  if (idx <= 2) {
    return 1;
  }

  let fibN1 = 1;
  let fibN2 = 1;
  for(let i = 3; i <= idx; i++) {
    [fibN1, fibN2] = [fibN2, fibN1 + fibN2];
  }

  return fibN2;
}

const fi2 = fibonacciIterative(7);
console.log(fi2);

/**
 * 记忆化斐波那契数
 * @param n 位置
 * @returns 
 */
function fibonacciMemoization(n: number): number {
  if (n < 1) {
    return 0;
  }

  n = n | 0;
  const arr = [0, 1];
  const fibonacci = (n: number): number => {
    if (arr[n] != undefined) {
      return arr[n];
    }

    return arr[n] = fibonacci(n - 1) + fibonacci(n - 2);
  };

  return fibonacci(n);
}

const fi3 = fibonacciMemoization(8);
console.log(fi3);

