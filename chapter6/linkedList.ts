class Nodes<T = any> {
  value: T;
  next: Nodes | null;

  constructor(element: T) {
    this.value = element;
    this.next = null;
  }
}

export class LinkedList<T = any> {
  private head: Nodes<T> | null;
  private tail: Nodes<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  private isEqualNode(a: T, b: T) {
    return a === b;
  }

  private removeHead() {
    const head = this.head as Nodes<T>;
    const value = head.value;

    if (this.count === 1) {
      this.clear();
      return value;
    }

    this.head = head.next;
    this.count--;
    return value;
  }

  private removeTail() {
    const idx = this.count - 1;
    const previous = this.getElementAt(idx - 1) as Nodes<T>;
    const value = (this.tail as Nodes<T>).value;

    previous.next = null;
    this.tail = previous;
    this.count--;
    return value;
  }

  private removeHeadToTail(index: number) {
    const previous = this.getElementAt(index - 1) as Nodes<T>;
    const current = previous.next as Nodes<T>;

    previous.next = current.next;
    this.count--;
    return current.value;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  getHead() {
    return this.head;
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element
   * @returns
   */
  push(element: T) {
    const strategy = {
      addFirst: () => {
        const node = new Nodes(element);

        this.head = node;
        this.tail = this.head;
        this.count++;
      },
      addBack: () => {
        const node = new Nodes(element);
        const tail = this.tail as Nodes;

        tail.next = node;
        this.tail = node;
        this.count++;
      }
    };

    if (this.isEmpty()) {
      return strategy.addFirst();
    }

    return strategy.addBack();
  }

  /**
   * 获取链表中特定位置的元素
   * @param index 索引，从0开始
   * @returns
   */
  getElementAt(index: number) {
    if (this.isEmpty() || index >= this.count) {
      return undefined;
    }

    while (index < 0) {
      index += this.count;
    }

    if (index === 0) {
      return this.head as Nodes<T>;
    }

    if (index === this.count - 1) {
      return this.tail as Nodes<T>;
    }

    let current = this.head as Nodes<T>;
    // 这里的i仅用作循环次数之用
    for (let i = 0; i < index; i++) {
      current = current.next as Nodes<T>;
    }

    return current;
  }

  /**
   * 向链表的特定位置插入一个新元素
   * 空链表或插入位置超出链表长度，则插入尾部
   * 原理：将前一个位置节点的next指针指向新节点，新节点的next指针指向原来位置的节点
   * @param element
   * @param index 索引，从0开始
   */
  insert(element: T, index: number) {
    // 空链表或插入位置超出链表长度，则向链表尾部添加一个新元素
    if (this.isEmpty() || index >= this.count) {
      this.push(element);
      return;
    }

    while (index < 0) {
      index += this.count;
    }

    const strategy = {
      addFront: () => {
        const node = new Nodes(element);

        node.next = this.head;
        this.head = node;
        this.count++;
      },
      addFrontToBack: () => {
        const node = new Nodes(element);

        // 找到插入位置的前一个位置的节点
        const previous = this.getElementAt(index - 1) as Nodes<T>;

        // 将原位置的节点保存到新添加节点的next属性中
        const current = previous.next;
        node.next = current;

        // 将节点添加到链表中
        previous.next = node;
        this.count++;
      }
    };

    if (index === 0) {
      return strategy.addFront();
    }

    return strategy.addFrontToBack();
  }

  /**
   * 在链表中查找元素，返回索引，没有找到则返回-1
   * @param element
   * @param compare 比较函数，不传则用全等(===)比较两个元素是否相等
   * @returns
   */
  indexOf(element: T, compare: (a: T, b: T) => boolean = this.isEqualNode) {
    if (this.isEmpty()) {
      return -1;
    }

    const count = this.count;
    let current = this.head as Nodes<T>;
    for (let i = 0; i < count; i++) {
      if (compare(element, current.value)) {
        return i;
      }

      current = current.next as Nodes<T>;
    }

    return -1;
  }

  /**
   * 从链表中移除一个元素
   * @param element
   * @param compare 比较函数，不传则用全等(===)比较两个元素是否相等
   * @returns
   */
  remove(element: T, compare: (a: T, b: T) => boolean = this.isEqualNode) {
    if (this.isEmpty()) {
      return;
    }

    const idx = this.indexOf(element, compare);
    if (idx === -1) {
      return;
    }

    this.removeAt(idx);
  }

  /**
   * 从链表的特定位置移除一个元素并返回
   * @param index 
   * @returns 
   */
  removeAt(index: number) {
    if (index >= this.count) {
      return undefined;
    }

    while(index < 0) {
      index += this.count;
    }

    if (index === 0) {
      return this.removeHead();
    }

    if (index === this.count - 1) {
      return this.removeTail();
    }

    return this.removeHeadToTail(index);
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    let current = this.head as Nodes<T>;
    let str = String(current.value);
    do {
      const node = current.next;
      if (node === null) {
        break;
      }

      str = `${str} => ${String(node.value)}`;
      current = node;
    } while(current.next !== null);

    return str;
  }
}

const list = new LinkedList<string>();
list.push('wst');
list.push('pwj');
list.push('lst');
list.push('hihi');

list.insert('hello', 1);
// console.log(list.remove('lst'));
console.log(list.toString());

console.log('--------');
console.log(list);
