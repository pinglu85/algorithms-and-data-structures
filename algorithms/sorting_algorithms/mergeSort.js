/**
 * Merges two sorted arrays into one.
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {number[]} A sorted merged array
 */
function merge(arr1, arr2) {
  const mergedArr = [];
  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      mergedArr.push(arr1[i]);
      i++;
    } else {
      mergedArr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    mergedArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    mergedArr.push(arr2[j]);
    j++;
  }

  return mergedArr;
}

/**
 * Makes a shallow copy of the original array and sorts the copied array of elements.
 * @param {number[]} arr The array to be sorted.
 * @returns {number[]} The sorted shallow copy of the original array.
 */
function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

const arr = [19, 1, 4, 0, 33, 20];
console.log(mergeSort(arr));
