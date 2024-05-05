<script setup>
import AnimeDropdownInput from "./anime/AnimeDropdownInput.vue";
import AnimeAttempt from "./anime/AnimeAttempt.vue";
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";
import { computed, ref } from "vue";

const guestAnimeStore = useGuestAnimeStore();

const sucess = ref(false);

const searchAnime = computed(() => {
  let filteredAnimes = [];
  if (guestAnimeStore.animeNameInput) {
    filteredAnimes = guestAnimeStore.animes.filter((anime) =>
      anime.title.toLowerCase().includes(guestAnimeStore.animeNameInput)
    );
  }
  return filteredAnimes;
});

const attemptList = computed(() => {
  return guestAnimeStore.attempts.reverse();
});

const selectOption = (option) => {
  guestAnimeStore.attempts.push(option);
  const index = guestAnimeStore.animes.indexOf(option);
  guestAnimeStore.animes.splice(index, 1);
  if (option === guestAnimeStore.dailyAnime) {
    sucess.value = true;
  }
};
</script>

<template>
  <div class="panel">
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
      <AnimeDropdownInput
        :finish="sucess"
        :game-options="searchAnime"
        @send-attempt="selectOption($event)"
      />
    </div>
    <div id="attempt-list" class="attempt">
      <AnimeAttempt
        v-for="(attempt, idx) in attemptList"
        :key="idx"
        :attempt="attempt"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  width: 50%;
  height: 100vh;
}

.game-panel {
  width: 50%;
  margin: 0 auto;
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

.attempt {
  width: 100%;
}
</style>
