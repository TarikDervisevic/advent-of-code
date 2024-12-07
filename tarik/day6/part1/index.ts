const fs = require("fs")
const input = fs.readFileSync("../input.txt", { encoding: 'utf8', flag: 'r' });

const rows: Array<Array<string>> = [];
let guardDirection = "up";
let turn = 1;
let outOfBounds = false;

// read line by line and split the rows into arrays of numbers
input.split(/\r?\n/).forEach((line: string) => {
  const splitLine = line.split("");
  rows.push(splitLine)
});

// get the max allowed row and col, after which the guard will go out of bounds
const maxRow = rows[0].length - 1;
const maxCol = rows.length - 1;

// rotate guard clockwise
const rotateGuard = () => {
  switch (guardDirection) {
    case "up":
      guardDirection = "right"
      break;
    case "right":
      guardDirection = "down"
      break;
    case "down":
      guardDirection = "left"
      break;
    case "left":
      guardDirection = "up"
      break;
  }
}

// returns the guard's coordinates
const findGuard = () => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const guardIndex = row.indexOf("^")
    if (guardIndex > -1) {
      return { row: i, col: guardIndex }
    }
  }
  throw "Could not find guard";
}

let guardPosition = findGuard();

const markTile = () => {
  rows[guardPosition.row][guardPosition.col] = "X";
  turn++;
}

// execute the logic turn by turn
const nextTurn = () => {
  switch (guardDirection) {
    case "up":
      // if going out of bounds, break loop. 
      if (guardPosition.row === 0) {
        return outOfBounds = true;
      }
      // if blocked, rotate the guard. 
      if (!outOfBounds && rows[guardPosition.row - 1][guardPosition.col] === "#") {
        rotateGuard();
        return;
      }
      // advance the guard's position
      guardPosition = { row: guardPosition.row - 1, col: guardPosition.col };
      break;
    case "right":
      if (guardPosition.col === maxCol) {
        return outOfBounds = true;
      }
      if (!outOfBounds && rows[guardPosition.row][guardPosition.col + 1] === "#") {
        rotateGuard();
        return;
      }
      guardPosition = { row: guardPosition.row, col: guardPosition.col + 1 };
      break;
    case "down":
      if (guardPosition.row === maxRow) {
        return outOfBounds = true;
      }
      if (!outOfBounds && rows[guardPosition.row + 1][guardPosition.col] === "#") {
        rotateGuard();
        return;
      }
      guardPosition = { row: guardPosition.row + 1, col: guardPosition.col };
      break;
    case "left":
      if (guardPosition.col === 0) {
        return outOfBounds = true;
      }
      if (!outOfBounds && rows[guardPosition.row][guardPosition.col - 1] === "#") {
        rotateGuard();
        return;
      }
      guardPosition = { row: guardPosition.row, col: guardPosition.col - 1 };
      break;
  }
  // mark the travelled tile in the input.
  markTile();
  if (outOfBounds) {
    return;
  }
}

// mark initial tile
markTile();

while (!outOfBounds) {
  nextTurn();
}

// count X's (travelled tiles) in the 2D array
const tilesVisited = rows.reduce(
  (a: number, b: Array<string>) => (
    a + b.reduce(
      (c: number, d: string) => (
        c + (d === "X" ? 1 : 0)
      ), 0)
    ), 0)

console.log("The guard visited " + tilesVisited + " tiles in " + turn + " turns.");