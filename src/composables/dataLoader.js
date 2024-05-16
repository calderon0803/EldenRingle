import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { showToast } from "@/utils/showToast.js";
import { getDailyNumber } from "@/utils/dailyNumber";

export async function useDataLoader() {
  const guessCharacterStore = useGuessCharacterStore();
  fetch("/data/captain-tsubasa-characters.json")
    .then(function (res) {
      return res.json();
    })
    .then(async function (data) {
      guessCharacterStore.characters = data;
      getRandomCharacter();

      return data;
    })
    .catch(function () {
      showError();
    });

  const showError = () => {
    showToast("Error al cargar los personajes.", "error");
  };
}

export function getRandomCharacter() {
  const guessCharacterStore = useGuessCharacterStore();
  guessCharacterStore.dailyCharacter =
    guessCharacterStore.characters[
      getDailyNumber().toFixed(0) % guessCharacterStore.characters.length
    ];
  console.log(guessCharacterStore.dailyCharacter);
}

export function crateLocalStorage() {
  const todayStats = {
    character_attempts: [],
    character_attempts_count: 0,
    guessed_character: false,
    date: new Date().toLocaleDateString(),
  };
  localStorage.todayGuessCharacterStorage = JSON.stringify(todayStats);
}

export function getLocalStorageTodayAttempts() {
  if (localStorage.todayAttempts) {
    return JSON.parse(localStorage.todayAttempts);
  } else {
    return [];
  }
}
