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
} from "@/lib/2048game";
import { KeyboardKeys } from "@/types/keyboard";

import { onKeyUp } from "@vueuse/core";
import { use2048GameStateStore } from "@/store/2048GameState";

export function use2048Game() {
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

  const keyEventsCleanupsFns = new Map<KeyboardKeys, Function>();
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
      2,
    );
    $gameStateStore.newGame(newBoard);
    removeKeyEvents();
    registerKeyEvents();
    console.log("registerKeyEvents");
  }

  function resetGame() {
    removeKeyEvents();
    $gameStateStore.resetGame();
  }

  function moveBoard(direction: KeyboardKeys) {
    const moveMethod = moveMethodsMap.get(direction);
    if (moveMethod && $gameStateStore.$state.isRunning) {
      const newBoard = moveMethod($gameStateStore.$state.board);
      console.log(
        "moveBoard",
        JSON.stringify($gameStateStore.$state.board),
        JSON.stringify(newBoard),
      );
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
    if (isBoardFull($gameStateStore.$state.board)) {
      $gameStateStore.gameOver();
      removeKeyEvents();
      console.log("removeKeyEvents");
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
    resetGame,
    tileColorMap,
  };
}
