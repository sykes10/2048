<template>
  <div
    class="absolute -top-[2%] -left-[2%] bottom-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col text-white w-[104%] h-[104%] rounded-xl"
  >
    <div
      class="flex flex-col gap-4 p-4 border-tile-4 drop-shadow-tile-4 bg-tile-0 rounded-xl w-60"
    >
      <p class="text-xl text-center">Select <br />board size</p>
      <button
        @click="setGrid(4)"
        class="bg-purple-500 rounded-xl h-12 text-2xl"
      >
        4x4
      </button>
      <button
        @click="setGrid(5)"
        class="bg-purple-500 rounded-xl h-12 text-2xl"
      >
        5x5
      </button>
      <button
        @click="setGrid(5)"
        class="bg-purple-500 rounded-xl h-12 text-2xl"
      >
        6x6
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";

const { newGame } = use2048Game();

const $gameState = use2048GameStateStore();

function setGrid(gridSize: number) {
  $gameState.setGridSize(gridSize);
  newGame();
  $gameState.setGridSelector(false);
}
</script>
