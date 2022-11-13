import type { Row, Board, FlattenedBoard } from "@/types/2048game";

export function createEmptyBoard(gridSize: number = 6): Board {
  const board: Board = [];
  for (let i = 0; i < gridSize; i++) {
    board.push([]);
    for (let j = 0; j < gridSize; j++) {
      board[i].push(0);
    }
  }
  return board;
}

export function filterZero(row: Row): Row {
  return row.filter((tileValue) => tileValue);
}

export function slide(row: Row) {
  let newRow = filterZero(row);
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }
  newRow = filterZero(newRow);
  while (newRow.length < row.length) {
    newRow.push(0);
  }
  return newRow;
}

export function mergeBoardLeft(board: Board): Board {
  const newBoard = createEmptyBoard(board.length);
  for (let row = 0; row < board.length; row++) {
    let newRow = board[row];
    newRow = slide(newRow);
    newBoard[row] = newRow;
  }
  return newBoard;
}

export function mergeBoardRight(board: Board): Board {
  const newBoard = createEmptyBoard(board.length);

  for (let row = 0; row < board.length; row++) {
    let newRow = board[row];
    newRow.reverse();
    newRow = slide(newRow);
    newBoard[row] = newRow.reverse();
  }

  return newBoard;
}

export function mergeBoardUp(board: Board): Board {
  const newBoard = createEmptyBoard(board.length);

  for (let column = 0; column < board.length; column++) {
    let newRow: Row = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column]);
    }
    newRow = slide(newRow);
    for (let row = 0; row < board.length; row++) {
      newBoard[row][column] = newRow[row];
    }
  }
  return newBoard;
}
export function mergeBoardDown(board: Board): Board {
  const newBoard = createEmptyBoard(board.length);

  for (let column = 0; column < board.length; column++) {
    let newRow: Row = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column]);
    }
    newRow.reverse();
    newRow = slide(newRow);
    newRow.reverse();

    for (let row = 0; row < board.length; row++) {
      newBoard[row][column] = newRow[row];
    }
  }
  return newBoard;
}

export function isBoardFull(board: Board): boolean {
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      if (board[row][column] == 0) {
        return false;
      }
    }
  }
  return true;
}

export function addNumberToRandomPlace(
  board: Board,
  tilevalue: number = 2,
): Board {
  if (isBoardFull(board)) {
    return board;
  }

  const newBoard = copyBoard(board);

  let isRandomNumberAdded = false;
  while (!isRandomNumberAdded) {
    const row = Math.floor(Math.random() * board.length);
    const column = Math.floor(Math.random() * board.length);
    if (newBoard[row][column] === 0) {
      newBoard[row][column] = tilevalue;
      isRandomNumberAdded = true;
    }
  }
  return newBoard;
}

export function copyBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function flattenBoard(board: Board): FlattenedBoard {
  return board.flat();
}

export function calculateScore(
  board: Board,
  mininumTileValueToSpawn: number,
): number {
  let score = 0;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      const tileValue = board[row][column];
      if (tileValue > 1) {
        score += tileValue + tileValue - mininumTileValueToSpawn * 2;
      }
    }
  }
  return score;
}

export function isBoardEqual(board1: Board, board2: Board): boolean {
  return flattenBoard(board1).every((tileValue, index) => {
    return tileValue === flattenBoard(board2)[index];
  });
}
