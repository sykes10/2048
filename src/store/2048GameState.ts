import { defineStore } from "pinia";
import type { Board, FlattenedBoard } from "@/types/2048game";
import { copyBoard, createEmptyBoard } from "@/lib/2048Game";
import { useLocalStorage } from "@vueuse/core";

const maxScoreLocalStorage = useLocalStorage("maxScore", 0);
const lastKnownBoardLocalStorage = useLocalStorage<string>(
  "lastKnownBoard",
  null,
);

type State = {
  biggestTileValue: number;
  board: Board;
  gridSize: number;
  initialTileValueToSpawn: number;
  isGameOver: boolean;
  isGameWon: boolean;
  isGridSelectorOpen: boolean;
  isRunning: boolean;
  lastKnownBoard: Board | null;
  maxScore: number;
  mininumTileValueToSpawn: number;
  score: number;
  scoreDiff: number;
  tileValueToWin: number;
};

export const use2048GameStateStore = defineStore("2048GameState", {
  getters: {
    flattenBoard(): FlattenedBoard {
      return this.board.flat();
    },
  },
  state: (): State => {
    return {
      biggestTileValue: 0,
      board: [],
      gridSize: 6,
      initialTileValueToSpawn: 2,
      isGameOver: false,
      isGameWon: false,
      isGridSelectorOpen: false,
      isRunning: false,
      lastKnownBoard: JSON.parse(lastKnownBoardLocalStorage.value),
      maxScore: maxScoreLocalStorage.value,
      mininumTileValueToSpawn: 1,
      score: 0,
      scoreDiff: 0,
      tileValueToWin: 2048,
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
      lastKnownBoardLocalStorage.value = JSON.stringify(newBoard);
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
