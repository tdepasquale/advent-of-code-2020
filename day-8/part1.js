const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

let currentLine = 0;
let accumulator = 0;
let visitedLines = {};

const handleNop = () => {
  currentLine++;
  parseLine();
};

const handleAcc = (argument) => {
  if (argument.includes("+")) {
    const [blank, number] = argument.split("+");
    accumulator += parseInt(number);
  } else if (argument.includes("-")) {
    const [blank, number] = argument.split("-");
    accumulator -= parseInt(number);
  }
  currentLine++;
  parseLine();
};

const handleJmp = (argument) => {
  if (argument.includes("+")) {
    const [blank, number] = argument.split("+");
    currentLine += parseInt(number);
  } else if (argument.includes("-")) {
    const [blank, number] = argument.split("-");
    currentLine -= parseInt(number);
  }
  parseLine();
};

const parseLine = () => {
  if (visitedLines[currentLine]) return;
  visitedLines[currentLine] = true;

  const line = textByLine[currentLine];
  const [instruction, argument] = line.split(" ");
  switch (instruction) {
    case "nop":
      handleNop();
      break;
    case "acc":
      handleAcc(argument);
      break;
    case "jmp":
      handleJmp(argument);
      break;

    default:
      break;
  }
};

parseLine();
console.log(accumulator);
