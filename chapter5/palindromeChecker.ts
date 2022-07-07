class DequeArray {
  private items: string[]

  constructor(args?: string[]) {
    this.items = args || [];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  addFront(ele: string) {
    this.items.unshift(ele);
  }

  addBack(ele: string) {
    this.items.push(ele);
  }

  removeFront() {
    return this.items.shift();
  }

  removeBack() {
    return this.items.pop();
  }
}

/**
 * 回文检查器
 * @param str 
 * @returns 
 */
const palindromeChecker = (str: string) => {
  if (str === '' || str.length === 1) {
    return false;
  }

  const arr = str.toLowerCase().split('');
  const deque = new DequeArray(arr);

  while(deque.size() > 1) {
    if (deque.removeFront() !== deque.removeBack()) {
      return false;
    }
  }

  return true;
}

const palindrome = 'smadams';
const res1 = palindromeChecker(palindrome);
console.log(res1);
