const fs = require("fs")
const input = fs.readFileSync("../day1.txt", { encoding: 'utf8', flag: 'r' });

let totalDistance = 0;

const list1 = [];
const list2 = [];

// read line by line and split the left and right row into 2 arrays
input.split(/\r?\n/).forEach((line, i) => {
  const splitLine = line.split("   ");
  list1.push(splitLine[0])
  list2.push(splitLine[1])
});

list1.sort();
list2.sort();

list1.forEach((item, i) => {
  totalDistance = totalDistance + Math.abs(item - list2[i])
})

console.log("The total distance is: " + totalDistance);
