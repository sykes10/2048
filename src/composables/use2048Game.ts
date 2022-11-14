import {
  createEmptyBoard,
  mergeBoardDown,
  mergeBoardLeft,
  mergeBoardRight,
  mergeBoardUp,
  addNumberToRandomPlace,
  calculateScore,
  isBoardEqual,
  isGameWon,
  isGameOver,
} from "@/lib/2048Game";
import { KeyboardKeys } from "@/types/keyboard";

import { onKeyUp } from "@vueuse/core";
import { use2048GameStateStore } from "@/store/2048GameState";
import type { Board } from "@/types/2048game";

const moveMethodsMap = new Map([
  [KeyboardKeys.ArrowUp, mergeBoardUp],
  [KeyboardKeys.ArrowDown, mergeBoardDown],
  [KeyboardKeys.ArrowLeft, mergeBoardLeft],
  [KeyboardKeys.ArrowRight, mergeBoardRight],
]);

const keyEventsCleanupsFns = new Map<KeyboardKeys, Function>();

export function use2048Game() {
  const $gameStateStore = use2048GameStateStore();

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

  function newGame(board?: Board) {
    const newBoard = addNumberToRandomPlace(
      createEmptyBoard($gameStateStore.$state.gridSize),
      $gameStateStore.$state.initialTileValueToSpawn,
    );
    $gameStateStore.newGame(board || newBoard);
    removeKeyEvents();
    registerKeyEvents();
  }

  function moveBoard(direction: KeyboardKeys) {
    const moveMethod = moveMethodsMap.get(direction);
    if (moveMethod && $gameStateStore.$state.isRunning) {
      const newBoard = moveMethod($gameStateStore.$state.board);
      if (isBoardEqual(newBoard, $gameStateStore.$state.board)) {
        return;
      }

      const newScore = calculateScore(
        newBoard,
        $gameStateStore.$state.mininumTileValueToSpawn,
      );
      $gameStateStore.updateScore(newScore);
      $gameStateStore.updateBoard(newBoard);
      turn();
    }
  }
  function turn() {
    if (
      isGameWon(
        $gameStateStore.$state.board,
        $gameStateStore.$state.tileValueToWin,
      )
    ) {
      $gameStateStore.gameWon();
      return;
    }
    const newBoard = addNumberToRandomPlace(
      $gameStateStore.$state.board,
      $gameStateStore.$state.mininumTileValueToSpawn,
    );
    $gameStateStore.updateBoard(newBoard);
    if (isGameOver($gameStateStore.$state.board)) {
      $gameStateStore.gameOver();
      removeKeyEvents();
      return;
    }
  }

  return {
    newGame,
    moveBoard,
  };
}
