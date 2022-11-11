/**
 * 找零问题
 * @param amount 金额
 * @param coins 面值
 * @returns 返回最优解，所需要的面值组合
 */
const minCoinChange = (amount: number, coins = [1, 2, 5, 10, 20, 0.1, 0.5]) => {
  const cache: number[][] = [];

  const makeChange = (value: number) => {
    if (!value) {
      return [];
    }
    if (cache[value]) {
      return cache[value];
    }

    /**
     * 保存当前值的最优拆分
     */
    let mins: number[] = [];

    /**
     * 保存子（当前值 - 当前面值）拆分的结果
     */
    let childMins: number[] = [];

    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      const newAmount = value - coin;

      if (newAmount >= 0) {
        // 保存下一步的拆分结果
        childMins = makeChange(newAmount);
      }

      // 值不为零且存在子拆分，并且子拆分加上当前面值小于存在的最小拆分结果
      if (
        newAmount > 0 &&
        childMins.length &&
        (!mins.length || childMins.length < mins.length - 1)
      ) {
        mins = [coin].concat(childMins);
      }

      // 值为零时，缓存结果并返回
      if (!newAmount) {
        cache[value] = [coin];
        return cache[value];
      }
    }

    cache[value] = mins;
    return cache[value];
  };

  return makeChange(amount);
};

/**
 * 贪心算法解法：从最大面额开始，拿尽可能多。无法再拿时，开始拿第二大的，依次继续。
 * 并不总是得到最优解，但简单、快速。
 * @param amount
 * @param coins
 * @returns
 */
const minCoinChangeGreedy = (amount: number, coins = [1, 2, 5, 10, 20]) => {
  const results: number[] = [];
  let total = 0;

  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];

    while (total + coin <= amount) {
      total += coin;
      results.push(coin);
    }
  }

  return results;
};

const res = minCoinChangeGreedy(25);
console.log(res);
