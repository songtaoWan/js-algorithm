class MaxHeap<T = unknown> {
  private heap: T[];
  private compare: (a: T, b: T) => boolean;

  constructor(defaultCompare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = defaultCompare || MaxHeap.compareFn;
  }

  /**
   * 默认的比较节点大小函数，a大于b返回true
   * @param a
   * @param b
   * @returns
   */
  private static compareFn(a: any, b: any) {
    return a > b;
  }

  /**
   * 获取节点的左侧子节点的位置
   * @param idx 节点位置
   * @returns
   */
  private getLeftIdx(idx: number) {
    return idx * 2 + 1;
  }

  /**
   * 获取节点的右侧子节点的位置
   * @param idx 节点位置
   * @returns
   */
  private getRightIdx(idx: number) {
    return idx * 2 + 2;
  }

  /**
   * 根据子节点的位置得到父节点的位置
   * @param idx 子节点位置
   * @returns
   */
  private getParentNodeIdx(idx: number) {
    if (idx === 0) {
      return undefined;
    }

    return Math.floor((idx - 1) / 2);
  }

  /**
   * 上移操作：插入节点后保证最大堆的特性（所有的节点都大于等于它的子节点）
   * @param idx 插入节点的位置
   */
  private siftUp(idx: number) {
    let tempIdx = idx;
    let parentIdx = this.getParentNodeIdx(tempIdx);

    while (
      parentIdx !== undefined &&
      this.compare(this.heap[tempIdx], this.heap[parentIdx])
    ) {
      [this.heap[tempIdx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[tempIdx]
      ];

      tempIdx = parentIdx;
      parentIdx = this.getParentNodeIdx(tempIdx);
    }
  }

  /**
   * 下移操作：移除最大值后，保证二叉堆的特性
   */
  private siftDown(idx: number = 0): void {
    // 先找到左右子节点哪个更大，再交换位置，重复此操作
    let maxIdx = idx;
    const leftIdx = this.getLeftIdx(idx);
    const rightIdx = this.getRightIdx(idx);

    if (
      leftIdx < this.heap.length &&
      this.compare(this.heap[leftIdx], this.heap[maxIdx])
    ) {
      maxIdx = leftIdx;
    }

    if (
      rightIdx < this.heap.length &&
      this.compare(this.heap[rightIdx], this.heap[maxIdx])
    ) {
      maxIdx = rightIdx;
    }

    if (maxIdx === idx) {
      return;
    }

    [this.heap[idx], this.heap[maxIdx]] = [this.heap[maxIdx], this.heap[idx]];
    return this.siftDown(maxIdx);
  }

  /**
   * 查找最大值并返回
   * @returns
   */
  findMaximum() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  insert(value: T) {
    if (this.isEmpty()) {
      this.heap.push(value);
      return;
    }

    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * 移除最大值并返回
   */
  extract() {
    if (this.heap.length === 0) {
      return undefined;
    }

    if (this.heap.length <= 2) {
      return this.heap.shift();
    }

    const backVal = this.heap.shift();
    this.heap.unshift(this.heap.pop() as T);
    this.siftDown();
    return backVal;
  }

  toString(nodeToString: (key: T) => string = (key) => `${key}`) {
    if (this.heap.length === 0) {
      return '';
    }

    const twoArr: string[][] = [];
    this.heap.forEach((value, idx) => {
      const str = nodeToString(value);
      if (idx === 0) {
        twoArr.push([str]);
        return;
      }

      const lastIdx = twoArr.length - 1;
      if (twoArr[lastIdx].length === 2 ** lastIdx) {
        twoArr.push([]);
      }

      twoArr[twoArr.length - 1].push(str);
    });

    return twoArr
      .map((val, idx) => {
        return `第${idx + 1}层：${val.join(' -- ')}`;
      })
      .join('\n');
  }
}

const heap = new MaxHeap();
const nums = [18, 10, 20, 3, 8, 29, 11, 9];
nums.forEach((val) => {
  heap.insert(val)
})

console.log(heap.toString());
console.log(heap.extract());
console.log(heap.toString());
