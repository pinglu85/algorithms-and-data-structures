/**
 * Sorts an array of elements in place.
 * @param {number[]} arr The array to be sorted.
 */
function radixSort(arr) {
  const max = Math.max(...arr);

  let place = 1;

  while (Math.floor(max / place) > 0) {
    countingSort(arr, place);
    place *= 10;
  }
}

/**
 * Sorts an array of elements according to significant places.
 * @param {*} arr The array to be sorted.
 * @param {*} place The significant place.
 */
function countingSort(arr, place) {
  const arrLen = arr.length;
  // The output array that will have sorted array.
  const output = Array(arrLen).fill(0);
  const count = Array(10).fill(0);

  // Find the total count of each unique digit in current place
  // of elements and store the count at corresponding index in count array.
  // Consider array [10, 70, 4, 3] and current significant place is 1,
  // we get two 0, one 3 and one 4, so count array is [2, 0, 0, 1, 1, 0, 0, 0, 0, 0]
  for (let i = 0; i < arrLen; i++) {
    let index = Math.floor(arr[i] / place);
    index = Math.floor(index % 10);
    count[index]++;
  }

  // Calculate cummulative count so that count[i] now contains actual position of
  // this digit in output array.
  // Consider array [10, 70, 4, 3] and current significant place is 1,
  // count array is [2, 0, 0, 1, 1, 0, 0, 0, 0, 0], count array after calculating
  // cummulative count becomes [2, 2, 2, 3, 4, 4, 4, 4, 4, 4].
  // Because we have two elements that have 0 at current place,
  // their actual index in output array will be 0 and 1, and the index of next
  // digit will be 2.
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array. Place the elements in sorted order
  for (let i = arrLen - 1; i >= 0; i--) {
    let index = Math.floor(arr[i] / place);
    index = Math.floor(index % 10);
    output[count[index] - 1] = arr[i];
    count[index]--;
  }

  // Copy the output array to original array,
  // so that original array now contains sorted numbers.
  for (let i = 0; i < arrLen; i++) {
    arr[i] = output[i];
  }
}

const arr = [170, 45, 75, 90, 802, 24, 2, 66];
radixSort(arr);
console.log(arr);
