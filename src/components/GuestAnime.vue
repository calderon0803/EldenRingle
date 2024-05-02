<script setup>
import BaseDropdownInput from "./base/ui/BaseDropdownInput.vue";
import BaseAnimeAttempt from "./base/ui/BaseAnimeAttempt.vue";
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";
import { ref, computed } from "vue";

const guestAnimeStore = useGuestAnimeStore();

const animeNameInput = ref(null);

const searchAnime = computed(() => {
  const filteredAnimes = guestAnimeStore.animes.filter((anime) =>
    anime.name.toLowerCase().includes(animeNameInput.value)
  );
  return filteredAnimes;
});
</script>

<template>
  <div class="game-panel">
    <div class="card mt-5">
      <div class="card-content">
        <div class="content">
          ¡ADIVINA EL ANIME DE HOY!
          <br />
          <br />
          <br />
          <p>Escribe cualquier carácter para empezar.</p>
        </div>
      </div>
      <footer class="card-footer">
        <span class="card-footer-item">Género</span>
        <span class="card-footer-item">Año</span>
        <span class="card-footer-item">Autor</span>
      </footer>
    </div>
    <BaseDropdownInput
      :game-options="searchAnime"
      @update:model-value="animeNameInput = $event"
    />
    <!-- <div class="section__row section__row--left">
      <BaseAnimeAttempt />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.game-panel {
  width: 30%;
  height: 100%;
}

/* stylelint-disable-next-line selector-class-pattern */
.section__row {
  &--left {
    width: 65%;
  }

  &--right {
    width: 35%;
  }
}
</style>
