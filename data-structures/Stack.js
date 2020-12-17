class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Stack {
  #tail;
  #length;

  constructor() {
    this.#tail = null;
    this.#length = 0;
  }

  /**
   * Adds an element to top of the stack.
   * @param {*} value The element to be added.
   * @returns {number} The new length of the stack.
   */
  push(value) {
    const node = new Node(value, this.#tail);
    this.#tail = node;
    return ++this.#length;
  }

  /**
   * Removes the element at the top of the stack.
   * @returns {*} The popped element.
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const node = this.#tail;
    this.#tail = node.next;
    node.next = null;
    this.#length--;
    return node.value;
  }

  /**
   * Returns the element at the top of the stack.
   * @returns {*} The element at the top of the stack.
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#tail.value;
  }

  /**
   * Checks if the stack is empty.
   * @returns {boolean} Whether the stack is empty.
   */
  isEmpty() {
    return this.#length === 0;
  }

  /**
   * Gets the number of elements in the stack.
   * @returns {number} The number of elements in the stack.
   */
  get length() {
    return this.#length;
  }
}
