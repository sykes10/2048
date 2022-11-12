<template>
  <div>
    <AppButton @click="setGridSize(4)"> 4x4 </AppButton>
    <AppButton @click="setGridSize(5)"> 5x5 </AppButton>
    <AppButton @click="setGridSize(6)"> 6x6 </AppButton>
    <AppButton @click="setGridSize(8)"> 8x8 </AppButton>
  </div>
  <div
    :class="`grid-cols-${gridSize} grid-rows-${gridSize}`"
    ref="gameBoard"
    class="grid gap-2 p-2 border-2 shadow rounded bg-gray-800 overflow-hidden mx-auto relative"
  >
    <GameTile :tile="tile" v-for="(tile, i) in flattenedBoard" :key="i" />
    <GameOverOverlay v-if="gameOver" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/AppButton.vue";
import GameOverOverlay from "@/components/GameOverOverlay.vue";
import GameTile from "@/components/GameTile.vue";
import { useGame } from "@/composables/useGame";
import { onMounted, ref, watch } from "vue";

const {
  flattenedBoard,
  gridSize,
  newGame,
  clearBoard,
  setGridSize,
  gameOver,
  continueGame,
} = useGame();

const gameBoard = ref<HTMLDivElement | null>(null);

function setGridWithd() {
  if (gameBoard.value) {
    gameBoard.value.style.setProperty(
      "width",
      `${gridSize.value * 64 + 8 * (gridSize.value + 1)}px`,
    );
  }
}

onMounted(() => {
  setGridWithd();
});

watch(() => gridSize.value, setGridWithd);
</script>
