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

  /**
   * 搜索节点
   * @param node 开始节点
   * @param value 需要搜索的节点的值
   * @returns 
   */
  private searchNode (node: Node<T>, value: T): Node<T> | null {
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
      return null;
    }

    return this.searchNode(nextNode, value);
  };

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
      return null;
    }

    return this.searchNode(this.root, key);
  }

  /**
   * 中序遍历：遍历左子树 => 访问根节点 => 遍历右子树
   * @param callback 需要对遍历到的节点的键进行的操作
   */
  inOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    if (this.root === null) {
      return;
    }

    const inOrderTraverseNode = (
      node: Node<T> | null,
      callback: (key: T) => void
    ) => {
      if (node === null) {
        return;
      }

      inOrderTraverseNode(node.left as Node<T>, callback);
      callback(node.key);
      inOrderTraverseNode(node.right as Node<T>, callback);
    };

    inOrderTraverseNode(this.root, callback);
  }

  /**
   * 先序遍历：访问根节点 => 遍历左子树 => 遍历右子树
   * @param callback 需要对遍历到的节点的键进行的操作
   */
  preOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    if (this.root === null) {
      return;
    }

    const preOrderTraverseNode = (
      node: Node<T> | null,
      callback: (key: T) => void
    ) => {
      if (node === null) {
        return;
      }

      callback(node.key);
      preOrderTraverseNode(node.left as Node<T>, callback);
      preOrderTraverseNode(node.right as Node<T>, callback);
    };

    preOrderTraverseNode(this.root, callback);
  }

  /**
   * 后序遍历：遍历左子树 => 遍历右子树 => 访问根节点
   * @param callback 需要对遍历到的节点的键进行的操作
   */
  postOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    if (this.root === null) {
      return;
    }

    const postOrderTraverseNode = (
      node: Node<T> | null,
      callback: (key: T) => void
    ) => {
      if (node === null) {
        return;
      }

      postOrderTraverseNode(node.left as Node<T>, callback);
      postOrderTraverseNode(node.right as Node<T>, callback);
      callback(node.key);
    };

    postOrderTraverseNode(this.root, callback);
  }

  private minNode(node: Node<T>) {
    while (node?.left !== null) {
      node = node?.left as Node<T>;
    }

    return node;
  }

  min() {
    if (this.root === null) {
      return undefined;
    }

    const node = this.minNode(this.root);
    return node.key;
  }

  max() {
    if (this.root === null) {
      return undefined;
    }

    let node: Node<T> | null = this.root;
    while (node?.right !== null) {
      node = node?.right as Node<T> | null;
    }

    return node.key;
  }

  /**
   * 获取某个节点下的所有节点的键，默认包含自身
   * @param begNode 开始节点
   * @returns 返回一个二维数组，索引代表层级，每一层都是全部的节点，不存在用空字符串表示
   */
  getAllNodes(begNode: Node<T> | null = this.root) {
    const treeNodes: (T | string)[][] = [];
    if (begNode === null) {
      return treeNodes;
    }

    const traverse = (node: Node<T> | null, layer = 0) => {
      if (node === null) {
        if (Array.isArray(treeNodes[layer])) {
          treeNodes[layer].push('');
        } else {
          treeNodes[layer] = [''];
        }
        return;
      }

      if (Array.isArray(treeNodes[layer])) {
        treeNodes[layer].push(node.key);
      } else {
        treeNodes[layer] = [node.key];
      }

      layer++;
      traverse(node.left as Node<T>, layer);
      traverse(node.right as Node<T>, layer);
    };
    traverse(begNode);
    treeNodes.splice(treeNodes.length - 1, 1);

    // 处理每层数据量不对的问题
    treeNodes.forEach((item, index) => {
      if (item.length === Math.pow(2, index)) {
        return;
      }

      treeNodes[index - 1].forEach((val, key) => {
        if (val !== '') {
          return;
        }

        treeNodes[index].splice(key + 1, 0, '', '');
      });
    });

    return treeNodes;
  }

  remove(key: T) {
    const removeNode = (node: Node<T> | null, value: T): Node<T> | null => {
      if (node === null) {
        return null;
      }

      if (node.key === value) {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          return node.right as Node<T>;
        }

        if (node.right === null) {
          return node.left as Node<T>;
        }


      }

      if (this.compareFn(value, node.key)) {
        node.right = removeNode(node.right as Node<T>, value);
      } else {
        node.left = removeNode(node.left as Node<T>, value);
      }

      return node;
    };

    this.root = removeNode(this.root, key);
  }

  toString(transformFn = (key: T | string) => `${key}`) {
    const nodes = this.getAllNodes();
    if (nodes.length === 0) {
      return '';
    }

    const spacing = 4;
    const maxSpaceNum = (2 ** (nodes.length - 1) + 1) * spacing;
    const maxStrLen = nodes[nodes.length - 1].reduce((a: number, b) => {
      const bLen = transformFn(b).length;

      return a + bLen;
    }, 0);

    return nodes
      .map((item, idx) => {
        let len = 0;
        const arr = item.map((value, key) => {
          if (value === '') {
            len += 1;
            return ' ';
          }

          const val = transformFn(value);
          len += val.length;
          return val;
        });

        const splitNum = 2 ** idx + 1;
        const gaps = new Array(Math.ceil((maxSpaceNum + maxStrLen - len) / splitNum));
        gaps.fill(' ');
        const gap = gaps.join('');

        return `${gap}${arr.join(gap)}${gap}\n`;
      })
      .join('');
  }
}

const tree = new BinarySearchTree<number>();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// console.log(tree);
console.log(tree.toString());
// console.log(tree.min());

// tree.remove(12);
// console.log(tree.toString());
// console.log(tree.getAllNodes());
// tree.postOrderTraverse()
