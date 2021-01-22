class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  #head;
  #tail;
  #length;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
  }

  /**
   * Adds an element to the end of the queue.
   * @param {*} value The element to be added.
   * @returns {number} The new length of the queue.
   */
  enqueue(value) {
    const node = new Node(value);

    if (this.isEmpty()) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }

    return ++this.#length;
  }

  /**
   * Removes the element at the front of the queue.
   * @returns {*} The element at the front of the queue.
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const currHead = this.#head;
    this.#head = currHead.next;
    currHead.next = null;
    this.#length--;

    if (this.isEmpty()) {
      this.#tail = null;
    }

    return currHead.value;
  }

  /**
   * Checks if the queue is empty.
   * @returns {boolean} Whether the queue is empty.
   */
  isEmpty() {
    return this.#length === 0;
  }

  /**
   * Gets the number of elements in the queue.
   * @returns {number} The number of elements in the queue.
   */
  get length() {
    return this.#length;
  }
}

module.exports = Queue;
