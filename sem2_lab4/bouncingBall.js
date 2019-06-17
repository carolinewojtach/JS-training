const _ = require("lodash");
const DirectionChecker = require("./DirectionChecker");
const Position = require("./position");
let board = require("./bouncyBoard.js");

// all possible directions
const allDirections = [
  { name: "down-right", vector: [1, 1] },
  { name: "down-left", vector: [1, -1] },
  { name: "up-left", vector: [-1, -1] },
  { name: "up-right", vector: [-1, 1] }
];

class DirectionRandomizer {
  static getRandDirection(direction) {
    // available 4 directions - for first direction draw
    let amount = 4;
    let availableDirections = [...allDirections];

    // available 3 directions - for case with Y
    if (direction !== undefined) {
      amount = 3;
      availableDirections = allDirections.filter(
        dir => dir.name !== direction.name
      );
    }

    let randNumber = Math.floor(Math.random() * amount);
    let newDirection = availableDirections[randNumber];
    return newDirection;
  }
}

class CellValueChanger {
  static changeValue(position, value) {
    board[position[0]][position[1]] = +value;
  }
}

class MainGame {
  static start() {
    // get start position
    let startPosition = Position.getStartPosition();
    console.log("start position " + startPosition);
    console.table(board);

    let currentPosition = startPosition;

    // default direction
    let currentDirection = DirectionRandomizer.getRandDirection();

    let isYOnPreviousPosition = false;
    let i = 1;
    while (i <= movesNumber) {
      // remove ball from current cell - make cell 0
      CellValueChanger.changeValue(currentPosition, "0");

      // calculate next direction
      // if previous position was 0
      if (isYOnPreviousPosition === false) {
        currentDirection = DirectionChecker.getNextDirection(currentPosition, currentDirection);
      }
      // if previous position was Y
      else {
        currentDirection = DirectionRandomizer.getRandDirection(currentDirection);
        isYOnPreviousPosition = false;
        console.log("Y changed direction");
      }
      console.log(i + ". direction: " + currentDirection.name);


      // calculate next position
      let nextPosition = Position.getNextPosition(currentPosition, currentDirection);

      // check if Y is on next position
      if (board[nextPosition[0]][nextPosition[1]] === "Y") {
        isYOnPreviousPosition = true;
      }
      currentPosition = nextPosition;

      // move ball to new cell - make cell 1
      CellValueChanger.changeValue(currentPosition, "1");
      console.table(board);
      i++;
    }

    return currentPosition;
  }
}

let movesNumber = 50;
const game = MainGame.start();
console.log("end position:" + game);
