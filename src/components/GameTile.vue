<template>
  <div
    ref="tileRef"
    :class="`bg-tile-${tile} drop-shadow-tile-${tile}`"
    class="flex items-center justify-center text-2xl rounded-xl justify-self-center transition-all duration-300 ease-in-out font-medium w-full"
  >
    {{ props.tile || "" }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

type GameCellProps = {
  tile: number;
};

const tileRef = ref<HTMLDivElement | null>(null);
const props = defineProps<GameCellProps>();
</script>
