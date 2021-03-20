class Graph {
  constructor() {
    this.vertices = new Map();
  }

  /**
   * Adds a vertex to the graph.
   * @param {*} vertex The vertex to be added.
   */
  addVertex(vertex) {
    if (this.vertices.has(vertex)) {
      return this;
    }

    this.vertices.set(vertex, { to: new Map(), from: new Set() });
  }

  /**
   * Removes a vertex from the graph.
   * @param {*} vertex The vertex to be removed.
   * @returns {Graph} The graph instance.
   */
  removeVertex(vertex) {
    const neighbors = this.vertices.get(vertex);
    if (!neighbors) {
      return this;
    }

    const { from: incoming, to: outgoing } = neighbors;

    incoming.forEach((incomingVertex) => {
      this.removeEdge(incomingVertex, vertex);
    });

    outgoing.forEach((_, outgoingVertex) => {
      this.removeEdge(vertex, outgoingVertex);
    });

    this.vertices.delete(vertex);
    return this;
  }

  /**
   * Adds an edge to the graph.
   * @param {*} vertexA The first endpoint of the edge.
   * @param {*} vertexB The second endpoint of the edge.
   * @param {number} weight The weight of the edge.
   * @returns {Graph} The graph instance.
   */
  addEdge(vertexA, vertexB, weight = 1) {
    this.addVertex(vertexA);
    this.addVertex(vertexB);

    const vertexAOutgoing = this.vertices.get(vertexA).to;
    vertexAOutgoing.set(vertexB, weight);
    const vertexBIncoming = this.vertices.get(vertexB).from;
    vertexBIncoming.add(vertexA);
    return this;
  }

  /**
   * Removes an edge from the graph.
   * @param {*} vertexA The first endpoint of the edge.
   * @param {*} vertexB The second endpoint of the edge.
   * @returns {Graph} The graph instance.
   */
  removeEdge(vertexA, vertexB) {
    if (!this.vertices.has(vertexA) || !this.vertices.has(vertexB)) {
      return this;
    }

    const vertexAOutgoing = this.vertices.get(vertexA).to;
    vertexAOutgoing.delete(vertexB);
    const vertexBIncoming = this.vertices.get(vertexB).from;
    vertexBIncoming.delete(vertexA);
    return this;
  }
}
