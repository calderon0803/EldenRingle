<script setup>
import AnimeDropdownInput from "./anime/AnimeDropdownInput.vue";
import { addAttempt } from "./anime/AnimeAttempt.js";
import { useGuestCharacterStore } from "@/store/guestCharacterStore.js";
import AnimeClue from "./anime/AnimeClue.vue";
import { computed, ref, watch } from "vue";

const guestCharacterStore = useGuestCharacterStore();

const success = ref(false);
const listReverse = ref([]);

const searchAnime = computed(() => {
  let filteredAnimes = [];
  if (guestCharacterStore.characterNameInput) {
    const lowerCaseInput = guestCharacterStore.characterNameInput.toLowerCase();
    filteredAnimes = guestCharacterStore.characters.filter((character) =>
      character.name.toLowerCase().includes(lowerCaseInput)
    );
  }
  return filteredAnimes;
});

// const selectOption = (option) => {
//   guestAnimeStore.attempts.push(option);
//   const index = guestAnimeStore.animes.indexOf(option);
//   guestAnimeStore.animes.splice(index, 1);
//   if (option === guestAnimeStore.dailyAnime) {
//     success.value = true;
//   }
// };

watch(
  () => guestCharacterStore.attempts,
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
        <footer v-if="guestCharacterStore.dailyCharacter" class="card-footer">
          <span class="card-footer-item"
            ><AnimeClue
              :type="'Rol'"
              :value="guestCharacterStore.dailyCharacter.role"
          /></span>
          <span class="card-footer-item"
            ><AnimeClue
              :type="'Numero'"
              :value="guestCharacterStore.dailyCharacter.number"
          /></span>
          <span class="card-footer-item"
            ><AnimeClue
              :type="'Pais'"
              :value="guestCharacterStore.dailyCharacter.country"
          /></span>
        </footer>
      </div>
      <AnimeDropdownInput
        :finish="success"
        :game-options="searchAnime"
        @send-attempt="addAttempt($event)"
      />
    </div>
    <div id="attempt-list"></div>
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
