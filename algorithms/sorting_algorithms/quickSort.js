function pivot(arr) {
  const pivot = arr[0];
  let swapIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      swapIndex++;
      [arr[swapIndex], arr[i]] = [arr[i], arr[swapIndex]];
    }
  }
  [arr[0], arr[swapIndex]] = [arr[swapIndex], arr[0]];
  return swapIndex;
}

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const copied = [...arr];
  const pivotIndex = pivot(copied);
  const left = quickSort(copied.slice(0, pivotIndex));
  const right = quickSort(copied.slice(pivotIndex + 1));
  return left.concat(copied[pivotIndex], right);
}

const arr = [4, 8, 2, 1, 5, 7, 6, 3];
console.log(quickSort(arr));
