<template>
  <div
    :class="`grid-cols-${$gameState.$state.gridSize} grid-rows-${$gameState.$state.gridSize}`"
    ref="gameBoardRef"
    class="grid gap-4 rounded mx-auto relative w-full my-4"
  >
    <GameTile
      :tile="tile"
      v-for="(tile, i) in $gameState.flattenBoard"
      :key="i"
    />
    <GameOverOverlay v-if="$gameState.isGameOver" />
    <GameGridSelectorOverlay v-if="$gameState.isGridSelectorOpen" />
    <GameWonOverlay v-if="$gameState.isGameWon" />
  </div>
</template>
<script lang="ts" setup>
import GameOverOverlay from "@/components/GameOverOverlay.vue";
import GameGridSelectorOverlay from "@/components/GameGridSelectorOverlay.vue";
import GameWonOverlay from "./GameWonOverlay.vue";
import GameTile from "@/components/GameTile.vue";
import { use2048GameStateStore } from "@/store/2048GameState";

import { onMounted, ref, watch } from "vue";

const $gameState = use2048GameStateStore();

const gameBoardRef = ref<HTMLDivElement | null>(null);

function setGridDimensions() {
  if (gameBoardRef.value) {
    gameBoardRef.value.style.setProperty(
      "height",
      `${gameBoardRef.value.offsetWidth}px`,
    );
  }
}

onMounted(() => {
  setGridDimensions();
});

watch(() => $gameState.$state.gridSize, setGridDimensions);
</script>
