class PriorityQueue {
  #compare;
  #heap;

  constructor(compare) {
    this.#compare = compare;
    this.#heap = [];
  }

  /**
   * Inserts an element to the priority queue.
   * @param {number} element The element to be inserted.
   */
  insert(element) {
    this.#heap.push(element);
    const heapSize = this.size();

    if (heapSize === 1) {
      return;
    }

    this.#heapifyUp(heapSize - 1);
  }

  /**
   * Removes the head element from the priority queue.
   * @returns {number} The head element.
   */
  pull() {
    const heapSize = this.size();

    if (heapSize <= 1) {
      return this.#heap.pop();
    }

    this.#swap(0, heapSize - 1);
    const head = this.#heap.pop();
    this.#heapifyDown(0);
    return head;
  }

  /**
   * Returns the head element of the priority queue.
   * @returns {number} The head element.
   */
  peek() {
    return this.#heap[0];
  }

  /**
   * Gets the current size of the priority queue.
   * @returns {number} The size of the priority queue.
   */
  size() {
    return this.#heap.length;
  }

  // Performs a up-heap operation for the priority queue.
  #heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex < 0) {
      return;
    }

    const comparison = this.#compare(
      this.#heap[index],
      this.#heap[parentIndex]
    );
    if (comparison < 0) {
      this.#swap(parentIndex, index);
      this.#heapifyUp(parentIndex);
    }
  }

  // Performs a down-heap operation for the priority queue.
  #heapifyDown(parentIndex) {
    const leftIndex = parentIndex * 2 + 1;
    const rightIndex = parentIndex * 2 + 2;
    let swappableIndex = parentIndex;
    const heapSize = this.size();
    let comparison = 0;

    if (leftIndex < heapSize) {
      comparison = this.#compare(
        this.#heap[leftIndex],
        this.#heap[swappableIndex]
      );
      if (comparison < 0) {
        swappableIndex = leftIndex;
      }
    }

    if (rightIndex < heapSize) {
      comparison = this.#compare(
        this.#heap[rightIndex],
        this.#heap[swappableIndex]
      );
      if (comparison < 0) {
        swappableIndex = rightIndex;
      }
    }

    if (swappableIndex !== parentIndex) {
      this.#swap(swappableIndex, parentIndex);
      this.#heapifyDown(swappableIndex);
    }
  }

  // Swaps two elements in the priority queue using indices.
  #swap(i, j) {
    [this.#heap[i], this.#heap[j]] = [this.#heap[j], this.#heap[i]];
  }
}

module.exports = PriorityQueue;
