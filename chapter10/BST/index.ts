/**
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。
 * 二叉搜索树：二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
 */

import Node from '../node';
import compare from '../compare';

class BinarySearchTree<T = unknown> {
  private root: Node<T> | null;
  private compareFn: (a: T, b: T) => boolean;

  constructor(compareFn = compare) {
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(key: T) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }

    const insertNode = (node: Node<T>, value: T): void => {
      // 保存下一个节点，用来实现尾调用优化
      let nextNode: Node<T> | null = null;

      // 大的值存入右节点
      if (this.compareFn(value, node.key)) {
        if (node.right === null) {
          node.right = new Node(value);
          return;
        }

        // 右节点不为空，保存当前右节点，继续查找其子节点
        nextNode = node.right as Node<T>;
      } else {
        if (node.left === null) {
          node.left = new Node(value);
          return;
        }

        nextNode = node.left as Node<T>;
      }

      return insertNode(nextNode, value);
    };

    insertNode(this.root as Node<T>, key);
  }

  search(key: T) {
    if (this.root === null) {
      return undefined;
    }

    const searchNode = (node: Node<T>, value: T): Node<T> | undefined => {
      if (node.key === value) {
        return node;
      }

      let nextNode: Node<T> | null = null;
      if (this.compareFn(value, node.key)) {
        nextNode = node.right as Node<T>;
      } else {
        nextNode = node.left as Node<T>;
      }

      if (nextNode === null) {
        return undefined;
      }

      return searchNode(nextNode, value);
    };

    return searchNode(this.root, key);
  }

  /**
   * 中序遍历：遍历左子树 => 访问根节点 => 遍历右子树
   * @param callback 需要对遍历到的节点的键进行的操作
   */
  inOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    if (this.root === null) {
      return;
    }

    const inOrderTraverseNode = (node: Node<T> | null, callback: (key: T) => void) => {
      if (node === null) {
        return;
      }

      inOrderTraverseNode(node.left as Node<T>, callback);
      callback(node.key);
      inOrderTraverseNode(node.right as Node<T>, callback);
    };

    inOrderTraverseNode(this.root, callback);
  }
}

const tree = new BinarySearchTree<number>();
tree.insert(10);
tree.insert(4);
tree.insert(12);
tree.insert(3);
console.log(tree);
tree.inOrderTraverse();

