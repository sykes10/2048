<template>
  <div
    :class="colorClass"
    class="flex items-center justify-center text-2xl rounded justify-self-center h-16 w-16"
  >
    {{ props.number || "" }}
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useGame } from "@/composables/useGame";

const { tileColorMap } = useGame();

type GameCellProps = {
  number: number;
};

const props = defineProps<GameCellProps>();

const colorClass = computed(() => {
  return tileColorMap.get(props.number);
});
</script>
