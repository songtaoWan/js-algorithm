export default class Node<T = unknown> {
  key: T;
  left: Node | null;
  right: Node | null;

  constructor(key: T) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}