const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const map = text.split("\n");

let currentRow = 0;
let currentCol = 0;
const rowWidth = map[0].trim().length;
const colHeight = map.length;
let totalTrees = 0;

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

const traverse = () => {
  while (true) {
    moveDown(1);
    if (isAtFinish()) break;
    moveRight(3);
    checkForTree();
  }
};

traverse();
console.log("total trees: ", totalTrees);
