import type { Vector, Matrix } from "@/types/matrix";

export function createEmptyMatrix(gridSize: number = 6): Matrix {
  const matrix: Matrix = [];
  for (let i = 0; i < gridSize; i++) {
    matrix.push([]);
    for (let j = 0; j < gridSize; j++) {
      matrix[i].push(0);
    }
  }
  return matrix;
}

export function filterZero(vector: Vector): Vector {
  return vector.filter((num) => num); //create new array of all nums != 0
}

export function slide(vector: Vector) {
  //[0, 2, 2, 2]
  let newVector = filterZero(vector); //[2, 2, 2]
  for (let i = 0; i < newVector.length - 1; i++) {
    if (newVector[i] == newVector[i + 1]) {
      newVector[i] *= 2;
      newVector[i + 1] = 0;
    }
  } //[4, 0, 2]
  newVector = filterZero(newVector); //[4, 2]
  //add zeroes
  while (newVector.length < vector.length) {
    newVector.push(0);
  } //[4, 2, 0, 0]
  return newVector;
}

export function mergeMatrixLeft(matrix: Matrix): Matrix {
  const newMatrix = createEmptyMatrix(matrix.length);
  for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
    let newVector = matrix[vectorX];
    newVector = slide(newVector);
    newMatrix[vectorX] = newVector;
  }
  return newMatrix;
}

export function mergeMatrixRight(matrix: Matrix): Matrix {
  const newMatrix = createEmptyMatrix(matrix.length);

  for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
    let newVector = matrix[vectorX]; //[0, 2, 2, 2]
    newVector.reverse(); //[2, 2, 2, 0]
    newVector = slide(newVector); //[4, 2, 0, 0]
    newMatrix[vectorX] = newVector.reverse(); //[0, 0, 2, 4];
  }

  return newMatrix;
}

export function mergeMatrixUp(matrix: Matrix): Matrix {
  const newMatrix = createEmptyMatrix(matrix.length);

  for (let vectorY = 0; vectorY < matrix.length; vectorY++) {
    let newVector: Vector = [];
    for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
      newVector.push(matrix[vectorX][vectorY]);
    }
    newVector = slide(newVector);
    for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
      newMatrix[vectorX][vectorY] = newVector[vectorX];
    }
  }
  return newMatrix;
}

export function mergeMatrixDown(matrix: Matrix): Matrix {
  const newMatrix = createEmptyMatrix(matrix.length);

  for (let vectorY = 0; vectorY < matrix.length; vectorY++) {
    let newVector: Vector = [];
    for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
      newVector.push(matrix[vectorX][vectorY]);
    }
    newVector.reverse();
    newVector = slide(newVector);
    newVector.reverse();

    for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
      newMatrix[vectorX][vectorY] = newVector[vectorX];
    }
  }
  return newMatrix;
}

export function isMatrixFull(matrix: Matrix): boolean {
  for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
    for (let vectorY = 0; vectorY < matrix.length; vectorY++) {
      if (matrix[vectorX][vectorY] == 0) {
        return false;
      }
    }
  }
  return true;
}

export function addNumberToRandomPlace(
  matrix: Matrix,
  tilevalue: number = 1,
): Matrix | false {
  if (isMatrixFull(matrix)) {
    return false;
  }

  const newMatrix = copyMatrix(matrix);

  let isRandomNumberAdded = false;
  while (!isRandomNumberAdded) {
    const vectorX = Math.floor(Math.random() * matrix.length);
    const vectorY = Math.floor(Math.random() * matrix.length);
    if (newMatrix[vectorX][vectorY] === 0) {
      newMatrix[vectorX][vectorY] = tilevalue;
      isRandomNumberAdded = true;
    }
  }
  return newMatrix;
}

export function copyMatrix(matrix: Matrix): Matrix {
  return matrix.map((vector) => [...vector]);
}

export function flattenMatrix(matrix: Matrix): Vector {
  return matrix.flatMap((vector) => vector);
}

export function calculateScore(matrix: Matrix): number {
  let score = 0;
  for (let vectorX = 0; vectorX < matrix.length; vectorX++) {
    for (let vectorY = 0; vectorY < matrix.length; vectorY++) {
      const tileValue = matrix[vectorX][vectorY];
      if (tileValue > 1) {
        score += tileValue + tileValue - 4;
      }
    }
  }
  return score;
}
