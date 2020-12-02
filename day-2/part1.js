const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

//for a password to be valid the required character must appear the specified number of times (between minInstances and maxInstances)

const getLineInfo = (line) => {
  const rule = line.split(":")[0];
  const instances = rule.split(" ")[0];
  const minInstances = instances.split("-")[0];
  const maxInstances = instances.split("-")[1];
  const reqCharacter = rule.split(" ")[1].split("\\")[0];
  const password = line.split(" ")[2];

  return { minInstances, maxInstances, reqCharacter, password };
};

const getValidPasswordCount = () => {
  let validPasswords = 0;
  textByLine.forEach((line) => {
    const { minInstances, maxInstances, reqCharacter, password } = getLineInfo(
      line
    );
    const characterCount = getCharacterCount(reqCharacter, password);

    if (countIsInRange(characterCount, minInstances, maxInstances))
      validPasswords++;
  });
  return validPasswords;
};

const getCharacterCount = (reqCharacter, password) => {
  let characterCount = 0;
  for (let i = 0; i < password.length; i++) {
    if (password[i] === reqCharacter) characterCount++;
  }
  return characterCount;
};

const countIsInRange = (characterCount, minInstances, maxInstances) => {
  return (
    characterCount >= parseInt(minInstances) &&
    characterCount <= parseInt(maxInstances)
  );
};

const validPasswords = getValidPasswordCount();
console.log(validPasswords);
