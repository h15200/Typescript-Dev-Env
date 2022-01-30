function uniquePathsWithObstacles(obstacleGrid: number[][]): number {
  let uniquePaths = 0;
  if (obstacleGrid[0][0] === 1) return 0;
  const cache: number[][] = new Array(obstacleGrid.length);
  for (let i = 0; i < cache.length; i++) {
    cache[i] = new Array(obstacleGrid[0].length).fill(-1);
    // -1 is void, 1 is true, 0 is false
  }
  travel(0, 0, [[0, 0]]);
  return uniquePaths;

  function travel(y: number, x: number, history: number[][]): void {
    if (
      cache[y][x] === 1 ||
      (y === obstacleGrid.length - 1 && x === obstacleGrid[0].length - 1)
    ) {
      for (const coord of history) {
        const [y, x] = coord;
        cache[y][x] = 1;
      }
      console.log("cache after success", cache);
      uniquePaths++;
      return;
    }

    // right [y, x + 1];
    //  down  [y + 1, x];

    if (!isValid(y, x + 1) && !isValid(y + 1, x)) {
      cache[y][x] = 0;
      if (isInbound(y, x + 1)) cache[y][x + 1] = 0;
      if (isInbound(y + 1, x)) cache[y + 1][x] = 0;
      console.log("cache after false", cache);
    }

    if (isValid(y, x + 1)) {
      history.push([y, x + 1]);
      travel(y, x + 1, history);
      history.pop();
    }
    if (isValid(y + 1, x)) {
      history.push([y + 1, x]);
      travel(y + 1, x, history);
      history.pop();
    }
  }

  function isInbound(y: number, x: number): boolean {
    if (obstacleGrid[y] === undefined) return false;
    if (obstacleGrid[y][x] === undefined) return false;
    return true;
  }

  function isValid(y: number, x: number): boolean {
    if (obstacleGrid[y] === undefined) return false;
    if (obstacleGrid[y][x] === undefined) return false;
    if (obstacleGrid[y][x] === 1) return false;

    return true;
  }
}

// the above way takes a lot more time. better to do this way

function uniquePathsWithObstacles2(obstacleGrid: number[][]): number {
  // similar to Lavenstein. you can just add every total based on:
  //  curr grid ways = ways of grid to left + ways of grid above
  // if curr grid has an obstacle, it is 0
  if (obstacleGrid[0][0] === 1) return 0;
  let paths = 0;

  const dpArr = JSON.parse(JSON.stringify(obstacleGrid));
  // at this point 0,0 has no obstacle, to initialize to 1
  dpArr[0][0] = 1;
  // first just get top row, 2nd col
  for (let i = 1; i < dpArr[0].length; i++) {
    if (obstacleGrid[0][i] === 1) {
      dpArr[0][i] = 0;
    } else {
      dpArr[0][i] = dpArr[0][i - 1];
    }
  }

  // starting on 2nd row
  for (let y = 1; y < dpArr.length; y++) {
    for (let x = 0; x < dpArr[0].length; x++) {
      const top = dpArr[y - 1] && dpArr[y - 1][x];
      const left = dpArr[y][x - 1];
      if (obstacleGrid[y][x] === 1) dpArr[y][x] = 0;
      else {
        let total = 0;
        if (top) total += top;
        if (left) total += left;
        dpArr[y][x] = total;
        // console.log("total at", y, x, "is", total);
      }
    }
  }
  return dpArr[dpArr.length - 1][dpArr[0].length - 1];
}

// console.log(
//   uniquePathsWithObstacles2([
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 1],
//     [0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0],
//   ]),
// );

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  /*
  make {
  0: [1,2],
  1: [],
  3: [2],
  etc..
  
  }
  
  go through obj, and add node without any prereqs, then remove that prereq from list
  */

  const graph: { [key: string]: number[] } = {};
  for (let i = 0; i < numCourses; i++) {
    graph[i] = getPrerequisites(i);
  }

  const output: number[] = [];

  let runAgain = true;
  while (runAgain) {
    let shouldRunAgain = false;
    for (const key in graph) {
      if (graph[key].length === 0) {
        output.push(parseInt(key));
        delete graph[key];
        const runAgain = removePrereq(parseInt(key));
        if (runAgain === true) shouldRunAgain = true;
      }
    }
    runAgain = shouldRunAgain;
  }

  if (output.length === numCourses) return output;
  return [];

  function stillDeletable(): boolean {
    const arr = Object.values(graph);
    if (arr.some((i) => i.length === 0)) return true;
    return false;
  }

  function getPrerequisites(idx: number): number[] {
    const output: number[] = [];
    for (const pair of prerequisites) {
      if (pair[0] === idx && !output.includes(pair[1])) {
        output.push(pair[1]);
      }
    }
    return output;
  }

  function removePrereq(idx: number): boolean {
    let runAgain = false;
    for (const key in graph) {
      graph[key] = graph[key].filter((i) => i !== idx);
      if (graph[key].length === 0) runAgain = true;
    }
    return runAgain;
  }
}

// console.log(findOrder(2, [[0, 1]]));

function countSubstrings(s: string): number {
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = s.length - 1; j >= i; j--) {
      console.log("i", i, "j", j);
      if (s[i] === s[j]) {
        if (getIsPalindrome(i, j) === true) {
          count++;
        }
      }
    }
  }
  return count;

  function getIsPalindrome(leftIdx: number, rightIdx: number): boolean {
    console.log("left", leftIdx, "right", rightIdx);
    let left = leftIdx;
    let right = rightIdx;
    if (left === right) return true;

    while (left < right) {
      console.log("left", left, "right", right);
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }
}

console.log(countSubstrings("fdsklf"));
