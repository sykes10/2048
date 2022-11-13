import { describe, test, expect } from "vitest";
import {
  createEmptyBoard,
  mergeBoardDown,
  mergeBoardLeft,
  mergeBoardRight,
  mergeBoardUp,
  isBoardFull,
  flattenBoard,
  isBoardEqual,
} from "@/lib/2048game";

describe("2048gameUtils", () => {
  describe("createEmptyBoard", () => {
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
      `should create an empty board of size %gridSize`,
      ({ gridSize, expected }) => {
        expect(createEmptyBoard(gridSize)).toEqual(expected);
      },
    );
  });
  describe("mergeBoardLeft", () => {
    test.each([
      {
        board: [
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
      {
        board: [
          [2, 4, 0],
          [4, 0, 0],
          [0, 0, 0],
        ],
        expected: [
          [2, 4, 0],
          [4, 0, 0],
          [0, 0, 0],
        ],
      },
    ])(`should merge board %board to the left`, ({ board, expected }) => {
      expect(mergeBoardLeft(board)).toEqual(expected);
    });
  });
  describe("mergeBoardRigth", () => {
    test.each([
      {
        board: [
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
      {
        board: [
          [0, 4, 2],
          [0, 0, 4],
          [0, 0, 0],
        ],
        expected: [
          [0, 4, 2],
          [0, 0, 4],
          [0, 0, 0],
        ],
      },
    ])(`shouldmerge board %board to the left`, ({ board, expected }) => {
      expect(mergeBoardRight(board)).toEqual(expected);
    });
  });
  describe("mergeBoardUp", () => {
    test.each([
      {
        board: [
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
      {
        board: [
          [0, 4, 2],
          [0, 0, 4],
          [0, 0, 0],
        ],
        expected: [
          [0, 4, 2],
          [0, 0, 4],
          [0, 0, 0],
        ],
      },
    ])(`shouldmerge board %board up`, ({ board, expected }) => {
      expect(mergeBoardUp(board)).toEqual(expected);
    });
  });
  describe("mergeBoardDown", () => {
    test.each([
      {
        board: [
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
      {
        board: [
          [0, 0, 0],
          [0, 8, 2],
          [0, 4, 4],
        ],
        expected: [
          [0, 0, 0],
          [0, 8, 2],
          [0, 4, 4],
        ],
      },
    ])(`shouldmerge board %board down`, ({ board, expected }) => {
      expect(mergeBoardDown(board)).toEqual(expected);
    });
  });
  describe("isBoardFull", () => {
    test.each([
      {
        board: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: true,
      },
      {
        board: [
          [0, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: false,
      },
    ])(
      `should return %expected when checking if board %board is full`,
      ({ board, expected }) => {
        expect(isBoardFull(board)).toEqual(expected);
      },
    );
  });
  describe("flattenBoard", () => {
    test.each([
      {
        board: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: [2, 2, 4, 2, 2, 4, 2, 2, 2],
      },
    ])(`should flatten board %board to %expected`, ({ board, expected }) => {
      expect(flattenBoard(board)).toEqual(expected);
    });
  });
  describe("isBoardEqual", () => {
    test.each([
      {
        board1: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        board2: [
          [2, 2, 4],
          [2, 2, 4],
          [2, 2, 2],
        ],
        expected: true,
        description: "should return true when comparing two equal boards",
      },
      {
        board1: [
          [0, 2, 2],
          [0, 2, 4],
          [0, 2, 2],
        ],
        board2: [
          [0, 2, 4],
          [0, 2, 4],
          [0, 2, 2],
        ],
        expected: false,
        description: "should return true when comparing two equal boards",
      },
    ])(`%description`, ({ board1, board2, expected }) => {
      expect(isBoardEqual(board1, board2)).toEqual(expected);
    });
  });
});
