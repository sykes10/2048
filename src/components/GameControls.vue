<script lang="ts" setup>
import AppButton from "@/components/AppButton.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import { use2048Game } from "@/composables/use2048Game";
import { KeyboardKeys } from "@/types/keyboard";
const { moveBoard } = use2048Game();
</script>
<template>
  <div class="grid grid-cols-3 gap-3 place-self-center">
    <span></span>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowUp)" class="">
      <IconArrow></IconArrow>
    </AppButton>
    <span></span>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowLeft)">
      <IconArrow class="-rotate-90"></IconArrow>
    </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowDown)">
      <IconArrow class="rotate-180"></IconArrow>
    </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowRight)">
      <IconArrow class="rotate-90"></IconArrow>
    </AppButton>
  </div>
</template>
