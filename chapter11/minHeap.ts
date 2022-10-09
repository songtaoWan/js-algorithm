class MinHeap<T = unknown> {
  heap: T[];
  private compare: (a: T, b: T) => boolean;

  constructor(defaultCompare?: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = defaultCompare || this.compareFn;
  }

  /**
   * 默认的比较节点大小函数，a大于b返回true
   * @param a 
   * @param b 
   * @returns 
   */
  private compareFn(a: T, b: T) {
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
   * 上移操作：插入节点后保证最小堆的特性（所有的节点都小于等于它的子节点）
   * @param idx 插入节点的位置
   */
  private siftUp(idx: number) {
    let tempIdx = idx;
    let parentIdx = this.getParentNodeIdx(tempIdx);

    while(parentIdx !== undefined && this.compare(this.heap[parentIdx], this.heap[tempIdx])) {
      [this.heap[tempIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[tempIdx]];

      tempIdx = parentIdx;
      parentIdx = this.getParentNodeIdx(tempIdx);
    }
  }

  /**
   * 下移操作：移除最小值后，保证二叉堆的特性
   */
  private siftDown(idx: number = 0) {
    const leftIdx = this.getLeftIdx(idx);
    const rightIdx = this.getRightIdx(idx);

    if (this.compare(this.heap[idx], this.heap[leftIdx])) {
      [this.heap[idx], this.heap[leftIdx]] = [this.heap[leftIdx], this.heap[idx]];
      this.siftDown(leftIdx);
    }

    if (this.compare(this.heap[idx], this.heap[rightIdx])) {
      [this.heap[idx], this.heap[rightIdx]] = [this.heap[rightIdx], this.heap[idx]];
      this.siftDown(rightIdx);
    }
  }

  /**
   * 查找最小值并返回
   * @returns 
   */
  findMinimum() {
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
      return true;
    }

    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
    return true;
  }

  /**
   * 移除最小值并返回
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
}

const minheap = new MinHeap();
minheap.insert(1);
minheap.insert(2);
minheap.insert(3);
minheap.insert(4);
minheap.insert(5);
minheap.insert(6);
minheap.insert(7);
minheap.insert(8);
minheap.insert(9);

minheap.extract()
console.log(minheap.heap);

