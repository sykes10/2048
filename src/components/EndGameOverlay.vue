<template>
  <GameOverlay>
    <h1 class="text-7xl font-bold mb-4" v-html="text"></h1>
  </GameOverlay>
</template>
<script lang="ts" setup>
import GameOverlay from "@/components/GameOverlay.vue";
import { use2048GameStateStore } from "@/store/2048GameState";
import { computed } from "vue";

const $gameState = use2048GameStateStore();

const text = computed(() => {
  return $gameState.$state.isGameOver ? "Game <br />Over" : "You <br />Won!";
});
</script>
