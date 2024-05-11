<script setup>
import CharacterDropdownInput from "./anime/CharacterDropdownInput.vue";
import { addAttempt } from "./anime/CharacterAttempt.js";
import { useGuestCharacterStore } from "@/store/guestCharacterStore.js";
import { ref, watch } from "vue";

const guestCharacterStore = useGuestCharacterStore();

const success = ref(false);
const listReverse = ref([]);
const clue = ref(false);

const selectOption = (option) => {
  guestCharacterStore.attempts.push(option);
  const index = guestCharacterStore.characters.indexOf(option);
  guestCharacterStore.characters.splice(index, 1);
  addAttempt(option);
  setTimeout(() => {
    if (option === guestCharacterStore.dailyCharacter) {
      success.value = true;
    }
  }, 1000);
};

const toggleClue = (clueName) => {
  if (clue.value != guestCharacterStore.dailyCharacter[clueName]) {
    if (clueName === "teams") {
      clue.value = guestCharacterStore.dailyCharacter[clueName].join(", ");
    } else {
      clue.value = guestCharacterStore.dailyCharacter[clueName];
    }
  } else {
    clue.value = false;
  }
};

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
      <img class="logo" src="@/assets/logo.png" />
      <div id="blackboard" class="blackboard mt-5">
        <p class="gametitle">
          ¡ADIVINA EL PERSONAJE DE CAPTAIN TSUBASA DE HOY!
        </p>
        <div class="clues">
          <button
            class="button clue-btn"
            :disabled="guestCharacterStore.attempts.length < 3"
            @click="toggleClue('role')"
          >
            ROL</button
          ><button
            class="button clue-btn"
            :disabled="guestCharacterStore.attempts.length < 5"
            @click="toggleClue('country')"
          >
            PAÍS</button
          ><button
            class="button clue-btn"
            :disabled="guestCharacterStore.attempts.length < 7"
            @click="toggleClue('teams')"
          >
            EQUIPOS
          </button>
        </div>
        <div v-if="guestCharacterStore.dailyCharacter && clue" class="clue">
          <p>{{ clue.toUpperCase() }}</p>
        </div>
      </div>
      <CharacterDropdownInput
        :finish="success"
        :game-options="guestCharacterStore.characters"
        style="position: absolute"
        @send-attempt="selectOption($event)"
      />
    </div>
    <div id="attempt-list"></div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 50%;
  display: block;
  margin: 0 auto;
}

.panel {
  width: 100%;
  height: 100vh;
}

.game-panel {
  max-width: 500px;
  margin: 0 auto;
  z-index: 1000;
  padding: 1rem;
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

.blackboard {
  max-width: 70%;
  height: 200px;
  border-radius: 5px;
  background-color: #3ab11a;
  margin: 0 auto;
  border: 3px solid #fff;
}

.gametitle {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 3px #000;
  height: 33%;
  padding: 1.5rem;
}

.clues {
  display: flex;
  justify-content: space-between;
  height: 33%;
  padding: 1rem 0.5rem;
}

.clue-btn {
  background-color: transparent;
  text-align: center;
  color: white;
  font-size: small;
  text-shadow: 2px 2px 3px #000;
  border: 3px solid #fff;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 50%;
}

.clue-btn:hover {
  border: 3px solid #fff;
  background-color: #297713;
}

.clue-btn:focus {
  color: white;
  font-size: small;
  text-shadow: 2px 2px 3px #000;
  border: 3px solid #fff;
}

.clue p {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 3px #000;
  height: 33%;
  padding: 1.5rem;
}

#attempt-list {
  width: 100%;
  justify-content: center;
}
</style>
