<script setup>
import CharacterDropdownInput from "./anime/CharacterDropdownInput.vue";
import { addAttempt } from "./anime/CharacterAttempt.js";
import { useGuestCharacterStore } from "@/store/guestCharacterStore.js";
import { ref, watch } from "vue";

const guestCharacterStore = useGuestCharacterStore();

const success = ref(false);
const listReverse = ref([]);
const clue = ref(null);
const attemptsLeftForClue = ref("Quedan 3 intentos para la siguiente pista");

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
  let clueText = guestCharacterStore.dailyCharacter[clueName];
  if (clue.value === clueText) {
    clueText = null;
  } else {
    if (clueName === "teams") {
      if (clue.value == clueText.join(", ")) {
        clueText = null;
      } else {
        if (clueText.length > 1) {
          clueText = clueText.join(", ");
        } else {
          clueText = clueText[0];
        }
      }
    }
  }
  clue.value = clueText;
};

watch(
  () => guestCharacterStore.attempts,
  (newVal) => {
    listReverse.value = [];
    for (let i = newVal.length - 1; i >= 0; i--) {
      listReverse.value.push(newVal[i]);
    }

    if (newVal.length >= 7) {
      attemptsLeftForClue.value = "No quedan intentos para pistas adicionales";
      const clue3 = document.getElementById("clue3");
      clue3.classList.remove("clue-btn-disabled");
      clue3.classList.add("clue-btn");
      clue3.onclick = () => toggleClue("teams");
    } else {
      if (newVal.length >= 5) {
        attemptsLeftForClue.value =
          "Quedan " + (7 - newVal.length) + " intentos para la siguiente pista";
        const clue2 = document.getElementById("clue2");
        clue2.classList.remove("clue-btn-disabled");
        clue2.classList.add("clue-btn");
        clue2.onclick = () => toggleClue("country");
      } else {
        if (newVal.length >= 3) {
          attemptsLeftForClue.value =
            "Quedan " +
            (5 - newVal.length) +
            " intentos para la siguiente pista";
          const clue1 = document.getElementById("clue1");
          clue1.classList.remove("clue-btn-disabled");
          clue1.classList.add("clue-btn");
          clue1.onclick = () => toggleClue("role");
        } else {
          attemptsLeftForClue.value =
            "Quedan " +
            (3 - newVal.length) +
            " intentos para la siguiente pista";
        }
      }
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
          <div id="clue1" class="clue-btn-disabled">
            <span class="mdi mdi-strategy mdi-24px"></span>
            <p>ROL</p>
          </div>
          <div id="clue2" class="clue-btn-disabled">
            <span class="mdi mdi-flag-variant mdi-24px"></span>
            <p>PAÍS</p>
          </div>
          <div id="clue3" class="clue-btn-disabled">
            <span class="mdi mdi-shield-crown mdi-24px"></span>
            <p>EQUIPOS</p>
          </div>
        </div>
        <div class="clue">
          <span>
            <p class="clue-text">
              <span v-if="guestCharacterStore.dailyCharacter && clue">{{
                clue.toUpperCase()
              }}</span>
            </p>
            <p class="attempts-for-clue">
              {{ attemptsLeftForClue }}
            </p></span
          >
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
  height: 30%;
  margin-top: 0.5rem;
  margin-bottom: auto;
}

.clues {
  display: flex;
  justify-content: space-between;
  height: 30%;
}

.clue-btn {
  background-color: transparent;
  color: white;
  font-size: small;
  text-shadow: 2px 2px 3px #000;
  border: 3px solid #fff;
  padding: 0.5rem 0;
  margin: auto;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  text-align: center;

  p {
    text-align: center;
    color: white;
    text-shadow: 2px 2px 3px #000;
  }
}

.clue-btn-disabled {
  background-color: transparent;
  color: #aaa;
  font-size: small;
  text-shadow: 2px 2px 3px #000;
  border: 3px solid #aaa;
  padding: 0.5rem 0;
  margin: auto;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  text-align: center;

  p {
    text-align: center;
    color: #aaa;
    text-shadow: 2px 2px 3px #000;
  }
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

.clue {
  height: 40%;
}

.clue p {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 3px #000;
  height: 58px;
}

#attempt-list {
  width: 100%;
  justify-content: center;
}

.clue-text {
  padding: 1rem 0;
  font-size: medium;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 3px #000;
  height: 70%;
}

.attempts-for-clue {
  font-size: 8px;
  text-align: center;
  color: white;
  height: 30%;
}
</style>
