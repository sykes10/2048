<template>
  <GameOverlay>
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
        @click="setGrid(6)"
        class="bg-purple-500 rounded-xl h-12 text-2xl"
      >
        6x6
      </button>
    </div>
  </GameOverlay>
</template>
<script lang="ts" setup>
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";
import GameOverlay from "@/components/GameOverlay.vue";

const { newGame } = use2048Game();

const $gameState = use2048GameStateStore();

function setGrid(gridSize: number) {
  $gameState.setGridSize(gridSize);
  newGame();
  $gameState.setGridSelector(false);
}
</script>
