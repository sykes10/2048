<template>
  <div class="grid md:grid-cols-2 w-full items-center gap-5 md:gap-4">
    <div
      class="flex justify-between items-center gap-4 place-self-start w-full"
    >
      <AppButton @click="$gameState.setGridSelector(true)" class="shrink-0">
        New game
      </AppButton>
      <AppButton @click="newGame()" class="">
        <IconRestart></IconRestart>
      </AppButton>
    </div>
    <div class="flex justify-between items-center gap-4">
      <GameScore :score="$gameState.$state.score" label="Score" />
      <GameScore :score="$gameState.$state.bestScore" label="Best" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { use2048GameStateStore } from "@/store/2048GameState";
import { use2048Game } from "@/composables/use2048Game";
import AppButton from "@/components/AppButton.vue";
import IconRestart from "@/components/icons/IconRestart.vue";
import GameScore from "@/components/GameScore.vue";

const $gameState = use2048GameStateStore();
const { newGame } = use2048Game();
</script>
