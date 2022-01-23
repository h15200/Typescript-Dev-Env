function completeSudoku(matrix: number[][]): number[][] {
  // 1 - 9 must be used just once across, up and down, and each 3x3 cell must also have 1-9 just once

  // go across matrix, look for candidates by filtering exising row, col, sub-matrix.
  // plug it in and try it, update the 3 parameters
  // if complete, return matrix
  // if not, return back to try something else
  // undo it, plug in something else
  return solveBoard(matrix)!;

  function solveBoard(matrix: number[][]) {
    if (isComplete(matrix)) return matrix;

    for (let y = 0; y < matrix.length; y++) {
      const existingNumRow = getCurrRowNums(y);
      for (let x = 0; x < matrix[0].length; x++) {
        const num = matrix[y][x];
        if (num === 0) {
          const existingColRow = getCurrColNums(x);
          const existingSubGridNums = getSubGridNums(y, x);
          let isCandidate = false;
          for (let i = 1; i <= 9; i++) {
            console.log("checking i", i);
            if (
              !existingNumRow.includes(i) &&
              !existingColRow.includes(i) &&
              !existingSubGridNums.includes(i)
            ) {
              console.log("trying i", i);
              // try it
              isCandidate = true;
              existingNumRow.push(i);
              matrix[y][x] = i;
              const result: void | number[][] = solveBoard(matrix);
              if (result === undefined) {
                console.log("returning and backgracking");
                existingNumRow.pop();
                matrix[y][x] = 0;
                isCandidate = false;
              } else if (result !== undefined) {
                return matrix;
              }
            }
          }
          if (isCandidate == false) {
            console.log("no good", matrix[y]);
            return;
          }
        }
      }
    }
  }
  function isComplete(matrix: number[][]) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[0].length; col++) {
        const num = matrix[row][col];
        if (num === 0) return false;
      }
    }
    return true;
  }

  function getCurrRowNums(row: number): number[] {
    const rowArr = matrix[row];

    const output: number[] = [];
    for (const num of rowArr) {
      if (num !== 0 && !output.includes(num)) {
        output.push(num);
      }
    }
    return output;
  }

  function getCurrColNums(col: number): number[] {
    const output: number[] = [];
    for (let row = 0; row < matrix.length; row++) {
      const num = matrix[row][col];
      if (num !== 0 && !output.includes(num)) {
        output.push(num);
      }
    }
    return output;
  }

  function getSubGridNums(y: number, x: number): number[] {
    const output: number[] = [];
    const startingRow = y - (y % 3);
    const startingCol = x - (x % 3);
    for (let row = startingRow; row <= startingRow + 2; row++) {
      for (let col = startingCol; col <= startingCol + 2; col++) {
        const num = matrix[row][col];
        if (num !== 0 && !output.includes(num)) {
          output.push(num);
        }
      }
    }
    return output;
  }
}

const input = [
  [8, 4, 9, 0, 0, 3, 5, 7, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 0, 0, 9, 0, 0, 8, 3],
  [0, 0, 0, 9, 4, 6, 7, 0, 0],
  [0, 8, 0, 0, 5, 0, 0, 4, 0],
  [0, 0, 6, 8, 7, 2, 0, 0, 0],
  [5, 7, 0, 0, 1, 0, 0, 0, 4],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 2, 1, 7, 0, 0, 8, 6, 5],
];

// console.log(completeSudoku(input));

// answer is
// 8 4 9 1 6 3 5 7 2

// 3 1 5 2 8 7 4 9 6

// 7 6 2 4 9 5 1 8 3

// 1 5 3 9 4 6 7 2 8

// 2 8 7 3 5 1 6 4 9

// 4 9 6 8 7 2 3 5 1

// 5 7 8 6 1 9 2 3 4

// 6 3 4 5 2 8 9 1 7

// 9 2 1 7 3 4 8 6 5

function reverseWords(s: string): string {
  const output: string[] = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === " ") {
      const newIndex = addWhitespaceAndGetNewIdx(i);
      i = newIndex;
    } else {
      const newIndex = addWordAndGetNewIdx(i);
      i = newIndex;
    }
  }

  return output.reverse().join("");

  function addWhitespaceAndGetNewIdx(index: number): number {
    let i = index;
    const string: string[] = [];
    while (s[i] === " " && i < s.length) {
      string.push(" ");
      i++;
    }
    output.push(string.join(""));
    return i;
  }

  function addWordAndGetNewIdx(index: number): number {
    let i = index;
    const word: string[] = [];
    while (s[i] !== " " && i < s.length) {
      word.push(s[i]);
      i++;
    }
    output.push(word.join(""));
    return i;
  }
}

// console.log(reverseWords("0   word1  word2 "));

function sort(nums: number[]): number[] {
  // use quick sort

  return quickSort(0, nums.length - 1);

  function quickSort(start: number, end: number): number[] {
    if (start >= end) return nums.slice(start, end + 1);
    let left = start + 1;
    let right = end;
    const pivotNum = nums[start];
    // [3,6,2,7] if left is bigger than pivot, switch with something smaller from right
    // [3,2,6, 7]
    // [2,3, 6, 7 ]
    while (left <= right) {
      if (nums[left] < pivotNum) {
        left++;
      } else {
        // if leftVal is bigger than pivot, find one that's smaller on the right
        if (nums[right] < pivotNum) {
          // swap left and right
          [nums[left], nums[right]] = [nums[right], nums[left]];
        } else {
          right--;
        }
      }
    }
    // swap start and left
    [nums[start], nums[right]] = [nums[right], nums[start]];
    // start - right - 1
    // right + 1 end
    return [
      ...quickSort(start, right - 1),
      pivotNum,
      ...quickSort(right + 1, end),
    ];
  }
}

// console.log(sort([6, 3, 1, 6, 78, 23, 7, 4, 78, 3]));

// given an unsorted set of numbers from 1 to N with exactly 2 missing ints, find them

function findTwoMissingInt(nums: number[]): number[] {
  // just run the incomplete list once, then a complete one once and use a hash
  const hash: { [key: number]: boolean } = {};
  for (let i = 1; i <= nums.length + 2; i++) {
    hash[i] = true;
  }
  for (const num of nums) {
    if (hash[num] === true) {
      delete hash[num];
    }
  }
  return Object.keys(hash).map((stringNum) => parseInt(stringNum, 10));
}

console.log(findTwoMissingInt([1, 3, 5, 6, 7, 8, 9, 10]));
