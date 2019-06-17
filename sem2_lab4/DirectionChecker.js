let board = require("./bouncyBoard");

// all possible directions
const allDirections = [
  { name: "down-right", vector: [1, 1] },
  { name: "down-left", vector: [1, -1] },
  { name: "up-left", vector: [-1, -1] },
  { name: "up-right", vector: [-1, 1] }
];

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
        else return allDirections[1];
      }
      if (direction.name === "down-right") {
        verticalWall = WallChecker.checkRightWall(x, y);
        horizontalWall = WallChecker.checkDownWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[2];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[1];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[3];
        else return allDirections[2];
      }
      if (direction.name === "down-left") {
        verticalWall = WallChecker.checkLeftWall(x, y);
        horizontalWall = WallChecker.checkDownWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[3];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[0];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[2];
        else return allDirections[3];
      }
      if (direction.name === "up-left") {
        verticalWall = WallChecker.checkLeftWall(x, y);
        horizontalWall = WallChecker.checkUpperWall(x, y);
        if (verticalWall && horizontalWall === true) return allDirections[0];
        else if (verticalWall === true && horizontalWall === false)
          return allDirections[3];
        else if (verticalWall === false && horizontalWall === true)
          return allDirections[1];
        else return allDirections[0];
      }
    }
  }
}

module.exports = DirectionChecker;
