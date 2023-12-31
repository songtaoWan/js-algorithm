/**
 * 堆排序，改变原数组
 * @param arr 待排序数组
 * @param compareFn 比较函数: a > b 升序(构建最大堆)，b > a 降序(构建最小堆)
 * @returns 
 */
function heapSort<T = unknown>(arr: T[], compareFn: (a: T, b: T) => boolean) {
  /**
   * 通过下移操作堆化：找出自身节点和左右子节点中的最大/小节点，然后交换位置，保证自身大于等于或小于等于子节点
   * @param idx 需要堆化的节点位置
   * @param size 堆在数组中结束位置即堆的大小
   * @param simpleArr 完整数组
   */
  const siftDown = (idx: number, size: number, simpleArr: T[]) => {
    let tempIdx = idx;
    const leftIdx = tempIdx * 2 + 1;
    const rightIdx = tempIdx * 2 + 2;

    if (leftIdx < size && compareFn(simpleArr[leftIdx], simpleArr[tempIdx])) {
      tempIdx = leftIdx;
    }

    if (rightIdx < size && compareFn(simpleArr[rightIdx], simpleArr[tempIdx])) {
      tempIdx = rightIdx;
    }

    if (tempIdx === idx) {
      return;
    }

    [simpleArr[idx], simpleArr[tempIdx]] = [simpleArr[tempIdx], simpleArr[idx]];
  };

  const buildHeap = (len: number, arr: T[]) => {
    // 一个数组只需要通过下移 （堆的大小 - 1） / 2 次就可以完全堆化
    const begin = Math.floor((len - 1) / 2);
    for(let i = begin; i >= 0; i--) {
      siftDown(i, len, arr);
    }
  };

  let size = arr.length;
  while(size > 1) {
    buildHeap(size, arr);

    // 将堆的最大/小值和堆的最后一个元素交换位置，然后将堆的大小减一
    [arr[0], arr[size - 1]] = [arr[size - 1], arr[0]];
    size--;
  }

  return arr;
}

const numbers: number[] = [-2, 0, -1, 10, 100];
for(let i = 0; i < 20; i++) {
  const value = Math.floor(Math.random() * 100 + 1);
  numbers.push(value);
}

const list = heapSort(numbers, (a, b) => a > b);
console.log(list);

