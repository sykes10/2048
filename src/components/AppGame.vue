<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameControls from "@/components/GameControls.vue";
import AppButton from "@/components/AppButton.vue";
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";
import IconRestart from "@/components/icons/IconRestart.vue";

const $gameState = use2048GameStateStore();
const { score, scoreDiff } = $gameState.$state;
const { newGame, resetGame } = use2048Game();

resetGame();
</script>
<template>
  <div class="flex justify-center flex-col max-w-md w-full mx-auto">
    <div class="">
      <AppButton @click="newGame"> New game </AppButton>
      <AppButton @click="resetGame">
        <IconRestart></IconRestart>
      </AppButton>
      <div
        class="flex justify-end flex-col text-white bg-tile-0 p-4 rounded-xl"
      >
        <span class="text-xs">Score</span>
        <span class="text-xl self-end">{{ score }}</span>
      </div>
    </div>
    <GameBoard> </GameBoard>
    <div class="mx-auto">
      <GameControls></GameControls>
    </div>
  </div>
</template>
