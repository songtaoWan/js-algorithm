class Queue<T = any> {
  private count: number
  private lowest: number
  private item: Record<string, T>

  constructor() {
    this.count = 0;
    this.lowest = 0;
    this.item = {};
  }

  enqueue(element: T) {
    this.item[this.count] = element;
    this.count++;
  }

  dequeue(){
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.item[this.lowest];
    delete this.item[this.lowest];
    this.lowest++;

    return value;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.item[this.lowest];
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count - this.lowest;
  }

  clear() {
    this.count = 0;
    this.lowest = 0;
    this.item = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    const item = this.item;
    const count = this.count;
    const lowest = this.lowest;

    let str = String(item[lowest]);
    for (let i = lowest + 1; i < count; i++) {
      str = `${str}, ${String(item[i])}`;
    }

    return str;
  }
}

const test1 = new Queue<string>();
test1.enqueue('wst');
test1.enqueue('1');
console.log(test1.peek());
console.log('--------');

console.log(test1.dequeue());
console.log(test1.toString());
