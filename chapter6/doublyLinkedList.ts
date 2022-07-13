// 双向链表
class DoublyNode<T = any> {
  value: T;
  prev: DoublyNode<T> | null;
  next: DoublyNode<T> | null;

  constructor(element: T) {
    this.value = element;
    this.prev = null;
    this.next = null;
  }
}

export class DoublyLinkedList<T = any> {
  private head: DoublyNode<T> | null;
  private tail: DoublyNode<T> | null;
  private count: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  private isEqual(a: T, b: T) {
    return a === b;
  }

  private addFirstNode(element: T) {
    const node = new DoublyNode(element);
    this.head = node;
    this.tail = this.head;
    this.count++;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  size() {
    return this.count;
  }

  isEmpty() {
    return this.size() === 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }

    let current = this.head as DoublyNode<T>;
    let str = String(current.value);
    do {
      const node = current.next;
      if (node === null) {
        break;
      }

      str = `${str} => ${String(node.value)}`;
      current = node;
    } while (current.next !== null);

    return str;
  }

  /**
   * 在链表中查找元素，返回索引，没有找到则返回-1
   * @param element
   * @param compare 比较函数，不传则用全等(===)比较两个元素是否相等
   * @returns
   */
  indexOf(element: T, compare: (a: T, b: T) => boolean = this.isEqual) {
    if (this.isEmpty()) {
      return -1;
    }

    const loop = this.count;
    let node = this.head;
    for (let i = 0; i < loop && node !== null; i++) {
      if (compare(element, node.value)) {
        return i;
      }

      node = node.next;
    }

    return -1;
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
      return this.head as DoublyNode<T>;
    }

    if (index === this.count - 1) {
      return this.tail as DoublyNode<T>;
    }

    if (index <= this.count / 2) {
      let current = this.head as DoublyNode<T>;
      // 这里的i仅用作循环次数之用
      for (let i = 0; i < index; i++) {
        current = current.next as DoublyNode<T>;
      }

      return current;
    }

    let current = this.tail as DoublyNode<T>;
    let count = this.count - 1;
    while(count > index) {
      current = current.prev as DoublyNode<T>;
      count--;
    }

    return current;
  }

  /**
   * 向链表尾部添加一个新元素
   * @param element
   * @returns
   */
  push(element: T) {
    if (this.isEmpty()) {
      this.addFirstNode(element);
      return;
    }

    const node = new DoublyNode(element);
    const tail = this.tail as DoublyNode<T>;

    tail.next = node;
    node.prev = tail;
    this.tail = node;
    this.count++;
  }

  /**
   * 向链表的特定位置插入一个新元素
   * 空链表或插入位置超出链表长度，则插入尾部
   * 原理：将前一个位置节点的next指针指向新节点，新节点的next指针指向原来位置的节点
   * @param element
   * @param index 索引，从0开始
   */
  insert(element: T, index: number) {
    if (this.isEmpty() || index >= this.count) {
      this.push(element);
      return;
    }

    if (index === 0) {
      const node = new DoublyNode(element);
      const head = this.head as DoublyNode;

      node.next = head;
      head.prev = node;
      this.head = node;
      this.count++;
      return;
    }

    const current = this.getElementAt(index) as DoublyNode;
    const node = new DoublyNode(element);
    const previous = current.prev as DoublyNode;

    node.next = current;
    node.prev = previous;
    previous.next = node;
    this.count++;
  }

  /**
   * 从链表的特定位置移除一个元素并返回
   * @param index
   * @returns
   */
  removeAt(index: number) {
    if (this.isEmpty() || index >= this.count) {
      return undefined;
    }

    while (index < 0) {
      index += this.count;
    }

    if (index === 0) {
      const head = this.head as DoublyNode<T>;

      if (this.count === 1) {
        this.clear();
      } else {
        this.head = head.next as DoublyNode<T>;
        this.head.prev = null;
        this.count--;
      }

      return head;
    }

    if (index === this.count - 1) {
      const tail = this.tail as DoublyNode<T>;

      this.tail = tail.prev as DoublyNode<T>;
      this.tail.next = null;
      this.count--;
      return tail;
    }

    const current = this.getElementAt(index) as DoublyNode<T>;
    const previous = current.prev as DoublyNode<T>;

    previous.next = current.next;
    (current.next as DoublyNode<T>).prev = previous;
    this.count--;
    return current;
  }

  /**
   * 从链表中移除一个元素
   * @param element
   * @param compare 比较函数，不传则用全等(===)比较两个元素是否相等
   * @returns
   */
  remove(element: T, compare: (a: T, b: T) => boolean = this.isEqual) {
    if (this.isEmpty()) {
      return;
    }

    const idx = this.indexOf(element, compare);
    if (idx === -1) {
      return;
    }

    this.removeAt(idx);
  }
}

const list1 = new DoublyLinkedList<string>();
list1.insert('first', 0);
list1.push('wst');
list1.push('lst');
list1.push('pwj');
list1.push('abr');

list1.insert('hi', 1);
list1.insert('hello', 3);

console.log(list1.toString());
console.log('--------');
console.log(list1.getElementAt(4)?.value);
