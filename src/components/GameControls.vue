<script lang="ts" setup>
import AppButton from "./AppButton.vue";
import { use2048Game } from "@/composables/use2048GameGame";
import { KeyboardKeys } from "@/types/keyboard";
const { moveBoard } = use2048Game();
</script>
<template>
  <div class="flex gap-2">
    <AppButton @click="moveBoard(KeyboardKeys.ArrowRight)">
      moveRight
    </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowLeft)"> moveLeft </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowUp)"> moveUp </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowDown)"> moveDown </AppButton>
  </div>
</template>
