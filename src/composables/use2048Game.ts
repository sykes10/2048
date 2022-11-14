import {
  createEmptyBoard,
  mergeBoardDown,
  mergeBoardLeft,
  mergeBoardRight,
  mergeBoardUp,
  addNumberToRandomPlace,
  calculateScore,
  isBoardFull,
  isBoardEqual,
  isGameWon,
} from "@/lib/2048game";
import { KeyboardKeys } from "@/types/keyboard";

import { onKeyUp } from "@vueuse/core";
import { use2048GameStateStore } from "@/store/2048GameState";
import { createSharedComposable } from "@vueuse/core";

const moveMethodsMap = new Map([
  [KeyboardKeys.ArrowUp, mergeBoardUp],
  [KeyboardKeys.ArrowDown, mergeBoardDown],
  [KeyboardKeys.ArrowLeft, mergeBoardLeft],
  [KeyboardKeys.ArrowRight, mergeBoardRight],
]);

const keyEventsCleanupsFns = new Map<KeyboardKeys, Function>();

export const use2048Game = createSharedComposable(function () {
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

  function newGame() {
    const newBoard = addNumberToRandomPlace(
      createEmptyBoard($gameStateStore.$state.gridSize),
      $gameStateStore.$state.mininumTileValueToSpawn,
    );
    $gameStateStore.newGame(newBoard);
    removeKeyEvents();
    registerKeyEvents();
  }

  function moveBoard(direction: KeyboardKeys) {
    const moveMethod = moveMethodsMap.get(direction);
    if (moveMethod && $gameStateStore.$state.isRunning) {
      const newBoard = moveMethod($gameStateStore.$state.board);
      if (isBoardEqual(newBoard, $gameStateStore.$state.board)) {
        console.log("no change");
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
    if (isBoardFull($gameStateStore.$state.board)) {
      $gameStateStore.gameOver();
      removeKeyEvents();
      return;
    }
    const newBoard = addNumberToRandomPlace(
      $gameStateStore.$state.board,
      $gameStateStore.$state.mininumTileValueToSpawn,
    );
    $gameStateStore.updateBoard(newBoard);
  }

  return {
    newGame,
    moveBoard,
  };
});
