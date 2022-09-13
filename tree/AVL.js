class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor(compareFn) {
    this.root = null;
    this.compareFn = compareFn || this.defaultCompare;
  }

  /**
   * a大于b，返回1，等于返回0，小于返回-1
   * @param a
   * @param b
   * @returns
   */
  defaultCompare(a, b) {
    if (a === b) {
      return 0;
    }

    if (a > b) {
      return 1;
    }

    return -1;
  }

  getNodeHeight(node) {
    const traverse = (node, layer = -1) => {
      if (node === null) {
        return layer;
      }

      layer++;
      const left = traverse(node.left, layer);
      const right = traverse(node.right, layer);
      return Math.max(left, right);
    };

    return traverse(node);
  }

  /**
   * 获取左右子树高度差，左子树高返回正数，反之返回负数
   * @param node
   * @returns
   */
  getBalanceFactor(node) {
    if (node === null) {
      return 0;
    }

    return (
      this.getNodeHeight(node.left) -
      this.getNodeHeight(node.right)
    );
  }

  /**
   * 向右的单旋转：左侧子节点的高度大于右侧子节点的高度且左侧子节点也是平衡的或左侧较重的
   * @param node
   * @returns
   */
  rotationLL(node) {
    /**
     * 1.将旧根节点的左侧子节点旋转为新根节点；
     * 2.将新根节点的右侧子节点赋值为旧根节点的左侧子节点；
     * 3.将旧根节点赋值为新根节点的右侧子节点。
     */
    const root = node.left;
    node.left = root.right;
    root.right = node;

    return root;
  }

  /**
   * 向左的单旋转：右侧子节点的高度大于左侧子节点的高度且右侧子节点也是平衡的或右侧较重的
   * @param node
   * @returns
   */
  rotationRR(node) {
    /**
     * 1.将旧根节点的右侧子节点旋转为新根节点；
     * 2.将新根节点的左侧子节点赋值为旧根节点的右侧子节点；
     * 3.将旧根节点赋值为新根节点的左侧子节点。
     */
    const root = node.right;
    node.right = root.left;
    root.left = node;

    return root;
  }

  /**
   * 向右的双旋转：左侧子节点的高度大于右侧子节点，但左侧子节点右侧较重
   * @param node
   * @returns
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * 向左的双旋转：右侧子节点的高度大于左侧子节点的高度，但右侧子节点左侧较重
   * @param node
   * @returns
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }

  /**
   * 平衡传入的树结构并返回
   * @param node
   * @param key 插入节点的值，可以用来判断子树是哪边较重
   * @returns
   */
  balanceTree(node, key) {
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
        this.compareFn(key, node.left.key) === 1
      ) {
        return this.rotationLR(node);
      }

      // 如果左子树的左右子节点高度差为负值，则代表左子树的右侧较重，即左侧子节点的右侧较重
      if (this.getBalanceFactor(node.left) < 0) {
        return this.rotationLR(node);
      }

      return this.rotationLL(node);
    }

    // 插入的值如果小于右子节点的值，则代表该值将会插入到右子节点的左侧，所以右侧子节点的左侧较重
    if (
      key !== undefined &&
      this.compareFn(key, node.right.key) === -1
    ) {
      return this.rotationRL(node);
    }

    // 如果右子树的左右子节点高度差为正值，则代表右子树的左侧较重，即右侧子节点的左侧较重
    if (this.getBalanceFactor(node.right) > 0) {
      return this.rotationRL(node);
    }

    return this.rotationRR(node);
  }

  insertNode(node, key) {
    let nextNode = null;

    // 需要插入的节点的值大于当前节点的值，较大的值总数保存在二叉树的右节点
    if (this.compareFn(key, node.key) === 1) {
      if (node.right === null) {
        node.right = new Node(key);
        return;
      }

      nextNode = node.right;
    } else {
      if (node.left === null) {
        node.left = new Node(key);
        return;
      }

      nextNode = node.left;
    }

    return this.insertNode(nextNode, key);
  }

  minNode(node) {
    let min = node;
    while (min?.left !== null) {
      min = min?.left;
    }

    return min;
  }

  removeNode(node, key) {
    if (this.compareFn(key, node.key) === 1) {
      node.right = this.removeNode(node.right, key);
      return node;
    }

    if (this.compareFn(key, node.key) === -1) {
      node.left = this.removeNode(node.left, key);
      return node;
    }

    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.right === null) {
      return node.left;
    }

    if (node.left === null) {
      return node.right;
    }

    // 左右节点都存在，则将右子节点的最小节点移动到删除的节点的位置
    const right = node.right;
    const min = this.minNode(right).key;
    node.key = min;
    node.right = this.removeNode(right, min);
    return node;
  }

  maxNode(node) {
    let maxNode = node;
    while (maxNode.right !== null) {
      maxNode = maxNode.right;
    }

    return maxNode;
  }

  searchNode(node, key) {
    if (node === null) {
      return null;
    }

    let nextNode = node;
    if (this.compareFn(key, node.key) === 1) {
      nextNode = node.right;
    } else if (this.compareFn(key, node.key) === -1) {
      nextNode = node.left;
    } else {
      return node;
    }

    return this.searchNode(nextNode, key);
  }

  getAllNodeKey(node, getNodeValue = (key) => `${key}`) {
    const nodeList = [];
    const traverse = (nodes, idx = 0) => {
      if (nodes === null) {
        if (nodeList[idx] === undefined) {
          nodeList[idx] = [''];
        } else {
          nodeList[idx].push('');
        }
        return;
      }

      const val = getNodeValue(nodes.key);
      if (nodeList[idx] === undefined) {
        nodeList[idx] = [val];
      } else {
        nodeList[idx].push(val);
      }
      idx++;

      traverse(nodes.left, idx);
      traverse(nodes.right, idx);
    };

    traverse(node);
    nodeList.pop();

    nodeList.forEach((item, idx) => {
      if (item.length === 2 ** idx) {
        return;
      }

      nodeList[idx - 1].forEach((val, key) => {
        if (val !== '') {
          return;
        }

        nodeList[idx].splice(2 * key, 0, '', '');
      });
    });

    return nodeList;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
      return;
    }

    this.insertNode(this.root, key);
    this.root = this.balanceTree(this.root, key);
  }

  remove(key) {
    if (this.root === null) {
      return;
    }

    this.root = this.removeNode(this.root, key);
    this.root = this.balanceTree(this.root);
  }

  preOrderTraverse(callback = (key) => console.log(key)) {
    const preTraverse = (node) => {
      if (node === null) {
        return;
      }

      callback(node.key);
      preTraverse(node.left);
      preTraverse(node.right);
    };

    preTraverse(this.root);
  }

  inOrderTraverse(callback = (key) => console.log(key)) {
    const inTraverse = (node) => {
      if (node === null) {
        return;
      }

      inTraverse(node.left);
      callback(node.key);
      inTraverse(node.right);
    };

    inTraverse(this.root);
  }

  postOrderTraverse(callback = (key) => console.log(key)) {
    const postTraverse = (node) => {
      if (node === null) {
        return;
      }

      postTraverse(node.left);
      postTraverse(node.right);
      callback(node.key);
    };

    postTraverse(this.root);
  }

  min() {
    if (this.root === null) {
      return undefined;
    }

    const minNode = this.minNode(this.root);
    return minNode.key;
  }

  max() {
    if (this.root === null) {
      return undefined;
    }

    return this.maxNode(this.root).key;
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  printTree(nodeToString = (key) => `${key}`) {
    const nodes = this.getAllNodeKey(this.root, nodeToString);
    if (nodes.length === 0) {
      return '';
    }

    // 使用4个空格符作分割，推荐使用偶数
    const splitStr = new Array(4).fill(' ').join('');
    // 将树的最深一层使用分割符拼成需要打印的字符串
    const lastStr = nodes[nodes.length - 1].join(splitStr);

    // 用空格符拼一个和树最深一层长度一样的字符串，以便将节点的值插入对应位置
    const spaceStr = new Array(lastStr.length).fill(' ').join('');

    // 每层树节点拼成的打印字符串组成的数组
    const prints = new Array(nodes.length - 1).fill(spaceStr);
    prints.push(lastStr);

    for (let i = nodes.length - 2; i >= 0; i--) {
      const item = nodes[i];

      for (let j = 0; j < item.length; j++) {
        if (item[j] === '') {
          continue;
        }

        // 核心算法：根据子节点的位置计算父节点的位置
        let index = 0;
        const next = nodes[i + 1];
        if (next[j * 2] !== '' && next[j * 2 + 1] !== '') {
          // 左右子节点都不为空
          const leftIdx =
            prints[i + 1].indexOf(next[j * 2]) + next[j * 2].length;
          const rightIdx =
            prints[i + 1].indexOf(next[j * 2 + 1]) + next[j * 2 + 1].length;
          index = Math.floor((leftIdx + rightIdx) / 2) - item[j].length;
        } else if (next[j * 2] !== '') {
          // 左子节点不为空
          const leftIdx =
            prints[i + 1].indexOf(next[j * 2]) + next[j * 2].length;
          index = leftIdx + Math.floor(splitStr.length / 2);
        } else if (next[j * 2 + 1] !== '') {
          // 右子节点不为空
          const rightIdx = prints[i + 1].indexOf(next[j * 2 + 1]);
          index = rightIdx - Math.floor(splitStr.length / 2) - item[j].length;
        } else {
          // 没有子节点
          const one = j * 2 * splitStr.length;
          const two = (j * 2 + 1) * splitStr.length;
          index = Math.floor((one + two - item[j].length) / 2);

          if (index < prints[i].indexOf(item[j - 1])) {
            index =
              prints[i].indexOf(item[j - 1]) +
              item[j - 1].length +
              splitStr.length;
          }
        }

        prints[i] =
          prints[i].slice(0, index) +
          item[j] +
          prints[i].slice(index + item[j].length);
      }
    }

    // 添加指示符，可以去掉
    const letters = new Array(nodes.length - 1).fill(spaceStr);
    const left = '╱';
    const right = '╲';
    nodes.forEach((val, key) => {
      if (key === nodes.length - 1) {
        return;
      }

      val.forEach((item, idx) => {
        if (item === '') {
          return;
        }

        const coord = prints[key].indexOf(item);
        // 该节点的左子节点不为空
        if (nodes[key + 1][idx * 2] !== '') {
          letters[key] =
            letters[key].slice(0, coord - left.length) +
            left +
            letters[key].slice(coord);
        }

        if (nodes[key + 1][idx * 2 + 1] !== '') {
          letters[key] =
            letters[key].slice(0, coord + item.length) +
            right +
            letters[key].slice(coord + item.length + right.length);
        }
      });
    });

    // 将指示符和树拼接
    let str = '';
    prints.forEach((item, idx) => {
      if (idx === 0) {
        str += `${item}`;
        return;
      }

      str += `\n${letters[idx - 1]}\n${item}`;
    });
    return str;
  }
}