const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

let currentGroupResponses = {};
let peopleInCurrentGroup = 0;
let totalYesResponses = 0;

const reset = () => {
  peopleInCurrentGroup = 0;
  currentGroupResponses = {};
};

const countYesResponses = () => {
  const letters = Object.keys(currentGroupResponses);
  letters.forEach((letter) => {
    //if everyone in the group said yes
    if (currentGroupResponses[letter] === peopleInCurrentGroup)
      totalYesResponses++;
  });
  reset();
};

const processLine = (line) => {
  const lineContent = line.trim();
  if (lineContent === "") countYesResponses();
  else {
    peopleInCurrentGroup++;
    for (let i = 0; i < lineContent.length; i++) {
      //tally up the yes responses for each letter in the group
      const currentLetter = lineContent[i];
      if (currentGroupResponses[currentLetter])
        currentGroupResponses[currentLetter]++;
      else currentGroupResponses[currentLetter] = 1;
    }
  }
};

textByLine.forEach((line) => processLine(line));
//make sure the last group is counted
countYesResponses();
console.log(totalYesResponses);
