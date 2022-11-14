import type { Row, Board } from "@/types/2048game";

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
  return row.filter((tileValue) => tileValue !== 0);
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
    let newRow = copyRow(board[row]);
    newRow = slide(newRow);
    newBoard[row] = newRow;
  }
  return newBoard;
}

export function mergeBoardRight(board: Board): Board {
  const newBoard = createEmptyBoard(board.length);

  for (let row = 0; row < board.length; row++) {
    let newRow = copyRow(board[row]);
    newRow = reverseRow(newRow);
    newRow = slide(newRow);
    newBoard[row] = reverseRow(newRow);
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
    newRow = reverseRow(newRow);
    newRow = slide(newRow);
    newRow = reverseRow(newRow);

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
export function copyRow(row: Row): Row {
  return [...row];
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
  return JSON.stringify(board1) === JSON.stringify(board2);
}

export function isGameWon(board: Board, winTileValue: number): boolean {
  return board.flat().some((tileValue) => {
    return tileValue === winTileValue;
  });
}

export function reverseRow(row: Row): Row {
  const newRow = [];
  for (let i = row.length - 1; i >= 0; i--) {
    newRow.push(row[i]);
  }
  return newRow;
}

export function isGameOver(board: Board): boolean {
  const newBoard = copyBoard(board);
  const leftBoard = mergeBoardLeft(newBoard);
  const rightBoard = mergeBoardRight(newBoard);
  const upBoard = mergeBoardUp(newBoard);
  const downBoard = mergeBoardDown(newBoard);

  return (
    isBoardEqual(leftBoard, board) &&
    isBoardEqual(rightBoard, board) &&
    isBoardEqual(upBoard, board) &&
    isBoardEqual(downBoard, board)
  );
}
