class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Adds a node to the end of the list.
   * @param {*} value The value that the new node should contains.
   * @returns {number} The new length of the list.
   */
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      return ++this.length;
    }

    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }

    tail.next = newNode;
    return ++this.length;
  }

  /**
   * Removes the last node of the list.
   * @returns {*} The value of the removed node.
   */
  pop() {
    if (!this.head) {
      return null;
    }

    let newTail = this.head;
    let tail = this.head.next;

    this.length--;

    if (!tail) {
      this.head = null;
      return newTail.value;
    }

    while (tail.next) {
      newTail = tail;
      tail = newTail.next;
    }

    newTail.next = null;
    return tail.value;
  }

  /**
   * Removes the first node of the list.
   * @returns {*} The value of the removed node.
   */
  shift() {
    if (!this.head) {
      return null;
    }

    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    return currentHead.value;
  }

  /**
   * Adds a node to the beginning of the list.
   * @param {*} value The value that the new node should contains.
   * @returns {number} The new length of the list.
   */
  unshift(value) {
    const newNode = new Node(value, this.head);
    this.head = newNode;
    return ++this.length;
  }

  /**
   * Retrieves the node at that index of the list.
   * @param {number} index
   * @returns {*} The value of the node at that index of the list.
   */
  get(index) {
    const node = this.#traverseNodes(index);
    return node ? node.value : null;
  }

  /**
   * Changes the value of the node at that index of the list
   * to the new value.
   * @param {number} index
   * @param {*} value The new value.
   * @returns {boolean} Whether the change was successful.
   */
  set(index, value) {
    const node = this.#traverseNodes(index);
    if (!node) {
      return false;
    }

    node.value = value;
    return true;
  }

  /**
   * Adds a node to the list at that index.
   * @param {number} index
   * @param {*} value The value that the new node should contains.
   * @returns {number} The new length of the list.
   */
  insert(index, value) {
    if (index === 0) {
      return this.unshift(value);
    }

    const prevNode = this.#traverseNodes(index - 1);
    if (!prevNode) {
      return null;
    }

    const newNode = new Node(value, prevNode.next);
    prevNode.next = newNode;
    return ++this.length;
  }

  /**
   * Removes the node at that index.
   * @param {number} index
   * @returns {*} The value of the removed node.
   */
  remove(index) {
    if (index === 0) {
      return this.shift();
    }

    const removedNode = this.#traverseNodes(index);
    if (!removedNode) {
      return null;
    }

    const prevNode = this.#traverseNodes(index - 1);
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode.value;
  }

  /**
   * Reverses the list iteratively.
   * @returns {Node} The reversed list.
   */
  reverse() {
    let prevNode = null;
    let currentNode = this.head;
    let nextNode = null;

    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }

    this.head = prevNode;
    return this.head;
  }

  /**
   * Reverses the list recursively.
   * @param {Node} [head=the list] The list to be reversed.
   * @returns {Node} The reversed list.
   */
  recursiveReverse(head = this.head) {
    if (!head || !head.next) {
      return head;
    }
    let rest = this.recursiveReverse(head.next);

    // Put the first node at the end.
    head.next.next = head;
    head.next = null;

    return rest;
  }

  /**
   * Prints the value of each node in the list.
   */
  print() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  // Returns the node at index.
  #traverseNodes(index) {
    if (index < 0) {
      return null;
    }

    let currentNode = this.head;
    let count = 0;

    while (currentNode) {
      if (count === index) {
        return currentNode;
      }
      currentNode = currentNode.next;
      count++;
    }

    return null;
  }
}
