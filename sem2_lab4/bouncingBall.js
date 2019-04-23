const _ = require("lodash");
let board = require("./bouncyBoard.js");

// all possible directions
const allDirections = [
  { name: "down-right", vector: [1, 1] },
  { name: "down-left", vector: [1, -1] },
  { name: "up-left", vector: [-1, -1] },
  { name: "up-right", vector: [-1, 1] }
];

class Position {
  static getStartPosition() {
    // find start position
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        if (board[i][j] === "1") {
          return [i, j];
        }
      }
    }
  }

  static getNextPosition(currentPosition, currentDirection) {
    let nextPosition = [
      currentPosition[0] + currentDirection.vector[0],
      currentPosition[1] + currentDirection.vector[1]
    ];
    return nextPosition;
  }
}

class WallChecker {
  static checkUpperWall(x, y) {
    return board[x - 1][y - 1] === "X" && board[x - 1][y + 1] === "X"
      ? true
      : false;
  }
  static checkDownWall(x, y) {
    return board[x + 1][y - 1] === "X" && board[x + 1][y + 1] === "X"
      ? true
      : false;
  }
  static checkLeftWall(x, y) {
    return board[x - 1][y - 1] === "X" && board[x + 1][y - 1] === "X"
      ? true
      : false;
  }
  static checkRightWall(x, y) {
    return board[x - 1][y + 1] === "X" && board[x + 1][y + 1] === "X"
      ? true
      : false;
  }
}

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

class DirectionChecker {
  static getNextDirection(position, direction) {
    // ball position coordinates
    let x = position[0];
    let y = position[1];

    // direction vector
    let a = direction.vector[0];
    let b = direction.vector[1];

    // check if ball came across 0 or Y
    if (board[x + a][y + b] !== "X") return direction;
    else {
      let verticalWall = "";
      let horizontalWall = "";

      if (direction.name === "up-right") {
        verticalWall = WallChecker.checkRightWall(x, y);
        horizontalWall = WallChecker.checkUpperWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[1];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[2];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[0];
      }
      if (direction.name === "down-right") {
        verticalWall = WallChecker.checkRightWall(x, y);
        horizontalWall = WallChecker.checkDownWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[2];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[1];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[3];
      }
      if (direction.name === "down-left") {
        verticalWall = WallChecker.checkLeftWall(x, y);
        horizontalWall = WallChecker.checkDownWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[3];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[0];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[2];
      }
      if (direction.name === "up-left") {
        verticalWall = WallChecker.checkLeftWall(x, y);
        horizontalWall = WallChecker.checkUpperWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[0];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[3];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[1];
      }
    }
  }
}

class CellValueChanger {
  static changeValue(position, value) {
    board[position[0]][position[1]] = value;
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

    let prevYPosition = false;
    let i = 0;
    while (i < 30) {
      // remove ball from current cell - make cell 0
      CellValueChanger.changeValue(currentPosition, 0);

      // calculate next direction
      if (prevYPosition === false) {
        currentDirection = DirectionChecker.getNextDirection(
          currentPosition,
          currentDirection
        );
      } else {
        currentDirection = DirectionRandomizer.getRandDirection(
          currentDirection
        );
        prevYPosition = false;
      }
      console.log("direction: " + currentDirection.name);

      // calculate next position
      let nextPosition = Position.getNextPosition(
        currentPosition,
        currentDirection
      );

      // check if Y
      if (board[nextPosition[0]][nextPosition[1]] === "Y") {
        prevYPosition = true;
      }
      currentPosition = nextPosition;

      // move ball to new cell - make cell 1
      CellValueChanger.changeValue(currentPosition, 1);
      console.table(board);

      i++;
    }

    return currentPosition;
  }
}

const game = MainGame.start();
console.log("end position:" + game);
