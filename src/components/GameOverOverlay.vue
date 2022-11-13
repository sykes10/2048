<template>
  <div
    class="absolute top-0 left-0 bottom-0 right-0 w-full bg-black bg-opacity-50 z-50 flex justify-center items-center flex-col text-white"
  >
    <h1 class="text-2xl font-bold mb-4">Game Over</h1>
    <p class="mb-4">Your score: {{ $gameState.$state.score }}</p>
    <AppButton @click="newGame"> New Game </AppButton>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "./AppButton.vue";
import { use2048Game } from "@/composables/use2048Game";
import { use2048GameStateStore } from "@/store/2048GameState";

const $gameState = use2048GameStateStore();
const { newGame } = use2048Game();
</script>
