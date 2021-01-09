function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const currentVal = arr[i];
    let j = i - 1;
    // for (var j = i - 1; j >= 0 && arr[j] > currentVal; j--)
    while (j >= 0 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
  }
  return arr;
}

const array = [34, 8, 22, 10, 19, 17];
console.log(insertionSort(array));
