<template>
  <div>
    <AppButton @click="$gameState.setGridSize(4)"> 4x4 </AppButton>
    <AppButton @click="$gameState.setGridSize(5)"> 5x5 </AppButton>
    <AppButton @click="$gameState.setGridSize(6)"> 6x6 </AppButton>
    <AppButton @click="$gameState.setGridSize(8)"> 8x8 </AppButton>
  </div>
  <div
    :class="`grid-cols-${$gameState.$state.gridSize} grid-rows-${$gameState.$state.gridSize}`"
    ref="gameBoardRef"
    class="grid gap-4 rounded mx-auto relative w-full my-4"
  >
    <GameTile
      :tile="tile"
      v-for="(tile, i) in $gameState.$state.flattenedBoard"
      :key="i"
    />
    <GameOverOverlay v-if="$gameState.isGameOver" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/AppButton.vue";
import GameOverOverlay from "@/components/GameOverOverlay.vue";
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
