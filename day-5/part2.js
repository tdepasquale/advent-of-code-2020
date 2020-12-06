const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

const FRONT_CODE = "F";
const BACK_CODE = "B";
const LEFT_CODE = "L";
const RIGHT_CODE = "R";

const INITIAL_MIN_ROW = 0;
const INITIAL_MAX_ROW = 127;
const INITIAL_MIN_COL = 0;
const INITIAL_MAX_COL = 7;

let minRow = INITIAL_MIN_ROW;
let maxRow = INITIAL_MAX_ROW;
let minCol = INITIAL_MIN_COL;
let maxCol = INITIAL_MAX_COL;

let maxSeatId = 0;
let seatIds = {};

const getLowerHalf = (min, max) => {
  const newMax = Math.floor((min + max) / 2);
  return newMax;
};

const getUpperHalf = (min, max) => {
  const newMin = Math.ceil((min + max) / 2);
  return newMin;
};

const processRowCode = (keyCode) => {
  if (keyCode === FRONT_CODE) maxRow = getLowerHalf(minRow, maxRow);
  else if (keyCode === BACK_CODE) minRow = getUpperHalf(minRow, maxRow);
};

const processColCode = (keyCode) => {
  if (keyCode === LEFT_CODE) maxCol = getLowerHalf(minCol, maxCol);
  else if (keyCode === RIGHT_CODE) minCol = getUpperHalf(minCol, maxCol);
};

const processLineRowCol = (line) => {
  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case FRONT_CODE:
        processRowCode(FRONT_CODE);
        break;
      case BACK_CODE:
        processRowCode(BACK_CODE);
        break;
      case LEFT_CODE:
        processColCode(LEFT_CODE);
        break;
      case RIGHT_CODE:
        processColCode(RIGHT_CODE);
        break;

      default:
        break;
    }
  }
};

const resetValues = () => {
  minRow = INITIAL_MIN_ROW;
  maxRow = INITIAL_MAX_ROW;
  minCol = INITIAL_MIN_COL;
  maxCol = INITIAL_MAX_COL;
};

const calcSeatId = () => {
  return minRow * 8 + minCol;
};

const getMaxSeatId = () => {
  textByLine.forEach((line) => {
    resetValues();
    processLineRowCol(line.trim());
    const seatId = calcSeatId();
    if (seatId > maxSeatId) maxSeatId = seatId;
    seatIds[seatId] = true;
  });
};

const getMissingSeat = () => {
  let currentSeatId = maxSeatId;
  let foundEmpty = false;

  while (true) {
    currentSeatId--;
    if (currentSeatId < 0) return -1;

    if (seatIds[currentSeatId] && foundEmpty) return ++currentSeatId;
    else if (!seatIds[currentSeatId]) foundEmpty = !foundEmpty;
  }
};

getMaxSeatId();
const missingSeat = getMissingSeat();
console.log(missingSeat);
