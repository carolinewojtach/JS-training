let board = require("./bouncyBoard");

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

  static getNextPosition(position, direction) {
    let nextPosition = [
      position[0] + direction.vector[0],
      position[1] + direction.vector[1]
    ];
    return nextPosition;
  }
}

module.exports = Position;
