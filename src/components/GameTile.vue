<template>
  <div
    ref="tileRef"
    :class="`bg-tile-${tile} text-tile-${tile}`"
    class="flex items-center justify-center text-2xl rounded-xl justify-self-center transition-all duration-300 ease-in-out font-medium w-full"
  >
    {{ props.tile || "" }}
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

type GameCellProps = {
  tile: number;
};

const tileRef = ref<HTMLDivElement | null>(null);
const props = defineProps<GameCellProps>();

const colors: Record<string, string> = {
  "0": "#2B1C47",
  "2": "#ED64E5",
  "4": "#CD7DFF",
  "8": "#895AFF",
  "16": "#7BA1FF",
  "32": "#42AEFF",
  "64": "#00CFC3",
  "128": "#00BC84",
  "256": "#ACC800",
  "512": "#E7A600",
  "1024": "#FF7A00",
  "2048": "#FF004D",
};

function setTileDropShadow() {
  if (tileRef.value) {
    tileRef.value.style.setProperty(
      "filter",
      `drop-shadow(0 0 0.5rem ${colors[props.tile]})`,
    );
  }
}

onMounted(() => {
  setTileDropShadow();
});

watch(() => props.tile, setTileDropShadow, { immediate: true });
</script>
