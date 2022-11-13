<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameControls from "@/components/GameControls.vue";
import AppButton from "@/components/AppButton.vue";
import { use2048Game } from "@/composables/useGame";
import { use2048GameStateStore } from "@/store/2048GameState";

const $gameState = use2048GameStateStore();
const { score, scoreDiff } = $gameState.$state;
const { newGame, resetGame } = use2048Game();

resetGame();
</script>
<template>
  <div class="flex justify-center flex-col max-w-md w-full mx-auto">
    <AppButton @click="newGame"> New Game </AppButton>
    <GameBoard> </GameBoard>
    <div class="mx-auto">
      <GameControls></GameControls>
    </div>
  </div>
</template>
