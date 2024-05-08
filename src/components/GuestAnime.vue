<script setup>
import AnimeDropdownInput from "./anime/AnimeDropdownInput.vue";
import AnimeAttempt from "./anime/AnimeAttempt.vue";
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";
import AnimeClue from "./anime/AnimeClue.vue";
import { computed, ref, watch } from "vue";

const guestAnimeStore = useGuestAnimeStore();

const success = ref(false);
const listReverse = ref([]);

const searchAnime = computed(() => {
  let filteredAnimes = [];
  if (guestAnimeStore.animeNameInput) {
    const lowerCaseInput = guestAnimeStore.animeNameInput.toLowerCase();
    filteredAnimes = guestAnimeStore.animes.filter((anime) =>
      anime.title.toLowerCase().includes(lowerCaseInput)
    );
  }
  return filteredAnimes;
});

const selectOption = (option) => {
  guestAnimeStore.attempts.push(option);
  const index = guestAnimeStore.animes.indexOf(option);
  guestAnimeStore.animes.splice(index, 1);
  if (option === guestAnimeStore.dailyAnime) {
    success.value = true;
  }
};

watch(
  () => guestAnimeStore.attempts,
  (newVal) => {
    listReverse.value = [];
    for (let i = newVal.length - 1; i >= 0; i--) {
      listReverse.value.push(newVal[i]);
    }
  },
  { deep: true }
);
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
        <footer v-if="guestAnimeStore.dailyAnime" class="card-footer">
          <span class="card-footer-item"
            ><AnimeClue
              :type="'Género'"
              :value="guestAnimeStore.dailyAnime.genres[0]"
          /></span>
          <span class="card-footer-item"
            ><AnimeClue
              :type="'Estado'"
              :value="guestAnimeStore.dailyAnime.state"
          /></span>
          <span class="card-footer-item"
            ><AnimeClue :type="'Año'" :value="guestAnimeStore.dailyAnime.year"
          /></span>
        </footer>
      </div>
      <AnimeDropdownInput
        :finish="success"
        :game-options="searchAnime"
        @send-attempt="selectOption($event)"
      />
    </div>
    <div id="attempt-list">
      <AnimeAttempt
        v-for="(attempt, idx) in listReverse"
        :key="idx"
        class="attempt"
        :attempt="attempt"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.panel {
  width: 100%;
  height: 100vh;
}

.game-panel {
  width: 30%;
  margin: 0 auto;
  z-index: 1000;
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

#attempt-list {
  width: 100%;
  justify-content: center;
}
</style>
