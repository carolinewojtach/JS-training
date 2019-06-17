class Board {
  static randomDeadOrAliveCell() {
    return Math.round(Math.random());
  }
  static generateBoard(height, width) {
    let board = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push(this.randomDeadOrAliveCell());
      }
      board.push(row);
    }
    return board;
  }
}

class NeighborsChecker {
  static checkAlives(board, height, width, x, y) {
    let neighbors = 0;
    // checkUpLeft //-1 -1
    if (x - 1 > -1 && y - 1 > -1) {
      if (board[x - 1][y - 1] === 1) neighbors++;
    }
    // checkUp   //-1,0
    if (x - 1 > -1) {
      if (board[x - 1][y] === 1) neighbors++;
    }
    //checkUpRight // -1,1
    if (x - 1 > -1 && y + 1 < width) {
      if (board[x - 1][y + 1] === 1) neighbors++;
    }
    // checkRight   //0, 1
    if (y + 1 < width) {
      if (board[x][y + 1] === 1) neighbors++;
    }
    // checkDownRight // 1, 1
    if (x + 1 < height && y + 1 < width) {
      if (board[x + 1][y + 1] === 1) neighbors++;
    }
    // checkDown // 1, 0
    if (x + 1 < height) {
      if (board[x + 1][y] === 1) neighbors++;
    }
    // checkDownLeft //  1, -1
    if (x + 1 < height && y - 1 > -1) {
      if (board[x + 1][y - 1] === 1) neighbors++;
    }
    // checkLeft // 0, -1
    if (y - 1 > -1) {
      if (board[x][y - 1] === 1) neighbors++;
    }

    return neighbors;
  }
}

const GameOfLife = (movesNumber, height, width) => {
  // ready board...
  let board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];

  // ...or generate board
  // let board = []
  // if (height === undefined && width === undefined) board = Board.generateBoard(height, width);

  console.table(board);

  // deep copy
  let nextBoard = JSON.parse(JSON.stringify(board));
  let z = 0;

  while (z < movesNumber) {
    // do for every cell..
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let liveNeighbors = NeighborsChecker.checkAlives(
          board,
          height,
          width,
          i,
          j
        );

        if (nextBoard[i][j] === 1) {
          //cell dies - underpopulation
          if (liveNeighbors < 2) nextBoard[i][j] = 0;
          // cell dies - overpopulation
          else if (liveNeighbors > 3) nextBoard[i][j] = 0;
        }
        if (nextBoard[i][j] === 0) {
          if (liveNeighbors === 3) nextBoard[i][j] = 1;
        }
      }
    }

    z++;
    console.table(nextBoard);
    board = JSON.parse(JSON.stringify(nextBoard));
  }

  return nextBoard;
};


// game of life
const movesNumber = 10;
const height = 6;
const width = 6;
GameOfLife(movesNumber, height, width);

