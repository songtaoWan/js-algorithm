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
  depthFirstSearch(callback?: (v: T) => void) {
    const vertices = this.getVertices();
    if (!vertices.length) {
      return;
    }

    const verticesColor = this.initColor();
    const adjList = this.getAdjlist();

    const dfs = (v: T) => {
      if (verticesColor[v] !== Graph.Colors.white) {
        return;
      }

      verticesColor[v] = Graph.Colors.gray;
      if (callback) {
        callback(v);
      }

      const list = (adjList as Record<T, T[]>)[v];
      // 处理没有邻接表的情况
      if (!list || !list.length) {
        verticesColor[v] = Graph.Colors.black;
        return;
      }

      for (let i = 0; i < list.length; i++) {
        dfs(list[i]);
      }
      verticesColor[v] = Graph.Colors.black;
    };

    for (let loop = 0; loop < vertices.length; loop++) {
      const v = vertices[loop];

      if (verticesColor[v] === Graph.Colors.white) {
        dfs(v);
      }
    }
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
graph1.addVertex('a');
graph1.addVertex('b');
graph1.addVertex('c');
graph1.addVertex('d');
graph1.addVertex('e');
graph1.addVertex('f');
graph1.addVertex('g');
graph1.addVertex('h');
graph1.addVertex('i');
graph1.addVertex('j');
graph1.addVertex('x');
// graph1.addVertex('j');

graph1.addEdge('a', 'b');
graph1.addEdge('a', 'c');
graph1.addEdge('a', 'd');
graph1.addEdge('b', 'e');
graph1.addEdge('b', 'f');
graph1.addEdge('c', 'd');
graph1.addEdge('c', 'g');
graph1.addEdge('d', 'g');
graph1.addEdge('d', 'h');
graph1.addEdge('e', 'i');
graph1.addEdge('i', 'j');
graph1.addEdge('x', 'a');
graph1.addEdge('x', 'b');

console.log(graph1.toString());

graph1.depthFirstSearch((v) => console.log(v));
