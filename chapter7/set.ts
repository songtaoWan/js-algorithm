/**
 * 集合实现，只支持string | symbol
 */
class MyselfSet {
  items: Record<string | symbol, any>;

  constructor() {
    this.items = {};
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.values(this.items).length;
  }

  values(): (string | symbol)[] {
    return Object.values(this.items);
  }

  has(element: string | symbol) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  delete(element: string | symbol) {
    if (!this.has(element)) {
      return;
    }

    delete this.items[element];
  }

  add(element: string | symbol) {
    if (this.has(element)) {
      return;
    }

    this.items[element] = element;
  }
}

const mySet = new MyselfSet();
mySet.add('1');
mySet.add('set');
mySet.add('del');

console.log(mySet.values(), mySet.size());

