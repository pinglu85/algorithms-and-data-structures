class Graph {
  constructor() {
    this.nodes = new Map();
  }

  /**
   * Adds a node to the graph.
   * @param {*} node The node to be added.
   */
  addNode(node) {
    if (this.nodes.has(node)) {
      return this;
    }

    this.nodes.set(node, { to: new Map(), from: new Set() });
  }

  /**
   * Removes a node from the graph.
   * @param {*} node The node to be removed.
   * @returns {Graph} The graph instance.
   */
  removeNode(node) {
    const neighbors = this.nodes.get(node);
    if (!neighbors) {
      return this;
    }

    const { from: incoming, to: outgoing } = neighbors;

    incoming.forEach((incomingVertex) => {
      this.removeEdge(incomingVertex, node);
    });

    outgoing.forEach((_, outgoingVertex) => {
      this.removeEdge(node, outgoingVertex);
    });

    this.nodes.delete(node);
    return this;
  }

  /**
   * Adds an edge to the graph.
   * @param {*} nodeA The first endpoint of the edge.
   * @param {*} nodeB The second endpoint of the edge.
   * @param {number} weight The weight of the edge.
   * @returns {Graph} The graph instance.
   */
  addEdge(nodeA, nodeB, weight = 1) {
    this.addNode(nodeA);
    this.addNode(nodeB);

    const nodeAOutgoing = this.nodes.get(nodeA).to;
    nodeAOutgoing.set(nodeB, weight);
    const nodeBIncoming = this.nodes.get(nodeB).from;
    nodeBIncoming.add(nodeA);
    return this;
  }

  /**
   * Removes an edge from the graph.
   * @param {*} nodeA The first endpoint of the edge.
   * @param {*} nodeB The second endpoint of the edge.
   * @returns {Graph} The graph instance.
   */
  removeEdge(nodeA, nodeB) {
    if (!this.nodes.has(nodeA) || !this.nodes.has(nodeB)) {
      return this;
    }

    const nodeAOutgoing = this.nodes.get(nodeA).to;
    nodeAOutgoing.delete(nodeB);
    const nodeBIncoming = this.nodes.get(nodeB).from;
    nodeBIncoming.delete(nodeA);
    return this;
  }
}

module.exports = Graph;
