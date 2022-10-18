class Graph<T extends number | string | symbol> {
  private isDirected: boolean;
  private vertices: T[];
  private adjList: Record<any, T[]>;

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
      this.adjList[v] = [];
    }

    this.adjList[v].push(w);

    // 无向图，互为边
    if (!this.isDirected) {
      if (!this.adjList.hasOwnProperty(w)) {
        this.adjList[w] = [];
      }

      this.adjList[w].push(v);
    }
  }

  printGraph() {
    const vertices = Object.entries(this.adjList);

    if (!vertices.length) {
      return '图不存立，只有顶点没有边';
    }

    return vertices.map((val) => {
      return `${val[0]} => ${val[1].join(', ')}`;
    }).join('\n');
  }
}

const graph1 = new Graph(true);
graph1.addVertex('a');
graph1.addVertex('b');
graph1.addVertex('c');
graph1.addVertex('d');

graph1.addEdge('a', 'b');
graph1.addEdge('a', 'd');
graph1.addEdge('b', 'd');
graph1.addEdge('d', 'c');
graph1.addEdge('c', 'a');

console.log(graph1.printGraph());
