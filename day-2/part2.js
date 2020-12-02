const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

//for a password to be valid the required character must appear in EXACTLY one of the 2 specified positions. 1 = first character. not zero based.

const getLineInfo = (line) => {
  const rule = line.split(":")[0];
  const instances = rule.split(" ")[0];
  const location1 = instances.split("-")[0];
  const location2 = instances.split("-")[1];
  const reqCharacter = rule.split(" ")[1].split("\\")[0];
  const password = line.split(" ")[2];

  return { location1, location2, reqCharacter, password };
};

const getValidPasswordCount = () => {
  let validPasswords = 0;

  textByLine.forEach((line) => {
    const { location1, location2, reqCharacter, password } = getLineInfo(line);
    if (isValidPassword(location1, location2, reqCharacter, password))
      validPasswords++;
  });

  return validPasswords;
};

const isValidPassword = (location1, location2, reqCharacter, password) => {
  //subtract one because their system is not zero based
  let matches = 0;
  if (password[parseInt(location1) - 1] === reqCharacter) matches++;
  if (password[parseInt(location2) - 1] === reqCharacter) matches++;
  //exactly one of those 2 characters must be the required character
  if (matches === 1) return true;
  else return false;
};

const validPasswords = getValidPasswordCount();
console.log(validPasswords);
