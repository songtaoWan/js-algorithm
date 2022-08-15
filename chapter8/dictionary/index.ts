import { defaultToString } from '../util/index';

class Dictionary {
  private table: Record<string, {key: any, value: any}>;
  private toStringFn: (key: any) => string;

  constructor(toStringFn = defaultToString) {
    this.table = {};
    this.toStringFn = toStringFn;
  }

  clear() {
    this.table = {};
  }

  size() {
    return Object.keys(this.table).length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  set<T = any, U = any>(key: T, value: U) {
    const dicKey = this.toStringFn(key);

    this.table[dicKey] = {
      key,
      value
    };
  }

  remove(key: any) {
    const dicKey = this.toStringFn(key);

    delete this.table[dicKey];
  }

  hasKey(key: any): boolean {
    const dicKey = this.toStringFn(key);

    return Object.prototype.hasOwnProperty.call(this.table, dicKey);
  }

  get<T = any>(key: any): T {
    const dicKey = this.toStringFn(key);

    return this.table[dicKey].value;
  }

  keys<T = any>(): T[] {
    const table = Object.values(this.table);

    return table.map((val) => val.key);
  }

  values<T = any>(): T[] {
    const table = Object.values(this.table);

    return table.map((val) => val.value);
  }

  keyValues<T = any, U = any>(): [T, U][] {
    const table = Object.values(this.table);

    return table.map((val) => [val.key, val.value]);
  }

  forEach<T = any, U = any>(callbackFn: (key:T, value: U) => boolean | void) {
    const table = this.keyValues<T, U>();

    for(const [key, value] of table) {
      const res = callbackFn(key, value);

      if (res === false) {
        break;
      }
    }
  }
}

const dic = new Dictionary();
dic.set({key: '我是键'}, '大梦一场空');
dic.set(null, 999);
dic.set(() => 'key', {value: 'test'});

console.log('keys: ', dic.keys());
console.log('values: ', dic.values());
console.log('keyValues: ', dic.keyValues());
dic.forEach((key, value) => {
  if (key === null) {
    return false;
  }

  console.log(`key: ${key}, value: ${value}`);
})
