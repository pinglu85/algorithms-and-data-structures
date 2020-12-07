const util = require('util');

class Node {
  constructor(value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Adds a node to the end of the list.
   * @param {*} value The value that the node should contains.
   * @returns {number} The new length of the list.
   */
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    return ++this.length;
  }

  /**
   * Removes the last node from the list.
   * @returns {*} The value of the removed node.
   */
  pop() {
    if (!this.head) {
      return null;
    }

    const currTail = this.tail;

    if (!currTail.prev) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = currTail.prev;
      this.tail.next = null;
      currTail.prev = null;
    }

    this.length--;
    return currTail.value;
  }

  /**
   * Removes the first node from the list.
   * @returns {*} The value of the removed node.
   */
  shift() {
    if (!this.head) {
      return null;
    }

    const currHead = this.head;
    if (!currHead.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = currHead.next;
      this.head.prev = null;
      currHead.next = null;
    }
    this.length--;
    return currHead.value;
  }

  /**
   * Adds a node to the beginning of the list.
   * @param {*} value The value that the node should contains.
   * @returns {number} The new length of the list.
   */
  unshift(value) {
    const newNode = new Node(value, null, this.head);
    if (this.head) {
      this.head.prev = newNode;
    } else {
      this.tail = newNode;
    }
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
   * @param {*} value The value that the node should contains.
   * @returns {number} The new length of the list.
   */
  insert(index, value) {
    if (index === 0) {
      return this.unshift(value);
    }

    if (index === this.length - 1) {
      return this.push(value);
    }

    const currNode = this.#traverseNodes(index);
    if (!currNode) {
      return null;
    }

    const newNode = new Node(value, currNode.prev, currNode);

    const prevNode = currNode.prev;
    prevNode.next = newNode;
    currNode.prev = newNode;
    return ++this.length;
  }

  /**
   * Removes the node at that index from the list.
   * @param {number} index
   * @returns {*} The value of the removed node.
   */
  remove(index) {
    if (index === 0) {
      return this.shift();
    }

    if (index === this.length - 1) {
      return this.pop();
    }

    const node = this.#traverseNodes(index);
    if (!node) {
      return null;
    }

    const prevNode = node.prev;
    const nextNode = node.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
    node.prev = null;
    node.next = null;
    return node.value;
  }

  /**
   * Converts the contents of the list into an array.
   * @returns {*[]} An array of element.
   */
  toArray() {
    const arr = [];
    let currNode = this.head;

    while (currNode) {
      arr.push(currNode.value);
      currNode = currNode.next;
    }

    return arr;
  }

  // Returns the node at index.
  #traverseNodes(index) {
    if (index < 0) {
      return null;
    }

    let currNode, dir, step, count;
    const midIndex = (this.length - 1) / 2;

    if (index < midIndex) {
      currNode = this.head;
      dir = 'next';
      step = 1;
      count = 0;
    } else {
      currNode = this.tail;
      dir = 'prev';
      step = -1;
      count = this.length - 1;
    }

    while (currNode) {
      if (count === index) {
        return currNode;
      }
      currNode = currNode[dir];
      count += step;
    }

    return null;
  }
}

const dll = new DoublyLinkedList();
dll.push(1);
dll.push(2);
dll.push(3);
dll.push(4);
console.log(dll.toArray());
