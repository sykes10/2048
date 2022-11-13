<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameControls from "@/components/GameControls.vue";
import AppButton from "@/components/AppButton.vue";
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";
import IconRestart from "@/components/icons/IconRestart.vue";

const $gameState = use2048GameStateStore();
const { resetGame } = use2048Game();

resetGame();
</script>
<template>
  <div class="flex justify-center flex-col max-w-md w-full mx-auto">
    <div class="flex justify-between">
      <div class="flex items-center">
        <AppButton @click="$gameState.setGridSelector(true)" class="mr-4">
          New game
        </AppButton>
        <AppButton @click="resetGame">
          <IconRestart></IconRestart>
        </AppButton>
      </div>
      <div
        class="flex flex-col items-end text-white bg-tile-0 px-4 py-2 h-14 rounded-xl my-4 w-40"
      >
        <span class="text-xs">Score</span>
        <span class="text-xl self-end">{{ $gameState.$state.score }}</span>
      </div>
    </div>
    <GameBoard class="mb-8"> </GameBoard>
    <div class="mx-auto grid grid-cols-2 gap-4">
      <div class="bg-tile-0 p-4 text-white rounded-xl w-full text-sm">
        <p class="mb-2">How to play:</p>
        <p>Use your arrow keys to move the tiles or click on the arrows.</p>
      </div>
      <GameControls></GameControls>
    </div>
  </div>
</template>
