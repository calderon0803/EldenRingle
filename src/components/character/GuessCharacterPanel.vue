<script setup>
import CharacterDropdownInput from "./CharacterDropdownInput.vue";
import { addAttempt } from "./CharacterAttempt.js";
import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { useDataLoader, getDataForChart } from "@/composables/dataLoader.js";
import { onMounted, ref, watch } from "vue";
import confetti from "canvas-confetti";

const guessCharacterStore = useGuessCharacterStore();

const clue = ref(null);
const attemptsLeftForClue = ref("3 intento/s para la siguiente pista");

onMounted(() => {
  useDataLoader();
});

const addOptionToAttempts = (option) => {
  guessCharacterStore.attempts.push(option);
  const index = guessCharacterStore.characters.indexOf(option);
  guessCharacterStore.characters.splice(index, 1);
  addAttempt(option);
  if (guessCharacterStore.dailyCharacterGuessed) {
    useDataLoader();
  } else {
    setTimeout(() => {
      if (option === guessCharacterStore.dailyCharacter) {
        guessCharacterStore.dailyCharacterGuessed = true;
        launchConfetti();
      }
      updateLocalStorage();
      getDataForChart();
    }, 1000);
  }
};

const updateLocalStorage = () => {
  localStorage.todayAttempts = JSON.stringify(guessCharacterStore.attempts);
  if (localStorage.todayGuessCharacterStorage) {
    const todayGuessCharacterStorage = JSON.parse(
      localStorage.todayGuessCharacterStorage
    );
    todayGuessCharacterStorage.character_attempts =
      guessCharacterStore.attempts;
    todayGuessCharacterStorage.character_attempts_count =
      guessCharacterStore.attempts.length;
    todayGuessCharacterStorage.guessed_character =
      guessCharacterStore.dailyCharacterGuessed;

    localStorage.todayGuessCharacterStorage = JSON.stringify(
      todayGuessCharacterStorage
    );
    if (guessCharacterStore.dailyCharacterGuessed) {
      const history = JSON.parse(localStorage.historyGuessCharacterStorage);
      history.push(todayGuessCharacterStorage);
      localStorage.historyGuessCharacterStorage = JSON.stringify(history);
    }
  }
};

const launchConfetti = () => {
  const end = Date.now() + 15 * 1000;

  // go Buckeyes!
  const colors = ["#0000bb", "#ffffff", "#bb0000"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

const toggleClue = (clueName) => {
  let clueText = guessCharacterStore.dailyCharacter[clueName];
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
  () => guessCharacterStore.attempts,
  (newVal) => {
    const clue1 = document.getElementById("clue1");
    const clue2 = document.getElementById("clue2");
    const clue3 = document.getElementById("clue3");

    if (newVal.length >= 7) {
      attemptsLeftForClue.value = "No quedan intentos para pistas adicionales";
      clue1.classList.remove("clue-btn-disabled");
      clue1.classList.add("clue-btn");
      clue1.onclick = () => toggleClue("role");
      clue2.classList.remove("clue-btn-disabled");
      clue2.classList.add("clue-btn");
      clue2.onclick = () => toggleClue("country");
      clue3.classList.remove("clue-btn-disabled");
      clue3.classList.add("clue-btn");
      clue3.onclick = () => toggleClue("teams");
    } else {
      if (newVal.length >= 5) {
        attemptsLeftForClue.value =
          7 - newVal.length + " intento/s para la siguiente pista";
        clue1.classList.remove("clue-btn-disabled");
        clue1.classList.add("clue-btn");
        clue1.onclick = () => toggleClue("role");
        clue2.classList.remove("clue-btn-disabled");
        clue2.classList.add("clue-btn");
        clue2.onclick = () => toggleClue("country");
      } else {
        if (newVal.length >= 3) {
          attemptsLeftForClue.value =
            5 - newVal.length + " intento/s para la siguiente pista";
          clue1.classList.remove("clue-btn-disabled");
          clue1.classList.add("clue-btn");
          clue1.onclick = () => toggleClue("role");
        } else {
          attemptsLeftForClue.value =
            3 - newVal.length + " intento/s para la siguiente pista";
        }
      }
    }
  },
  { deep: true }
);
</script>

<template>
  <div id="blackboard" class="blackboard mt-5">
    <p class="gametitle">¡ADIVINA EL PERSONAJE DE CAPTAIN TSUBASA DE HOY!</p>
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
          <span v-if="guessCharacterStore.dailyCharacter && clue">{{
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
    :finish="guessCharacterStore.dailyCharacterGuessed"
    :game-options="guessCharacterStore.characters"
    @send-attempt="addOptionToAttempts($event)"
  />
</template>

<style lang="scss" scoped>
.header {
  color: white;
  text-shadow: 2px 2px 3px #000;
  text-align: center;
  border-bottom: 3px solid white;
  width: 80px;
  margin: 3px;
}

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
  cursor: pointer;

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
  cursor: pointer;

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

.clue-text {
  padding: 1.5rem 0;
  font-size: medium;
  text-align: center;
  color: white;
  text-shadow: 2px 2px 3px #000;
  height: 70%;
}

.attempts-for-clue {
  font-size: 10px;
  text-align: center;
  color: white;
  height: 30%;
}
</style>
