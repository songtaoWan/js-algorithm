class Stack<T = any> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  push(element: T) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  clear() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }
}

const test = new Stack<number>();
test.push(1);

console.log(test.peek());
