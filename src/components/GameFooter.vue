<template>
  <div class="mx-auto grid grid-cols-2 gap-4">
    <div
      class="bg-tile-0 p-4 text-white rounded-xl w-full text-xs md:text-sm border-tile-8 border"
    >
      <p class="mb-2">How to play:</p>
      <p>Use your arrow keys to move the tiles or click on the arrows.</p>
    </div>
    <GameControls></GameControls>
  </div>
</template>

<script lang="ts" setup>
import GameControls from "@/components/GameControls.vue";
</script>
