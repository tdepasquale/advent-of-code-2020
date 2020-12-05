const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

let currentLine = 0;
let currentPassport = {};
let totalValidPassports = 0;

const hasValidBYR = () => {
  if ("byr" in currentPassport) {
    const birthYear = parseInt(currentPassport["byr"]);
    if (birthYear >= 1920 && birthYear <= 2002) return true;
    else {
      console.log("invalid birth year: ", birthYear);
    }
  } else return false;
};

const hasValidIYR = () => {
  if ("iyr" in currentPassport) {
    const issueYear = parseInt(currentPassport["iyr"]);
    if (issueYear >= 2010 && issueYear <= 2020) return true;
    else {
      console.log("invalid issue year: ", issueYear);
    }
  } else return false;
};

const hasValidEYR = () => {
  if ("eyr" in currentPassport) {
    const expirationYear = parseInt(currentPassport["eyr"]);
    if (expirationYear >= 2020 && expirationYear <= 2030) return true;
    else {
      console.log("invalid expiration year: ", expirationYear);
    }
  } else return false;
};

const hasValidHGT = () => {
  if ("hgt" in currentPassport) {
    const heightData = currentPassport["hgt"];
    let height;
    if (heightData.includes("cm")) {
      height = parseInt(heightData.split("c")[0]);
      if (height >= 150 && height <= 193) return true;
    } else if (heightData.includes("in")) {
      height = parseInt(heightData.split("i")[0]);
      if (height >= 59 && height <= 76) return true;
    }

    console.log("invalid height: ", heightData);
  } else return false;
};

const hasValidHCL = () => {
  if ("hcl" in currentPassport) {
    const hairColor = currentPassport["hcl"].trim();
    let colorCodeRegEx = new RegExp("^[#][0-9a-f]{6}$");
    if (colorCodeRegEx.test(hairColor)) return true;
    else {
      console.log("invalid hair color: ", hairColor);
    }
  } else return false;
};

const hasValidECL = () => {
  if ("ecl" in currentPassport) {
    const eyeColor = currentPassport["ecl"].trim();
    if (
      eyeColor === "amb" ||
      eyeColor === "blu" ||
      eyeColor === "brn" ||
      eyeColor === "gry" ||
      eyeColor === "grn" ||
      eyeColor === "hzl" ||
      eyeColor === "oth"
    )
      return true;
    else {
      console.log("invalid eye color: ", eyeColor);
    }
  } else return false;
};

const hasValidPID = () => {
  if ("pid" in currentPassport) {
    const passportID = currentPassport["pid"].trim();
    const passportIdRegEx = new RegExp("^[0-9]{9}$");
    if (passportIdRegEx.test(passportID)) return true;
    else {
      console.log("invalid passport ID: ", passportID);
    }
  } else return false;
};

const validatePassport = () => {
  if (
    hasValidBYR() &&
    hasValidIYR() &&
    hasValidEYR() &&
    hasValidHGT() &&
    hasValidHCL() &&
    hasValidECL() &&
    hasValidPID()
  ) {
    totalValidPassports++;
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
console.log("total valid passports: ", totalValidPassports);
