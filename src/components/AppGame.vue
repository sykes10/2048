<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameControls from "@/components/GameControls.vue";
import AppButton from "@/components/AppButton.vue";
import { useGame } from "@/composables/useGame";

const { score, scoreDiff, newGame, clearBoard } = useGame();
</script>
<template>
  <div class="flex justify-center flex-col">
    <div>score: {{ score }} + scoreDiff: {{ scoreDiff }}</div>
    <AppButton @click="newGame"> New Game </AppButton>
    <AppButton @click="clearBoard"> Clear Board </AppButton>
  </div>
  <GameBoard> </GameBoard>
  <div class="mx-auto">
    <GameControls></GameControls>
  </div>
</template>
