import Node from '../node';

class AVLTree<T = unknown> {
  root: null | Node<T>;
  private compareFn: (a: T, b: T) => 1 | 0 | -1;

  constructor(compareFn?: (a: T, b: T) => 1 | 0 | -1) {
    this.root = null;
    this.compareFn = compareFn || this.defaultCompare;
  }

  /**
   * a大于b，返回1，等于返回0，小于返回-1
   * @param a
   * @param b
   * @returns
   */
  defaultCompare(a: T, b: T) {
    if (a === b) {
      return 0;
    }

    if (a > b) {
      return 1;
    }

    return -1;
  }

  private insertNode(node: Node<T>, key: T): void {
    let nextNode: Node<T> | null = null;

    // 需要插入的节点的值大于当前节点的值，较大的值总数保存在二叉树的右节点
    if (this.compareFn(key, node.key) === 1) {
      if (node.right === null) {
        node.right = new Node(key);
        return;
      }

      nextNode = node.right as Node<T>;
    } else {
      if (node.left === null) {
        node.left = new Node(key);
        return;
      }

      nextNode = node.left as Node<T>;
    }

    return this.insertNode(nextNode, key);
  }

  private minNode(node: Node<T>) {
    let min: Node<T> = node;
    while (min?.left !== null) {
      min = min?.left as Node<T>;
    }

    return min;
  }

  private removeNode(node: Node<T>, key: T): Node<T> | null {
    if (this.compareFn(key, node.key) === 1) {
      node.right = this.removeNode(node.right as Node<T>, key);
      return node;
    }

    if (this.compareFn(key, node.key) === -1) {
      node.left = this.removeNode(node.left as Node<T>, key);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.right === null) {
      return node.left as Node<T>;
    }

    if (node.left === null) {
      return node.right as Node<T>;
    }

    // 左右节点都存在，则将右子节点的最小节点移动到删除的节点的位置
    const right = node.right as Node<T>;
    const min = this.minNode(right).key;
    node.key = min;
    node.right = this.removeNode(right, min);
    return node;
  }

  preOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    const preTraverse = (node: Node<T> | null) => {
      if (node === null) {
        return;
      }

      callback(node.key);
      preTraverse(node.left as Node<T>);
      preTraverse(node.right as Node<T>);
    };

    preTraverse(this.root);
  }

  inOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    const inTraverse = (node: Node<T> | null) => {
      if (node === null) {
        return;
      }

      inTraverse(node.left as Node<T>);
      callback(node.key);
      inTraverse(node.right as Node<T>);
    };

    inTraverse(this.root);
  }

  postOrderTraverse(callback: (key: T) => void = (key) => console.log(key)) {
    const postTraverse = (node: Node<T> | null) => {
      if (node === null) {
        return;
      }

      postTraverse(node.left as Node<T>);
      postTraverse(node.right as Node<T>);
      callback(node.key);
    };

    postTraverse(this.root);
  }

  getNodeHeight(node: Node<T> | null) {
    const traverse = (node: Node<T> | null, layer = -1): number => {
      if (node === null) {
        return layer;
      }

      layer++;
      const left = traverse(node.left as Node<T>, layer);
      const right = traverse(node.right as Node<T>, layer);
      return Math.max(left, right);
    };

    return traverse(node);
  }

  /**
   * 获取左右子树高度差，左子树高返回正数，反之返回负数
   * @param node
   * @returns
   */
  getBalanceFactor(node: Node<T> | null) {
    if (node === null) {
      return 0;
    }

    return (
      this.getNodeHeight(node.left as Node<T>) -
      this.getNodeHeight(node.right as Node<T>)
    );
  }

  /**
   * 向右的单旋转：左侧子节点的高度大于右侧子节点的高度且左侧子节点也是平衡的或左侧较重的
   * @param node
   * @returns
   */
  private rotationLL(node: Node<T>) {
    /**
     * 1.将旧根节点的左侧子节点旋转为新根节点；
     * 2.将新根节点的右侧子节点赋值为旧根节点的左侧子节点；
     * 3.将旧根节点赋值为新根节点的右侧子节点。
     */
    const root = node.left as Node<T>;
    node.left = root.right;
    root.right = node;

    return root;
  }

  /**
   * 向左的单旋转：右侧子节点的高度大于左侧子节点的高度且右侧子节点也是平衡的或右侧较重的
   * @param node
   * @returns
   */
  private rotationRR(node: Node<T>) {
    /**
     * 1.将旧根节点的右侧子节点旋转为新根节点；
     * 2.将新根节点的左侧子节点赋值为旧根节点的右侧子节点；
     * 3.将旧根节点赋值为新根节点的左侧子节点。
     */
    const root = node.right as Node<T>;
    node.right = root.left;
    root.left = node;

    return root;
  }

  /**
   * 向右的双旋转：左侧子节点的高度大于右侧子节点，但左侧子节点右侧较重
   * @param node
   * @returns
   */
  private rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left as Node<T>);
    return this.rotationLL(node);
  }

  /**
   * 向左的双旋转：右侧子节点的高度大于左侧子节点的高度，但右侧子节点左侧较重
   * @param node
   * @returns
   */
  private rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right as Node<T>);
    return this.rotationRR(node);
  }

  private balanceTree(node: Node<T>, key?: T) {
    const balanceFactor = this.getBalanceFactor(node);
    // 左右子树高度差不超过1，平衡
    if (Math.abs(balanceFactor) <= 1) {
      return node;
    }

    // 左侧较重
    if (balanceFactor > 1) {
      // 插入的值如果大于左子节点的值，则代表该值将会插入到左子节点的右侧，所以左侧子节点的右侧较重
      if (
        key !== undefined &&
        this.compareFn(key, (node.left as Node<T>).key) === 1
      ) {
        return this.rotationLR(node);
      }

      // 如果左子树的左右子节点高度差为负值，则代表左子树的右侧较重，即左侧子节点的右侧较重
      if (this.getBalanceFactor(node.left as Node<T>) < 0) {
        return this.rotationLR(node);
      }

      return this.rotationLL(node);
    }

    // 插入的值如果小于右子节点的值，则代表该值将会插入到右子节点的左侧，所以右侧子节点的左侧较重
    if (
      key !== undefined &&
      this.compareFn(key, (node.right as Node<T>).key) === -1
    ) {
      return this.rotationRL(node);
    }

    // 如果右子树的左右子节点高度差为正值，则代表右子树的左侧较重，即右侧子节点的左侧较重
    if (this.getBalanceFactor(node.right as Node<T>) > 0) {
      return this.rotationRL(node);
    }

    return this.rotationRR(node);
  }

  insert(key: T) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }

    this.insertNode(this.root, key);
    this.root = this.balanceTree(this.root, key);
  }

  remove(key: T) {
    if (this.root === null) {
      return;
    }

    this.root = this.removeNode(this.root as Node<T>, key);
    this.root = this.balanceTree(this.root as Node<T>);
  }
}
