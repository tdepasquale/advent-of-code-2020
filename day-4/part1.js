const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

let currentLine = 0;
let currentPassport = {};
let totalValidPassports = 0;

const hasReqField = (key) => {
  if (key in currentPassport) return true;
  else return false;
};

const validatePassport = () => {
  if (
    hasReqField("byr") &&
    hasReqField("iyr") &&
    hasReqField("eyr") &&
    hasReqField("hgt") &&
    hasReqField("hcl") &&
    hasReqField("ecl") &&
    hasReqField("pid")
  ) {
    totalValidPassports++;
  } else {
    console.log(currentPassport);
  }
};

const isEmptyLine = () => {
  if (textByLine[currentLine].trim() === "") return true;
  else return false;
};

const storeValuesInPassport = () => {
  const separateItems = textByLine[currentLine].split(" ");
  separateItems.forEach((item) => {
    const [key, value] = item.split(":");
    currentPassport[key] = value;
  });
};

const processLine = () => {
  if (!isEmptyLine()) {
    storeValuesInPassport();
  } else {
    validatePassport();
    currentPassport = {};
  }
  currentLine++;
};

const processLastPassport = () => {
  if (Object.keys(currentPassport).length !== 0) validatePassport();
};

textByLine.forEach((line) => processLine());
processLastPassport();
console.log(totalValidPassports);
