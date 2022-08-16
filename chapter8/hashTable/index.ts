class HashTable<T = any> {
  private table: ({key: string | number, value: T} | undefined)[]

  constructor() {
    this.table = [];
  }

  /**
   * 计算散列值的算法
   * @param key 
   * @returns 
   */
  djb2HashCode(key: string | number) {
    if (typeof key === 'number') {
      key = `${key}`;
    }

    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) + key.charCodeAt(i);
    }

    return hash % 1013;
  }

  /**
   * 获取值存放在散列表中的索引
   * @param key 
   * @returns 未找到返回-1
   */
  private getIndex(key: string | number) {
    let code = this.djb2HashCode(key);

    if (this.table[code] == undefined) {
      return -1;
    }

    const value = this.table[code] as {key: string, value: T};
    while(value.key !== key) {
      code++;
    }

    return code;
  }

  get(key: string | number): T | undefined {
    const code = this.getIndex(key);

    if (code === -1) {
      return undefined;
    }

    const item = this.table[code] as {key: string, value: T};
    return item.value;
  }

  put(key: string | number, value: T) {
    let code = this.djb2HashCode(key);

    if (this.table[code] == null) {
      this.table[code] = {
        key,
        value
      };
      return;
    }

    while(this.table[code] != null) {
      code++;
    }

    this.table[code] = {key, value};
  }

  remove(key: string | number) {
    const code = this.getIndex(key);

    if (code === -1) {
      return false;
    }

    this.table[code] = undefined;
    return true;
  }
}

const hash = new HashTable<string | number>();

hash.put('name1', 'wst');
hash.put('n1ame', 'lst');

console.log(hash);
console.log('value: ', hash.get('name1'));

