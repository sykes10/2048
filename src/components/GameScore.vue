<template>
  <div
    class="flex flex-col items-end text-white bg-tile-0 px-4 py-2 rounded-xl w-1/2 border-tile-8 border h-14"
  >
    <span class="text-xs">{{ label }}</span>
    <span class="self-end">{{ score }}</span>
  </div>
</template>

<script lang="ts" setup>
type GameScoreProps = {
  score: number;
  label: string;
};
defineProps<GameScoreProps>();
</script>
