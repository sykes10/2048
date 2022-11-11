<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center"
    >
      <h1 class="text-2xl font-bold mb-4">Game Over</h1>
      <p class="mb-4">Your score: {{ score }}</p>
      <AppButton @click="newGame"> New Game </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from "./AppButton.vue";
import { useGame } from "@/composables/useGame";
const { score, newGame } = useGame();
</script>
