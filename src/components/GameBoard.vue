<template>
  <div>
    <AppButton @click="newGame"> New Game </AppButton>
    <AppButton @click="clearBoard"> Clear Board </AppButton>
    <AppButton @click="setGridSize(4)"> 4x4 </AppButton>
    <AppButton @click="setGridSize(5)"> 5x5 </AppButton>
    <AppButton @click="setGridSize(6)"> 6x6 </AppButton>
    <AppButton @click="setGridSize(8)"> 8x8 </AppButton>
  </div>
  <div
    :class="`grid-cols-${gridSize} grid-rows-${gridSize}`"
    ref="gameBoard"
    class="grid gap-2 p-2 border-2 shadow rounded relative bg-gray-800 overflow-hidden mx-auto"
  >
    <GameTile :number="tile" v-for="(tile, i) in flattenBoard" :key="i" />
  </div>
</template>
<script lang="ts" setup>
import AppButton from "@/components/AppButton.vue";
import GameTile from "@/components/GameTile.vue";
import { useGame } from "@/composables/useGame";
import { onMounted, ref, watch } from "vue";

const { flattenBoard, gridSize, newGame, clearBoard, setGridSize } = useGame();

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
