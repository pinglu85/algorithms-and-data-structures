const PriorityQueue = require('../../data-structures/PriorityQueue');
const Graph = require('../../data-structures/Graph');

function dijkstrasAlgorithm(graph, source, target) {
  const dijkstrasInfo = new Map();

  graph.forEach((_, vertex) => {
    const distanceToSource = vertex === source ? 0 : Infinity;
    dijkstrasInfo.set(vertex, { distanceToSource, parent: null });
  });

  const pq = new PriorityQueue(
    (vertexA, vertexB) => vertexA.distanceToSource - vertexB.distanceToSource
  );

  pq.insert({
    vertex: source,
    distanceToSource: 0,
  });

  const visited = new Set();

  while (pq.size() > 0) {
    const { vertex, distanceToSource } = pq.pull();

    if (vertex === target) {
      return constructPath(dijkstrasInfo, target);
    }

    if (visited.has(vertex)) {
      continue;
    }

    visited.add(vertex);

    const neighbors = graph.get(vertex).to;

    neighbors.forEach((weight, neighbor) => {
      if (visited.has(neighbor)) {
        return;
      }

      const newDistanceToSource = distanceToSource + weight;
      const oldDistanceToSource = dijkstrasInfo.get(neighbor).distanceToSource;

      if (newDistanceToSource < oldDistanceToSource) {
        dijkstrasInfo.set(neighbor, {
          distanceToSource: newDistanceToSource,
          parent: vertex,
        });
        pq.insert({ vertex: neighbor, distanceToSource: newDistanceToSource });
      }
    });
  }

  return [];
}

function constructPath(dijkstrasInfo, target) {
  const path = [];
  let vertex = target;

  while (vertex) {
    path.push(vertex);
    const { parent } = dijkstrasInfo.get(vertex);
    vertex = parent;
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
const path = dijkstrasAlgorithm(graph.vertices, 'A', 'F');
console.log(path);
