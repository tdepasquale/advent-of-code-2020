const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

let currentGroup = {};
let totalYesResponses = 0;

const countYesResponses = () => {
  const yesResponses = Object.keys(currentGroup).length;
  totalYesResponses += yesResponses;
  currentGroup = {};
};

const processLine = (line) => {
  const lineContent = line.trim();
  if (lineContent === "") countYesResponses();
  else {
    for (let i = 0; i < lineContent.length; i++) {
      const currentLetter = lineContent[i];
      currentGroup[currentLetter] = true;
    }
  }
};

textByLine.forEach((line) => processLine(line));
//make sure the last group is counted
countYesResponses();
console.log(totalYesResponses);
