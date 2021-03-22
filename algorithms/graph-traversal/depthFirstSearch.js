const Stack = require('../../data-structures/Stack');

/**
 * Performs Depth First Search on a graph from the given source code.
 * @param {object} graph A graph represented with adjacency list.
 * Key of the object holds a vertex and value holds an array of adjacent nodes.
 * @param {number|string} source The source node to start traversal from.
 * @returns {*[]} A DFS-traversed order of nodes.
 */
function depthFirstSearch(graph, source) {
  if (Object.keys(graph).length === 0) {
    return [];
  }

  const stack = new Stack();
  stack.push(source);

  const visited = new Set();

  while (stack.length > 0) {
    const node = stack.pop();
    visited.add(node);

    const neighbors = graph[node];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return [...visited];
}

/**
 * Performs Depth First Search on a graph from the given source code with recursion.
 * @param {object} graph A graph represented with adjacency list.
 * Key of the object holds a vertex and value holds an array of adjacent nodes.
 * @param {number|string} source The source node to start traversal from.
 * @returns {*[]} A DFS-traversed order of nodes.
 */
function recursiveDepthFirstSearch(graph, source) {
  const recursiveDFSImpl = (graph, node, visited) => {
    const neighbors = graph[node];
    visited.add(node);

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        recursiveDFSImpl(graph, neighbor, visited);
      }
    }

    return [...visited];
  };

  return recursiveDFSImpl(graph, source, new Set());
}
