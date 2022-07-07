/**
 * 双端队列
 */
class Deque<T = any> {
  private count: number
  private lowest: number
  private item: Record<string, T>

  constructor() {
    this.count = 0;
    this.lowest = 0;
    this.item = {};
  }

  size() {
    return this.count - this.lowest;
  }

  isEmpty() {
    return this.size() === 0;
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

    const count = this.count;
    const lowest = this.lowest;
    const item = this.item;

    let str = String(item[lowest]);
    for (let i = lowest + 1; i < count; i++) {
      str = `${str}, ${String(item[i])}`;
    }

    return str;
  }

  addFront(element: T) {
    this.lowest--;
    this.item[this.lowest] = element;
  }

  addBack(element: T) {
    this.item[this.count] = element;
    this.count++;
  }

  removeFront() {
    const value = this.item[this.lowest];
    delete this.item[this.lowest];
    this.lowest++;

    return value;
  }

  removeBack() {
    const value = this.item[this.count - 1];
    delete this.item[this.count - 1];
    this.count--;

    return value;
  }

  peekFront() {
    return this.item[this.lowest];
  }

  peekBack() {
    return this.item[this.count - 1];
  }
}

const deques = new Deque<string>();

console.log(deques.isEmpty(), deques.size());

deques.addBack('wst');
deques.addFront('lst');
deques.addFront('st');
console.log(deques.removeBack(), deques.removeFront());

console.log(deques.toString());
console.log(deques.isEmpty(), deques.size(), deques);
