class QueueArray<T = any> {
  private items: T[]

  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  enqueue(element: T) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  push(...element: T[]) {
    this.items.push(...element);
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }

    return this.items[0];
  }
}

/**
 * 击鼓传花游戏
 * @param persons 
 * @param loop 
 * @returns 
 */
const hotPotato = <T = any>(persons: T[], loop: number) => {
  if (persons.length === 0 || loop <= 0) {
    return false;
  }

  const queue = new QueueArray<T>();
  queue.push(...persons);
  const count = loop | 0;
  const losers: {index: number, name: T}[] = [];

  while(queue.size() > 1) {
    for (let i = 0; i < count; i++) {
      queue.enqueue(queue.dequeue() as T);
    }

    const fail = queue.dequeue() as T;
    const index = persons.findIndex((val) => val === fail);
    losers.push({
      index: index,
      name: fail
    });
  }

  const win = queue.dequeue() as T;
  const idx = persons.findIndex((val) => val === win);

  return {
    losers,
    winner: {
      index: idx,
      name: win
    }
  }
}

const persons = ['wst', 'lst', 'cms', 'abr', 'pwj', 'fl', 'jj', 'qq', 'wx'];
const res = hotPotato(persons, 3);

console.log(res);

