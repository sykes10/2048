import { describe, test, expect } from "vitest";
import {
  createEmptyMatrix,
  mergeMatrixDown,
  mergeMatrixLeft,
  mergeMatrixRight,
  mergeMatrixUp,
  isMatrixFull,
  flattenMatrix,
} from "@/lib/matrixUtils";

describe("matrixUtils", () => {
  describe("createEmptyMatrix", () => {
    test.each([
      {
        gridSize: 6,
        expected: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
      },
      {
        gridSize: 3,
        expected: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      },
    ])(
      `should create an empty matrix of size %gridSize`,
      ({ gridSize, expected }) => {
        expect(createEmptyMatrix(gridSize)).toEqual(expected);
      },
    );
  });
  describe("mergeMatrixLeft", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4, 4, 0, 0],
          [0, 0, 4, 0, 4, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 8, 0, 0, 16, 0],
        ],
        expected: [
          [4, 8, 0, 0, 0, 0],
          [8, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [8, 16, 0, 0, 0, 0],
        ],
      },
    ])(`shouldmerge matrix %matrix to the left`, ({ matrix, expected }) => {
      expect(mergeMatrixLeft(matrix)).toEqual(expected);
    });
  });
  describe("mergeMatrixRigth", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4, 4, 0, 0],
          [0, 0, 4, 0, 4, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 8, 0, 0, 16, 0],
        ],
        expected: [
          [0, 0, 0, 0, 4, 8],
          [0, 0, 0, 0, 0, 8],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 8, 16],
        ],
      },
    ])(`shouldmerge matrix %matrix to the left`, ({ matrix, expected }) => {
      expect(mergeMatrixRight(matrix)).toEqual(expected);
    });
  });
  describe("mergeMatrixUp", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4, 4, 0, 0],
          [0, 0, 4, 0, 4, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0, 0],
          [0, 8, 0, 0, 16, 0],
        ],
        expected: [
          [4, 2, 8, 4, 4, 0],
          [0, 8, 0, 0, 16, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
      },
    ])(`shouldmerge matrix %matrix up`, ({ matrix, expected }) => {
      expect(mergeMatrixUp(matrix)).toEqual(expected);
    });
  });
  describe("mergeMatrixDown", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4, 4, 0, 0],
          [0, 0, 4, 0, 4, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [2, 0, 0, 0, 0, 0],
          [0, 8, 0, 0, 16, 0],
        ],
        expected: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 2, 0, 0, 4, 0],
          [4, 8, 8, 4, 16, 0],
        ],
      },
    ])(`shouldmerge matrix %matrix up`, ({ matrix, expected }) => {
      expect(mergeMatrixDown(matrix)).toEqual(expected);
    });
  });
  describe("isMatrixFull", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: true,
      },
      {
        matrix: [
          [0, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: false,
      },
    ])(
      `should return %expected when checking if matrix %matrix is full`,
      ({ matrix, expected }) => {
        expect(isMatrixFull(matrix)).toEqual(expected);
      },
    );
  });
  describe("flattenMatrix", () => {
    test.each([
      {
        matrix: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: [2, 2, 4, 2, 2, 4, 2, 2, 2],
      },
    ])(`should flatten matrix %matrix to %expected`, ({ matrix, expected }) => {
      expect(flattenMatrix(matrix)).toEqual(expected);
    });
  });
});
