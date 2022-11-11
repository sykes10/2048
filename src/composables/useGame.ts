import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";
import {
  createEmptyMatrix,
  flattenMatrix,
  mergeMatrixRight,
  mergeMatrixLeft,
  mergeMatrixDown,
  mergeMatrixUp,
  addNumberToRandomPlace,
  calculateScore,
} from "@/lib/matrixUtils";
import type { Matrix, Vector } from "@/types/matrix";
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
  [KeyboardKeys.ArrowUp, mergeMatrixUp],
  [KeyboardKeys.ArrowDown, mergeMatrixDown],
  [KeyboardKeys.ArrowLeft, mergeMatrixLeft],
  [KeyboardKeys.ArrowRight, mergeMatrixRight],
]);

function useGameShared() {
  const gridSize = ref(6);
  const board = ref<Matrix>(createEmptyMatrix(gridSize.value));
  const flattenBoard = ref<Vector>(
    flattenMatrix(createEmptyMatrix(gridSize.value)),
  );
  const score = ref(0);
  const gameOver = ref(false);
  const scoreDiff = ref(0);
  const keyEventsCleanupsFns = new Map<KeyboardKeys, Function>();

  function newGame() {
    gameOver.value = false;
    const newBoard = addNumberToRandomPlace(
      createEmptyMatrix(gridSize.value),
      2,
    );
    board.value = newBoard as Matrix;
    flattenBoard.value = flattenMatrix(newBoard as Matrix);
    console.log("registering");
    registerKeyEvents();
  }

  function moveBoard(direction: KeyboardKeys) {
    const moveMethod = moveMethodsMap.get(direction);
    if (moveMethod) {
      const newBoard = moveMethod(board.value);
      board.value = newBoard;
      flattenBoard.value = flattenMatrix(newBoard);
      const newScore = calculateScore(board.value);
      scoreDiff.value = newScore - score.value;
      score.value = newScore;
      turn();
    }
  }

  function clearBoard() {
    const newBoard = createEmptyMatrix(gridSize.value);
    board.value = newBoard;
    flattenBoard.value = flattenMatrix(newBoard);
    removeKeyEvents();
  }

  function turn() {
    const newBoard = addNumberToRandomPlace(board.value, 2);
    if (!newBoard) {
      gameOver.value = true;
      return;
    }
    board.value = newBoard;
    flattenBoard.value = flattenMatrix(newBoard);
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
          console.log("event", event.key);
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
    flattenBoard,
    clearBoard,
    moveBoard,
    score,
    scoreDiff,
    gameOver,
    setGridSize,
  };
}

export const useGame = createSharedComposable(useGameShared);
