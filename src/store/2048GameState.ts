import { defineStore } from "pinia";
import type { Board, FlattenedBoard } from "@/types/2048game";
import { copyBoard, createEmptyBoard } from "@/lib/2048Game";
import { useLocalStorage } from "@vueuse/core";

const maxScoreKey = "maxScore";
const maxScoreLocalStorage = useLocalStorage(maxScoreKey, 0);

type State = {
  board: Board;
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
  getters: {
    flattenBoard(): FlattenedBoard {
      return this.board.flat();
    },
  },
  state: (): State => {
    return {
      board: [],
      gridSize: 4,
      isGameOver: false,
      isRunning: false,
      maxScore: maxScoreLocalStorage.value,
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
    newGame(board?: Board) {
      this.isRunning = true;
      this.isGameOver = false;
      this.score = 0;
      this.updateBoard(board ?? createEmptyBoard(this.gridSize));
    },
    gameOver() {
      this.isRunning = false;
      this.isGameOver = true;
      this.setMaxScore();
    },
    setGridSize(gridSize: number) {
      this.gridSize = gridSize;
      this.newGame();
    },
    setTileValueToWin(tileValueToWin: number) {
      this.tileValueToWin = tileValueToWin;
      this.newGame();
    },
    setMininumTileValueToSpawn(mininumTileValueToSpawn: number) {
      this.mininumTileValueToSpawn = mininumTileValueToSpawn;
      this.newGame();
    },
    updateBoard(board: Board) {
      const newBoard = copyBoard(board);
      this.board = newBoard;
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
    setMaxScore() {
      if (this.score > this.maxScore) {
        this.maxScore = this.score;
        maxScoreLocalStorage.value = this.maxScore;
      }
    },
  },
});
