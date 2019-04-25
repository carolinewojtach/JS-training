const _ = require("lodash");
const board = require("./bouncyBoard");

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
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === "1") {
          return [i, j];
        }
      }
    }
  }
  static getNextPosition(position, direction) {
    let nextPosition = [
      position[0] + direction.vector[0],
      position[1] + direction.vector[1]
    ];
    return nextPosition;
  }
}

class WallChecker {
  static checkUpperWall(x, y) {
    return board[x - 1][y] === "X" ? true : false;
  }
  static checkDownWall(x, y) {
    return board[x + 1][y] === "X" ? true : false;
  }
  static checkLeftWall(x, y) {
    return board[x][y - 1] === "X" ? true : false;
  }
  static checkRightWall(x, y) {
    return board[x][y + 1] === "X" ? true : false;
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

    // check if ball came across 0
    if (board[x + a][y + b] === "0") return direction;
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
    const startPosition = Position.getStartPosition();
    console.log("start position " + startPosition);
    console.table(board);

    let currentPosition = startPosition;

    // default direction
    let direction = allDirections[0];
    let i = 1;
    let success = false;
    while (success === false) {
      // remove ball from current cell - make cell 0
      CellValueChanger.changeValue(currentPosition, "0");

      direction = DirectionChecker.getNextDirection(currentPosition, direction);
      console.log(i + ". direction: " + direction.name);

      // calculate next position
      currentPosition = Position.getNextPosition(currentPosition, direction);

      // move ball to new cell - make cell 1
      CellValueChanger.changeValue(currentPosition, "1");

      console.table(board);

      // check if ball come back to start
      if (_.isEqual(currentPosition, startPosition)) success = true;
      i++;
    }

    return currentPosition;
  }
}

const game = MainGame.start();
console.log("end position:" + game);
