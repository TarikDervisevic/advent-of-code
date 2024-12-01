const fs = require("fs")
const input = fs.readFileSync("../day1.txt", { encoding: 'utf8', flag: 'r' });

let totalSimilarity = 0;

const list1 = [];
const list2 = [];

// read line by line and split the left and right row into 2 arrays
input.split(/\r?\n/).forEach((line, i) => {
  const splitLine = line.split("   ");
  list1.push(splitLine[0])
  list2.push(splitLine[1])
});

list1.forEach((a, i) => {
  const similarities = list2.filter(b => a === b);

  totalSimilarity = totalSimilarity + a * similarities.length;
})

console.log("The total similarity is: " + totalSimilarity);