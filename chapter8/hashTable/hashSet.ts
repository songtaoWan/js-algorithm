/**
 * 散列集合
 */
class HashSet {
  private table: (string | number | undefined)[];

  constructor() {
    this.table = [];
  }

  /**
   * 计算散列值
   * @param val 
   * @returns 
   */
  djb2HashCode(val: string) {
    let hash = 5381;
    for (let i = 0; i< val.length; i++) {
      hash += hash * 33 + val.charCodeAt(i);
    }

    return hash % 1013;
  }

  /**
   * 获取值在散列集合中存放的实际位置
   * @param val 
   * @returns 不存在返回-1
   */
  getIndex(val: string) {
    let code = this.djb2HashCode(val);

    if (this.table[code] === undefined) {
      return -1;
    }

    while(this.table[code] !== val) {
      code++;
    }

    return code;
  }

  has(val: string | number) {
    const code = this.getIndex(val + '');

    return code !== -1;
  }

  put(val: string | number) {
    let code = this.djb2HashCode(val + '');

    while(this.table[code] !== undefined) {
      code++;
    }

    this.table[code] = val;
  }

  remove(val: string | number) {
    const idx = this.getIndex(val + '');

    if (idx === -1) {
      return false;
    }

    delete this.table[idx];
    return true;
  }
}

const myset = new HashSet();

myset.put('wst');
myset.put('lst');
myset.put('l1st');
myset.put('ls1t');

console.log(myset);
console.log(myset.has('l1st'));

myset.remove('ls1t');
console.log(myset);
