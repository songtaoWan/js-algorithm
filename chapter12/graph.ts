interface IColor {
  white: 0;
  gray: 1;
  black: 2;
}

// 获取对象中的某个值
type IValue<T = unknown> = {
  [P in keyof T]: T[P];
}[keyof T];

class Graph<T extends number | string | symbol> {
  private isDirected: boolean;
  private vertices: T[];
  private adjList: Record<T, T[]> | {};
  private static Colors: IColor = { white: 0, gray: 1, black: 2 };

  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = {};
  }

  addVertex(v: T) {
    if (this.vertices.includes(v)) {
      return;
    }

    this.vertices.push(v);
  }

  /**
   * 添加边，有向图v=>w，无向图v=>w w=>v
   * @param v
   * @param w
   */
  addEdge(v: T, w: T) {
    if (!this.vertices.includes(v)) {
      this.addVertex(v);
    }
    if (!this.vertices.includes(w)) {
      this.addVertex(w);
    }

    if (!this.adjList.hasOwnProperty(v)) {
      (this.adjList as Record<T, T[]>)[v] = [];
    }

    (this.adjList as Record<T, T[]>)[v].push(w);

    // 无向图，互为边
    if (!this.isDirected) {
      if (!this.adjList.hasOwnProperty(w)) {
        (this.adjList as Record<T, T[]>)[w] = [];
      }

      (this.adjList as Record<T, T[]>)[w].push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjlist() {
    return this.adjList;
  }

  /**
   * 给每个顶点上色
   * @returns
   */
  private initColor(): Record<T, IValue<IColor>> {
    const vertices = this.vertices;
    const color: Record<T, IValue<IColor>> | {} = {};
    vertices.forEach((val) => {
      (color as Record<T, IValue<IColor>>)[val] = Graph.Colors.white;
    });

    return color as Record<T, IValue<IColor>>;
  }

  /**
   * 广度优先搜索算法
   * @param startVertex 起始顶点
   * @param callback 一个顶点被探索完后执行的回调函数
   * @returns
   */
  breadthFirstSearch(
    startVertex: T = this.vertices[0],
    callback?: (v: T) => void
  ) {
    const vertices = this.getVertices();
    if (vertices.length < 2 || !vertices.includes(startVertex)) {
      return;
    }

    const verticesColor = this.initColor();
    const adjList = this.getAdjlist() as Record<T, T[]>;

    // 将起始顶点改为灰色并加入队列
    const queue: T[] = [];
    verticesColor[startVertex] = Graph.Colors.gray;
    queue.push(startVertex);

    while (queue.length) {
      const vertex = queue.shift() as T;

      // 处理没有邻接表的顶点
      if (!adjList[vertex] || !adjList[vertex].length) {
        verticesColor[vertex] = Graph.Colors.black;
        if (callback) {
          callback(vertex);
        }
        continue;
      }

      // 将邻接表中未访问的顶点加入队列中
      const list = adjList[vertex];
      for (let i = 0; i < list.length; i++) {
        const v = list[i];

        if (verticesColor[v] === Graph.Colors.white) {
          verticesColor[v] = Graph.Colors.gray;
          queue.push(v);
        }
      }

      verticesColor[vertex] = Graph.Colors.black;
      if (callback) {
        callback(vertex);
      }
    }
  }

  /**
   * 深度优先搜索算法
   * @param callback
   * @returns
   */
  depthFirstSearch(callback?: (v: T) => void): Record<T, {startTime: number; endTime: number; prevNode?: T}> | undefined {
    const vertices = this.getVertices();
    if (!vertices.length) {
      return;
    }

    const verticesColor = this.initColor();
    const adjList = this.getAdjlist();
    const detail: Record<T, {startTime?: number; endTime?: number; prevNode?: T}> | {} = {};

    let count = 0;
    const dfs = (v: T) => {
      if (verticesColor[v] !== Graph.Colors.white) {
        return;
      }

      verticesColor[v] = Graph.Colors.gray;
      const info = detail as Record<T, {startTime?: number; endTime?: number; prevNode?: T}>;
      info[v] = { startTime: ++count };

      if (callback) {
        callback(v);
      }

      const list = (adjList as Record<T, T[]>)[v];
      // 处理没有邻接表的情况
      if (!list || !list.length) {
        verticesColor[v] = Graph.Colors.black;
        info[v].endTime = ++count;
        return;
      }

      for (let i = 0; i < list.length; i++) {
        dfs(list[i]);
        
        if (!info[list[i]].prevNode) {
          info[list[i]].prevNode = v;
        }
      }
      verticesColor[v] = Graph.Colors.black;
      info[v].endTime = ++count;
    };

    for (let loop = 0; loop < vertices.length; loop++) {
      const v = vertices[loop];

      if (verticesColor[v] === Graph.Colors.white) {
        dfs(v);
      }
    }

    return detail as Record<T, {startTime: number; endTime: number; prevNode?: T}>;
  }

  /**
   * 拓扑排序，只支持有向无环图（DAG）
   * @returns 一种可能
   */
  topoSort() {
    if (!this.isDirected) {
      return;
    }

    const result = this.depthFirstSearch();
    if (!result) {
      return;
    }

    const arr: {vertex: T; endTime: number}[] = [];
    for (const [key, val] of Object.entries<{endTime: number}>(result)) {
      arr.push({vertex: key as T, endTime: val.endTime});
    }

    arr.sort((a, b) => b.endTime - a.endTime);
    
    return arr.map((val) => {
      return val.vertex;
    }).join(' - ');
  }

  toString() {
    const vertices = Object.entries(this.adjList);

    if (!vertices.length) {
      return '图不存立，只有顶点没有边';
    }

    return vertices
      .map((val) => {
        return `${val[0]} -> ${(val[1] as T[]).join(', ')}`;
      })
      .join('\n');
  }
}

const graph1 = new Graph(true);
graph1.addVertex('A');
graph1.addVertex('B');
graph1.addVertex('C');
graph1.addVertex('D');
graph1.addVertex('E');
graph1.addVertex('F');

graph1.addEdge('A', 'C');
graph1.addEdge('A', 'D');
graph1.addEdge('B', 'D');
graph1.addEdge('B', 'E');
graph1.addEdge('C', 'F');
graph1.addEdge('F', 'E');

console.log(graph1.toString());
console.log(graph1.topoSort());
