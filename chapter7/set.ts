/**
 * 集合实现，只支持string | symbol
 */
class MyselfSet {
  private items: Record<string | symbol, any>;

  constructor() {
    this.items = {};
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
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

  union(otherSet: MyselfSet) {
    const unionSet = new MyselfSet();

    this.values().forEach((val) => {
      unionSet.add(val);
    });

    otherSet.values().forEach((val) => {
      unionSet.add(val);
    });

    return unionSet;
  }

  /**
   * 交集
   * @param otherSet 
   */
  intersection(otherSet: MyselfSet) {
    const inset = new MyselfSet();

    const values = this.values();
    const len = values.length > otherSet.size() ? otherSet.size() : values.length;

    if (!len) {
      return inset;
    }

    for(let i = 0; i < values.length; i++) {
      const val = values[i];

      if (otherSet.has(val)) {
        inset.add(val);

        if (inset.size() === len) {
          return inset;
        }
      }
    }

    return inset;
  }
}

const mySet = new MyselfSet();
mySet.add('1');


// console.log(mySet.values(), mySet.size(), mySet);

const oSet = new MyselfSet();
oSet.add('1');
oSet.add('set');
oSet.add('del');

console.log(mySet.intersection(oSet));
