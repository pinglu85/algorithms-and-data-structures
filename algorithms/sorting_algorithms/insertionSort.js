function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
    }
  }
  return arr;
}

const array = [34, 8, 22, 10, 19, 17];
console.log(insertionSort(array));
