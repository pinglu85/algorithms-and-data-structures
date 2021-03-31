const PriorityQueue = require('../../data-structures/PriorityQueue');
const Graph = require('../../data-structures/Graph');

/**
 * Finds the shortest path between the given source node and
 * the given target node in a graph.
 * @param {Map} graph A graph represented with adjacency list.
 * Key of the map holds a node and value is an object which
 * contains a set of incoming nodes and a map of outgoing nodes.
 * Key of the outgoing nodes map holds a outgoing node and value
 * holds the weight of the edge.
 * @param {*} source The starting node.
 * @param {*} target The target node.
 * @returns {*[]} The shortest path between the source node and the target node.
 */
function dijkstrasAlgorithm(graph, source, target) {
  const dijkstrasInfo = new Map();

  graph.forEach((_, node) => {
    const distanceToSource = node === source ? 0 : Infinity;
    dijkstrasInfo.set(node, { distanceToSource, parent: null });
  });

  const pq = new PriorityQueue(
    (vertexA, vertexB) => vertexA.distanceToSource - vertexB.distanceToSource
  );

  pq.insert({
    node: source,
    distanceToSource: 0,
  });

  const visited = new Set();

  while (pq.size() > 0) {
    const { node, distanceToSource } = pq.pull();

    if (node === target) {
      return constructPath(dijkstrasInfo, target);
    }

    if (visited.has(node)) {
      continue;
    }

    visited.add(node);

    const neighbors = graph.get(node).to;

    neighbors.forEach((weight, neighbor) => {
      if (visited.has(neighbor)) {
        return;
      }

      const newDistanceToSource = distanceToSource + weight;
      const oldDistanceToSource = dijkstrasInfo.get(neighbor).distanceToSource;

      if (newDistanceToSource < oldDistanceToSource) {
        dijkstrasInfo.set(neighbor, {
          distanceToSource: newDistanceToSource,
          parent: node,
        });
        pq.insert({ node: neighbor, distanceToSource: newDistanceToSource });
      }
    });
  }

  return [];
}

// Constructs the shortest path between the source node and the target node.
function constructPath(dijkstrasInfo, target) {
  const path = [];
  let node = target;

  while (node) {
    path.push(node);
    const { parent } = dijkstrasInfo.get(node);
    node = parent;
  }

  return path.reverse();
}

const graph = new Graph();
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 7);
graph.addEdge('B', 'C', 2);
graph.addEdge('C', 'D', 3);
graph.addEdge('C', 'F', 6);
graph.addEdge('C', 'E', 1);
graph.addEdge('D', 'F', 2);
graph.addEdge('E', 'F', 3);
const path = dijkstrasAlgorithm(graph.nodes, 'A', 'F');
console.log(path);
