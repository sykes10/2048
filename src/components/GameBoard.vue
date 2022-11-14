<template>
  <div
    :class="`grid-cols-${$gameState.$state.gridSize} grid-rows-${$gameState.$state.gridSize}`"
    class="grid gap-4 rounded mx-auto relative w-full my-4"
  >
    <GameTile
      :tile="tile"
      v-for="(tile, i) in $gameState.flattenBoard"
      :key="i"
    />
    <GameGridSelectorOverlay v-if="$gameState.isGridSelectorOpen" />
    <EndGameOverlay v-if="$gameState.isGameWon || $gameState.isGameOver" />
  </div>
</template>
<script lang="ts" setup>
import GameGridSelectorOverlay from "@/components/GameGridSelectorOverlay.vue";
import EndGameOverlay from "@/components/EndGameOverlay.vue";
import GameTile from "@/components/GameTile.vue";
import { use2048GameStateStore } from "@/store/2048GameState";

const $gameState = use2048GameStateStore();
</script>
