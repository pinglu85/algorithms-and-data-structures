/**
 * Partitions an subarray around a pivot in place.
 * @param {number[]} arr The array to be sorted.
 * @param {number} lo The starting index of the subarray to be partitioned.
 * @param {number} hi The ending index (inclusive) of the subarray to be partitioned.
 * @returns {number} The index of where the pivot ends up.
 */
function partition(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}

/**
 * Sorts an array of elements in place.
 * @param {number[]} arr The array to be sorted.
 * @param {number} lo The starting index of the array to be sorted.
 * @param {number} hi The ending index of the array to be sorted.
 */
function quickSortInPlace(arr, lo, hi) {
  if (lo >= hi) {
    return;
  }

  const pivotIndex = partition(arr, lo, hi);
  quickSortInPlace(arr, lo, pivotIndex - 1);
  quickSortInPlace(arr, pivotIndex + 1, hi);
}

/**
 * Makes a shallow copy of the original array and sorts the copied array of elements.
 * Based on Lomuto partition scheme.
 * @param {number[]} arr The array to be sorted.
 * @returns {number[]} Returns the sorted shallow copy of the original array.
 */
function quickSort(arr) {
  const copiedArr = [...arr];
  quickSortInPlace(copiedArr, 0, arr.length - 1);
  return copiedArr;
}

const arr = [4, 8, 2, 1, 5, 7, 6, 3];
console.log(quickSort(arr));
