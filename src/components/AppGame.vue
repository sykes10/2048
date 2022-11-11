<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameControls from "@/components/GameControls.vue";
import GameOverOverlay from "./GameOverOverlay.vue";
import { useGame } from "@/composables/useGame";

const { score, scoreDiff, gameOver } = useGame();
</script>
<template>
  score: {{ score }} + scoreDiff: {{ scoreDiff }}
  <GameBoard> </GameBoard>
  <GameControls></GameControls>
  <GameOverOverlay v-if="gameOver"></GameOverOverlay>
</template>
