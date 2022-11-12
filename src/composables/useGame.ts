import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";
import {
  createEmptyBoard,
  mergeBoardDown,
  mergeBoardLeft,
  mergeBoardRight,
  mergeBoardUp,
  flattenBoard,
  addNumberToRandomPlace,
  calculateScore,
  isBoardFull,
} from "@/lib/2048game";
import type { Board, FlattenedBoard } from "@/types/2048game";
import { KeyboardKeys } from "@/types/keyboard";

import { onKeyUp } from "@vueuse/core";

const tileColorMap = new Map([
  [0, "bg-gray-300"],
  [2, "bg-green-300"],
  [4, "bg-green-400"],
  [8, "bg-blue-300"],
  [16, "bg-blue-600"],
  [32, "bg-orange-300"],
  [64, "bg-orange-600"],
  [128, "bg-purple-300"],
  [256, "bg-purple-600"],
  [512, "bg-gray-400"],
  [1024, "bg-gray-400"],
  [2048, "bg-gray-400"],
]);

const moveMethodsMap = new Map([
  [KeyboardKeys.ArrowUp, mergeBoardUp],
  [KeyboardKeys.ArrowDown, mergeBoardDown],
  [KeyboardKeys.ArrowLeft, mergeBoardLeft],
  [KeyboardKeys.ArrowRight, mergeBoardRight],
]);

function useGameShared() {
  const gridSize = ref(6);
  const board = ref<Board>(createEmptyBoard(gridSize.value));
  const isGameRunning = ref(false);
  const flattenedBoard = ref<FlattenedBoard>(
    flattenBoard(createEmptyBoard(gridSize.value)),
  );
  const score = ref(0);
  const gameOver = ref(false);
  const scoreDiff = ref(0);
  const keyEventsCleanupsFns = new Map<KeyboardKeys, Function>();

  function newGame() {
    isGameRunning.value = true;
    gameOver.value = false;
    const newBoard = addNumberToRandomPlace(
      createEmptyBoard(gridSize.value),
      2,
    );
    board.value = newBoard;
    flattenedBoard.value = flattenBoard(newBoard);
    registerKeyEvents();
  }

  function continueGame(boardState: Board) {
    isGameRunning.value = true;
    gameOver.value = false;
    const newBoard = boardState;
    board.value = newBoard;
    flattenedBoard.value = flattenBoard(newBoard);
    registerKeyEvents();
  }

  function moveBoard(direction: KeyboardKeys) {
    const moveMethod = moveMethodsMap.get(direction);
    if (moveMethod && isGameRunning.value) {
      const newBoard = moveMethod(board.value);
      board.value = newBoard;
      flattenedBoard.value = flattenBoard(newBoard);
      const newScore = calculateScore(board.value);
      scoreDiff.value = newScore - score.value;
      score.value = newScore;
      turn();
    }
  }

  function clearBoard() {
    isGameRunning.value = false;
    const newBoard = createEmptyBoard(gridSize.value);
    board.value = newBoard;
    flattenedBoard.value = flattenBoard(newBoard);
    removeKeyEvents();
  }

  function turn() {
    if (isBoardFull(board.value)) {
      gameOver.value = true;
      isGameRunning.value = false;
      removeKeyEvents();
      return;
    }
    const newBoard = addNumberToRandomPlace(board.value, 2);
    board.value = newBoard;
    flattenedBoard.value = flattenBoard(newBoard);
  }

  function registerKeyEvents() {
    [
      KeyboardKeys.ArrowUp,
      KeyboardKeys.ArrowDown,
      KeyboardKeys.ArrowLeft,
      KeyboardKeys.ArrowRight,
    ].forEach((key) => {
      keyEventsCleanupsFns.set(
        key,
        onKeyUp(key, (event) => {
          moveBoard(event.key as KeyboardKeys);
        }),
      );
    });
  }

  function removeKeyEvents() {
    keyEventsCleanupsFns.forEach((cleanupFn) => {
      cleanupFn();
    });
  }

  function setGridSize(size: number) {
    gridSize.value = size;
    clearBoard();
  }

  return {
    board,
    gridSize,
    tileColorMap,
    newGame,
    flattenedBoard,
    clearBoard,
    moveBoard,
    score,
    scoreDiff,
    gameOver,
    setGridSize,
    continueGame,
  };
}

export const useGame = createSharedComposable(useGameShared);
