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

// console.log(findTwoMissingInt([1, 3, 5, 6, 7, 8, 9, 10]));

// given an arr, return an arr of top k largest nums
function topKth(nums: number[], k: number): number[] {
  const sorted = nums.sort((a, b) => b - a); // descending order
  const output: number[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (output.length < k) {
      if (!output.includes(sorted[i])) {
        output.push(sorted[i]);
      }
    }
  }
  return output;
}

// console.log(topKth([1, 5, 1, 5, 1], 5));

/**
 Do not return anything, modify nums in-place instead.
 */
/**
 Do not return anything, modify nums in-place instead.
 */
/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
  if (nums.length === 1) return;
  // [1,4,7,2,6,7, 3, 2, 1] -> [1, 4, 7, 2, 7, 1, 2, 3, 6]
  //          i-1 i

  // travel backwards until a number i is smaller than i - 1
  // if this doesn't exist, just return ascending order
  // if found, first flip those two nums
  // take remaining after the flipped index and order in ascending

  // first just find if there is a digit from the end where i is bigger than i - 1
  let flipIdx = -1;
  for (let i = nums.length - 1; i >= 1; i--) {
    if (nums[i] > nums[i - 1]) {
      flipIdx = i;
      break;
    }
  }
  if (flipIdx === -1) {
    nums.sort((a, b) => a - b);
    return;
  }

  // flip idx - 1 is the "LEFT". Now check all nums from idx to end where it's bigger than idx-1 val, but the smallest

  let rightFlip = flipIdx;
  let minValue = nums[flipIdx];
  for (let i = flipIdx; i < nums.length; i++) {
    if (nums[i] > nums[flipIdx - 1] && nums[i] < minValue) {
      minValue = nums[i];
      rightFlip = i;
    }
  }

  // now flip
  [nums[flipIdx - 1], nums[rightFlip]] = [nums[rightFlip], nums[flipIdx - 1]];

  // partially sort the rest in ascending order
  const choicesLeft = [...nums.slice(flipIdx, nums.length)];
  for (let i = flipIdx; i < nums.length; i++) {
    const min = Math.min(...choicesLeft);
    const idx = choicesLeft.indexOf(min);
    nums[i] = min;
    choicesLeft.splice(idx, 1);
  }
}

// console.log(nextPermutation([1, 3, 2]));

function numIslands(grid: string[][]): number {
  // if we're allowed to mutate matrix, isVisited = "2"
  // loop through matrix
  // if "1", first turn to "1", then search all 4 neighbors
  // if a neighbor is "1", add to queue. ignore others

  let totalIslands = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "1") {
        checkIsland(y, x);
      }
    }
  }
  return totalIslands;

  function checkIsland(y: number, x: number): void {
    totalIslands++;
    // now search all neighbors
    const queue: number[][] = [[y, x]];
    grid[y][x] = "2";
    while (queue.length) {
      const coords = queue.shift()!;
      const [yCoord, xCoord] = coords;
      // get all neighbors and inspect
      const neighborCoord = [
        [yCoord - 1, xCoord],
        [yCoord + 1, xCoord],
        [yCoord, xCoord - 1],
        [yCoord, xCoord + 1],
      ];
      for (const coord of neighborCoord) {
        const [neighborY, neighborX] = coord;
        if (
          grid[neighborY] !== undefined &&
          grid[neighborY][neighborX] === "1"
        ) {
          grid[neighborY][neighborX] = "2";
          queue.push([neighborY, neighborX]);
        }
      }
    }
  }
}

// console.log(
//   numIslands([
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "0",
//       "1",
//       "1",
//     ],
//     [
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//     ],
//     [
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "0",
//       "0",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "0",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "1",
//       "1",
//       "1",
//       "1",
//       "0",
//       "0",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//     [
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//       "1",
//     ],
//   ]),
// );

// function combinationSum(candidates: number[], target: number): number[][] {
//   /*
//   is any of candidates equal? then add that to current solution
//     is any candidate less than this? - coin solutions(s) and add current candidate to that list

//   ex. [2, 3, 5], 8

//   target      solution
//   0              []
//   1              []
//   2              [[2]add 2 as it is equal to target. check solution(0) and add any existing solutions + 2
//   3              [[3]since solution(1) is null, d
//   4             sol(2) + 2   and sol(1) + 3 [[2, 2],
//   5          self, sol[3] + 2, sol[2] + 3   [5, [3, 2], [2, 3]] duplicate
//   6           [3, 3], [2,2,2];
//   7          [5,2], [2,2,3], [3,2,2,][2,3,2]
//   8        [5, 3], [5,3], [3,2,3][2,3,3], [3,3,2, ][, 2,2,2, 2]

//   */

//   // store each solution as an array of strings instead ["123", "234"] so it's easy to find unique ones

//   const solutions: number[][][] = [];
//   solutions[0] = [];

//   for (let i = 1; i <= target; i++) {
//     const solution: number[][] = [];
//     for (const candidate of candidates) {
//       if (candidate === i) {
//         solution.push([candidate]);
//       }
//       if (candidate < i && solutions[i - candidate].length > 0) {
//         for (let j = 0; j < solutions[i - candidate].length; j++) {
//           const newSolution = [...solutions[i - candidate][j]]; // ex - [1,2,3]
//           newSolution.push(candidate);
//           const sorted = newSolution.sort((a, b) => a - b);
//           if (findIsNotDuplicate(solution, sorted)) {
//             solution.push(sorted);
//           }
//         }
//       }
//     }
//     solutions[i] = solution;
//   }

//   // solutions[target] is ["123", "156", "356" ] etc..
//   return solutions[target];
// }
// function findIsNotDuplicate(
//   solutions: number[][],
//   maybeDupe: number[],
// ): boolean {
//   for (const numArray of solutions) {
//     if (JSON.stringify(numArray) === JSON.stringify(maybeDupe)) {
//       return false;
//     }
//   }
//   return true;
// }

function combinationSum(candidates: number[], target: number): number[][] {
  /*
 for each candidate, take it  and find sum(target - candidate)
 make sure to backtrack before checking another candidate
  */

  const output: number[][] = []; //

  recurse([], target, 0);
  return output;

  function recurse(
    arr: number[],
    target: number,
    candidateIndex: number,
  ): void {
    console.log("arr", arr, "target", target);
    if (target < 0) {
      return;
    }
    if (target === 0) {
      console.log("target hit", arr);
      output.push([...arr]);
      return;
    }
    for (let i = candidateIndex; i < candidates.length; i++) {
      const candidate = candidates[i];
      arr.push(candidate);
      recurse(arr, target - candidate, i);
      arr.pop();
    }
  }
}
console.log(combinationSum([3, 12, 9, 11, 6, 7, 8, 5, 4], 15));
