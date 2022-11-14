<script lang="ts" setup>
import GameBoard from "@/components/GameBoard.vue";
import GameFooter from "@/components/GameFooter.vue";
import GameHeader from "@/components/GameHeader.vue";
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";
import { onMounted } from "vue";

const $gameState = use2048GameStateStore();
const { newGame } = use2048Game();

onMounted(() => {
  if ($gameState.lastKnownBoard) {
    $gameState.setGridSize($gameState.lastKnownBoard.length);
    newGame($gameState.lastKnownBoard);
  } else {
    newGame();
  }
});
</script>
<template>
  <img
    src="/images/2048game.png"
    alt="2048 title"
    class="mx-auto w-52 mb-4 mt-3 md:mt-8"
  />
  <div class="flex justify-center flex-col max-w-md w-full mx-auto">
    <GameHeader />
    <GameBoard class="my-8"> </GameBoard>
    <GameFooter />
  </div>
</template>
