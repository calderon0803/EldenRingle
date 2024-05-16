<script setup>
import GuessCharacter from "./components/GuessCharacter.vue";
import { onMounted } from "vue";
import {
  useDataLoader,
  crateLocalStorage,
  getLocalStorageTodayAttempts,
} from "@/composables/dataLoader.js";
import TheToast from "./components/layout/TheToast.vue";
import { useGuessCharacterStore } from "./store/guessCharacterStore.js";
import { addAttempt } from "@/components/anime/CharacterAttempt.js";

const guessCharacterStore = useGuessCharacterStore();
onMounted(async () => {
  await useDataLoader();
  crateLocalStorage();
  guessCharacterStore.attempts = getLocalStorageTodayAttempts();
  guessCharacterStore.attempts.forEach((attempt) => {
    const index = guessCharacterStore.characters.indexOf(attempt);
    guessCharacterStore.characters.splice(index, 1);
    addAttempt(attempt);
  });
});
</script>

<template>
  <div class="grid">
    <GuessCharacter />
  </div>
  <TheToast />
</template>

<style lang="scss">
@use "@/styles";
</style>

<style lang="scss" scoped>
.app {
  text-align: center;
}

.grid {
  display: flex;
  justify-content: center;
  position: relative;
  grid-template-rows: app-variables.$height-header 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 0;
  height: 100vh;
  overflow-x: hidden;
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  background-position: center;
}
</style>
