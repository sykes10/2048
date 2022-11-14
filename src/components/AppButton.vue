<template>
  <button
    :class="isActive ? 'translate-y-1 shadow-button-pressed' : ''"
    class="rounded-xl bg-purple-500 px-4 h-12 text-white text-lg shadow-button active:shadow-button-pressed active:translate-y-1 cursor-pointer whitespace-nowrap"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
type AppButtonProps = {
  isActive?: boolean;
};
defineProps<AppButtonProps>();
</script>
