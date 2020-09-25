function sudoku(
  puzzle,
  init = true,
  rows = {},
  columns = {},
  boxes = {},
  zeros = 0
) {
  if (init) {
    // Store the values that are not 0 to the corresponding row in rows
    // object, and to the corresponding 3 * 3 box in boxes object.
    // Get the number of zeros.
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (!rows[row]) {
          rows[row] = {};
        }

        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        if (!boxes[boxIndex]) {
          boxes[boxIndex] = {};
        }

        const currNum = puzzle[row][col];
        if (currNum) {
          rows[row][currNum] = 1;
          boxes[boxIndex][currNum] = 1;
        } else {
          zeros++;
        }
      }
    }
    // Store the values that are not 0 to the corresponding column in
    // columns object.
    for (let col = 0; col < 9; col++) {
      for (let row = 0; row < 9; row++) {
        if (!columns[col]) {
          columns[col] = {};
        }

        const currNum = puzzle[row][col];
        if (currNum) {
          columns[col][currNum] = 1;
        }
      }
    }
    init = false;
  }

  if (!zeros) {
    return puzzle;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currNum = puzzle[row][col];
      if (currNum === 0) {
        const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        for (let n = 1; n <= 9; n++) {
          if (!rows[row][n] && !columns[col][n] && !boxes[boxIndex][n]) {
            puzzle[row][col] = n;
            rows[row][n] = 1;
            columns[col][n] = 1;
            boxes[boxIndex][n] = 1;
            zeros--;

            const solvable = sudoku(puzzle, init, rows, columns, boxes, zeros);
            if (!solvable) {
              puzzle[row][col] = 0;
              rows[row][n] = 0;
              columns[col][n] = 0;
              boxes[boxIndex][n] = 0;
              zeros++;
            } else {
              return solvable;
            }
          }
        }
        return false;
      }
    }
  }
}

const puzzle = [
  [0, 9, 0, 6, 0, 0, 0, 0, 0],
  [0, 0, 0, 8, 3, 1, 0, 0, 0],
  [1, 6, 0, 0, 0, 0, 2, 0, 0],
  [0, 7, 0, 0, 9, 0, 1, 0, 0],
  [0, 0, 0, 0, 5, 7, 9, 0, 0],
  [0, 0, 6, 0, 0, 0, 0, 0, 3],
  [0, 3, 8, 0, 0, 5, 0, 0, 0],
  [6, 0, 0, 0, 0, 0, 7, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
];
console.log(sudoku(puzzle));
