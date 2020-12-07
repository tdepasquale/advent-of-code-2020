const fs = require("fs");
const text = fs.readFileSync("./data.txt").toString("utf-8");
const textByLine = text.split("\n");

const storedData = {};
let totalBags = 0;

const bagMustContainHowMany = (outerBagColor) => {
  const outerBag = storedData[outerBagColor];
  Object.keys(outerBag).forEach((bagColor) => {
    if (outerBag[bagColor] === "no") return;
    let number = parseInt(outerBag[bagColor]);
    totalBags += number;
    // console.log("color: ", bagColor, "# ", number);
    for (let i = 0; i < number; i++) {
      bagMustContainHowMany(bagColor);
    }
  });
};

const storeData = (outerBag, innerBags) => {
  const trimmedOuterBag = outerBag.trim();
  innerBags.forEach((innerBag) => {
    let trimmedInnerBag = innerBag.trim();
    const splitInnerBag = trimmedInnerBag.split(" ");
    const number = splitInnerBag[0];
    const bag = splitInnerBag[1] + " " + splitInnerBag[2];

    storedData[trimmedOuterBag] = {
      ...storedData[trimmedOuterBag],
      [bag]: number,
    };
  });
};

const processLine = (line) => {
  let innerBags = [];
  const sections = line.split(",");

  const [outerBag, innerBag1] = sections[0].split("bags contain");
  innerBags.push(innerBag1);

  let isFirstSection = true;
  sections.forEach((section) => {
    if (isFirstSection) isFirstSection = !isFirstSection;
    else innerBags.push(section);
  });

  storeData(outerBag, innerBags);
};

const processAllLines = () => {
  textByLine.forEach((line) => {
    processLine(line);
  });
};

processAllLines();
bagMustContainHowMany("shiny gold");
console.log(totalBags);
