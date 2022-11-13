import { defineStore } from "pinia";
import type { Board, FlattenedBoard } from "@/types/2048game";
import { createEmptyBoard, flattenBoard } from "@/lib/2048game";

type State = {
  board: Board;
  flattenedBoard: FlattenedBoard;
  gridSize: number;
  isGameOver: boolean;
  isRunning: boolean;
  maxScore: number;
  mininumTileValueToSpawn: number;
  score: number;
  scoreDiff: number;
  tileValueToWin: number;
  isGridSelectorOpen: boolean;
  biggestTileValue: number;
  isGameWon: boolean;
};

export const use2048GameStateStore = defineStore("2048GameState", {
  state: (): State => {
    return {
      board: [],
      flattenedBoard: [],
      gridSize: 4,
      isGameOver: false,
      isRunning: false,
      maxScore: 0,
      mininumTileValueToSpawn: 2,
      score: 0,
      scoreDiff: 0,
      tileValueToWin: 2048,
      isGridSelectorOpen: false,
      biggestTileValue: 0,
      isGameWon: false,
    };
  },
  actions: {
    newGame(board: Board) {
      this.isRunning = true;
      this.isGameOver = false;
      this.score = 0;
      this.updateBoard(board);
    },
    resetGame() {
      this.isRunning = false;
      this.isGameOver = false;
      this.score = 0;
      this.updateBoard(createEmptyBoard(this.gridSize));
    },
    gameOver() {
      this.isRunning = false;
      this.isGameOver = true;
    },
    setGridSize(gridSize: number) {
      this.gridSize = gridSize;
      this.resetGame();
    },
    setTileValueToWin(tileValueToWin: number) {
      this.tileValueToWin = tileValueToWin;
      this.resetGame();
    },
    setMininumTileValueToSpawn(mininumTileValueToSpawn: number) {
      this.mininumTileValueToSpawn = mininumTileValueToSpawn;
      this.resetGame();
    },
    updateBoard(board: Board) {
      this.board = board;
      this.flattenedBoard = flattenBoard(board);
    },
    updateScore(score: number) {
      this.scoreDiff = score - this.score;
      this.score = score;
    },
    setGridSelector(isOpen: boolean) {
      this.isGridSelectorOpen = isOpen;
    },
    gameWon() {
      this.isRunning = false;
      this.isGameWon = true;
    },
  },
});
