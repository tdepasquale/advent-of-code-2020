const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const map = text.split("\n");

let totalTrees = 0;
let currentRow = 0;
let currentCol = 0;
const rowWidth = map[0].trim().length;
const colHeight = map.length;

const moveRight = (numOfSpaces) => {
  currentRow += numOfSpaces;
  if (currentRow >= rowWidth) currentRow -= rowWidth;
};

const moveDown = (numOfSpaces) => {
  currentCol += numOfSpaces;
};

const isAtFinish = () => {
  return currentCol >= colHeight;
};

const getCurrentPosition = () => {
  return map[currentCol][currentRow];
};

const isOnTree = () => {
  return getCurrentPosition() === "#";
};

const checkForTree = () => {
  if (isOnTree()) totalTrees++;
};

const reset = () => {
  totalTrees = 0;
  currentRow = 0;
  currentCol = 0;
};

const traverse = (right, down) => {
  reset();
  while (true) {
    moveDown(down);
    if (isAtFinish()) break;
    moveRight(right);
    checkForTree();
  }
  return totalTrees;
};

const slope1 = traverse(1, 1);
const slope2 = traverse(3, 1);
const slope3 = traverse(5, 1);
const slope4 = traverse(7, 1);
const slope5 = traverse(1, 2);
console.log(slope1, slope2, slope3, slope4, slope5);

const total = slope1 * slope2 * slope3 * slope4 * slope5;
console.log(total);
