function factorial(n: number): number {
  if (n < 0) {
    throw new Error('负数没有阶乘');
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  return n * factorial(n - 1);
}

function factorialIterator(n: number): number {
  if (n < 0) {
    throw new Error('负数没有阶乘');
  }

  if (n === 0) {
    return 1;
  }

  let total = 1;
  while(n > 0) {
    total *= n;
    n--;
  }

  return total;
}

const fac1 = factorialIterator(5);
console.log(fac1);
const fac2 = factorialIterator(6);
console.log(fac2);
