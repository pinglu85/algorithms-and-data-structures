const Queue = require('../../data-structures/Queue');

/**
 * Performs Breadth First Search on a binary tree from the given root node.
 * @param {Node} root The root node to start traversal from.
 * @returns {*[]} A BFS-traversed order of nodes' values.
 */
function breadthFirstSearch(root) {
  const queue = new Queue();
  queue.enqueue(root);

  const visited = [];

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    visited.push(node.value);

    if (node.left) {
      queue.enqueue(node.left);
    }

    if (node.right) {
      queue.enqueue(node.right);
    }
  }

  return visited;
}
