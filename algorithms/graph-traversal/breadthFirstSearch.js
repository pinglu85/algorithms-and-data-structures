const Queue = require('../../data-structures/Queue');

/**
 * Performs Breadth First Search on a graph from the given source node.
 * @param {object} graph A graph represented with adjacency list.
 * Key of the object holds a vertex and value holds an array of adjacent nodes.
 * @param {number|string} source The source node to start traversal from.
 * @returns {*[]} A BFS-traversed order of nodes.
 */
function breadthFirstSearch(graph, source) {
  if (Object.keys(graph).length === 0) {
    return [];
  }

  const queue = new Queue();
  queue.enqueue(source);

  const visited = new Set();

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    visited.add(node);

    const neighbors = graph[node];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.enqueue(neighbor);
      }
    }
  }

  return [...visited];
}
