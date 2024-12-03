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
  const testRow = (arr) => {
    let increasing = false;

    if (arr[0] < arr[1]) {
      increasing = true;
    }
    
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];

      if (!arr[i + 1]) {
        return true
      }

      const distance = Math.abs(num - arr[i + 1]);

      if (distance < 1 || distance > 3) {
        return false
      }
      if (num > arr[i + 1] && increasing) {
        return false
      }
      if (num < arr[i + 1] && !increasing) {
        return false
      }
    }
  }

  const iterateArrayWithoutI = (arr) => {
    for (let j = 0; j < arr.length; j++) {
      const arrCopy = [...arr];
      arrCopy.splice(j, 1);
      if (testRow(arrCopy)) {
        return true
      }
    }
  }

  if (testRow(row)) {
    safeCounter++;
  } else {
    if (iterateArrayWithoutI(row)) {
      safeCounter++;
    }
  }
})

console.log("Safe combinations: " + safeCounter);