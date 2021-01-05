class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * Recursively inserts a new value in the tree.
   * @param {number} value The value to be inserted.
   */
  insert(value) {
    this.root = this.#insertImpl(value, this.root);
  }

  #insertImpl(value, node) {
    if (!node) {
      return new Node(value);
    }

    // NOTE: Duplicates are sent to the left.
    if (value <= node.value) {
      node.left = this.#insertImpl(value, node.left);
    } else {
      node.right = this.#insertImpl(value, node.right);
    }

    return node;
  }

  /**
   * Recursively searches a value in the tree.
   * @param {number} value The value to be searched for.
   * @returns {boolean} Whether the value is found.
   */
  search(value) {
    return this.#searchImpl(value, this.root);
  }

  #searchImpl(value, node) {
    if (!node) {
      return false;
    }

    if (value === node.value) {
      return true;
    }

    if (value < node.value) {
      return this.#searchImpl(value, node.left);
    }

    return this.#searchImpl(value, node.right);
  }

  /**
   * Recursively gets the minimum value in the tree.
   * @returns {number} The minimum value.
   */
  getMinValue() {
    const minimumNode = this.#getMinValueNode(this.root);
    return minimumNode ? minimumNode.value : null;
  }

  #getMinValueNode(node) {
    if (!node) {
      return null;
    }

    if (!node.left) {
      return node;
    }

    return this.#getMinValueNode(node.left);
  }

  /**
   * Recursively gets the maximum value in the tree.
   * @returns {number} The maximum value.
   */
  getMaxValue() {
    return this.#getMaxValueImpl(this.root);
  }

  #getMaxValueImpl(node) {
    if (!node) {
      return null;
    }

    if (!node.right) {
      return node.value;
    }

    return this.#getMaxValueImpl(node.right);
  }

  /**
   * Recursively deletes a given value from the tree.
   * @param {number} value The value to be deleted.
   * @returns {Node} The root node after deletion.
   */
  delete(value) {
    this.root = this.#deleteImpl(value, this.root);
    return this.root;
  }

  #deleteImpl(value, node) {
    if (!node) {
      return null;
    }

    if (value < node.value) {
      node.left = this.#deleteImpl(value, node.left);
      return node;
    } else if (value > node.value) {
      node.right = this.#deleteImpl(value, node.right);
      return node;
    }

    if (!node.left && !node.right) {
      return null;
    }

    if (!node.left) {
      return node.right;
    }

    if (!node.right) {
      return node.left;
    }

    // Node with two children, get the inorder successor
    // (smallest in the right subtree)
    const tempNode = this.#getMinValueNode(node.right);
    node.value = tempNode.value;
    node.right = this.#deleteImpl(tempNode.value, node.right);

    return node;
  }
}
