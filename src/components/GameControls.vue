<script lang="ts" setup>
import AppButton from "@/components/AppButton.vue";
import IconArrow from "@/components/icons/IconArrow.vue";
import { use2048Game } from "@/composables/use2048Game";
import { KeyboardKeys } from "@/types/keyboard";
import { useMagicKeys } from "@vueuse/core";

const { left, right, down, up } = useMagicKeys();

const { moveBoard } = use2048Game();
</script>
<template>
  <div class="grid grid-cols-3 gap-3 place-self-center">
    <span></span>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowUp)" :is-active="up">
      <IconArrow></IconArrow>
    </AppButton>
    <span></span>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowLeft)" :is-active="left">
      <IconArrow class="-rotate-90"></IconArrow>
    </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowDown)" :is-active="down">
      <IconArrow class="rotate-180"></IconArrow>
    </AppButton>
    <AppButton @click="moveBoard(KeyboardKeys.ArrowRight)" :is-active="right">
      <IconArrow class="rotate-90"></IconArrow>
    </AppButton>
  </div>
</template>
