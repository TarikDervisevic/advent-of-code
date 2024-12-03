const fs = require("fs")
const input = fs.readFileSync("../input.txt", { encoding: 'utf8', flag: 'r' });

const list = [];
let safeCounter = 0;

// read line by line and split the rows into arrays of numbers
input.split(/\r?\n/).forEach((line, i) => {
  const splitLine = line.split(" ");
  const numbers = splitLine.map(number => Number(number))
  list.push(numbers)
});

list.forEach(row => {
  let increasing = false;

  if (row[0] < row[1]) {
    increasing = true;
  }
  
  for (let i = 0; i < row.length; i++) {
    const num = row[i];

    if (!row[i + 1]) {
      safeCounter++;
      break;
    }

    const distance = Math.abs(num - row[i + 1]);

    if (distance < 1 || distance > 3) {
      break
    }
    if (num > row[i + 1] && increasing) {
      break;
    }
    if (num < row[i + 1] && !increasing) {
      break;
    }
  }
})

console.log("Safe combinations: " + safeCounter);