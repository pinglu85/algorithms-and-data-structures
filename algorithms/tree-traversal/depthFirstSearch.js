/**
 * Performs pre-order Depth First Search on a binary tree from the given root node.
 * @param {Node} root The root node to start traversal from.
 * @returns {*[]} A DFS-traversed order of nodes' values.
 */
function depthFirstSearchPreOrder(root) {
  const recursiveDfsPreOrder = (root, visited) => {
    if (!root) {
      return visited;
    }

    visited.push(root.value);
    recursiveDfsPreOrder(root.left, visited);
    recursiveDfsPreOrder(root.right, visited);

    return visited;
  };

  return recursiveDfsPreOrder(root, []);
}

/**
 * Performs post-order Depth First Search on a binary tree from the given root node.
 * @param {Node} root The root node to start traversal from.
 * @returns {*[]} A DFS-traversed order of nodes' values.
 */
function depthFirstSearchPostOrder(root) {
  const recursiveDfsPostOrder = (root, visited) => {
    if (!root) {
      return visited;
    }

    recursiveDfsPostOrder(root.left, visited);
    recursiveDfsPostOrder(root.right, visited);
    visited.push(root.value);

    return visited;
  };

  return recursiveDfsPostOrder(root, []);
}

/**
 * Performs in-order Depth First Search on a binary tree from the given root node.
 * @param {Node} root The root node to start traversal from.
 * @returns {*[]} A DFS-traversed order of nodes' values.
 */
function depthFirstSearchInOrder(root) {
  const recursiveDfsInOrder = (root, visited) => {
    if (!root) {
      return visited;
    }

    recursiveDfsInOrder(root.left, visited);
    visited.push(root.value);
    recursiveDfsInOrder(root.right, visited);

    return visited;
  };

  return recursiveDfsInOrder(root, []);
}
