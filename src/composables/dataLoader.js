import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { showToast } from "@/utils/showToast.js";
import { getDailyNumber } from "@/utils/dailyNumber";
import { addAttempt } from "@/components/anime/CharacterAttempt.js";

export async function useDataLoader() {
  checkDeviceDate()
    .then((esCorrecta) => {
      if (esCorrecta) {
        loadData();
        return true;
      } else {
        return false;
      }
    })
    .catch(function () {
      showDeviceDateError();
    });

  const showDeviceDateError = () => {
    showToast("Error al comprobar la fecha del dispositivo.", "error");
  };
}

function loadData() {
  const guessCharacterStore = useGuessCharacterStore();
  fetch("/data/captain-tsubasa-characters.json")
    .then(function (res) {
      return res.json();
    })
    .then(async function (data) {
      //Save characters in store
      guessCharacterStore.characters = data;
      //Get random character
      getRandomCharacter();
      //Create local storage
      crateLocalStorage();
      getDataForChart();

      return data;
    })
    .catch(function () {
      showError();
    });
  const showError = () => {
    showToast("Error al cargar los personajes.", "error");
  };
}

function getRandomCharacter() {
  const guessCharacterStore = useGuessCharacterStore();
  guessCharacterStore.dailyCharacter =
    guessCharacterStore.characters[
      getDailyNumber().toFixed(0) % guessCharacterStore.characters.length
    ];
  console.log(guessCharacterStore.dailyCharacter);
}

function crateLocalStorage() {
  if (!localStorage.historyGuessCharacterStorage) {
    localStorage.historyGuessCharacterStorage = JSON.stringify([]);
  }
  if (!localStorage.todayGuessCharacterStorage) {
    localStorage.todayGuessCharacterStorage = JSON.stringify({});
  }
  if (!localStorage.todayAttempts) {
    localStorage.todayAttempts = JSON.stringify([]);
  }

  const guessCharacterStore = useGuessCharacterStore();
  const todayStats = {
    character_of_the_day: guessCharacterStore.dailyCharacter,
    character_attempts: [],
    character_attempts_count: 0,
    guessed_character: false,
    date: new Date(),
  };
  if (newDay()) {
    const lastDay = JSON.parse(localStorage.todayGuessCharacterStorage);
    const history = JSON.parse(localStorage.historyGuessCharacterStorage);
    history.push(lastDay);
    localStorage.removeItem("todayGuessCharacterStorage");
    localStorage.todayGuessCharacterStorage = JSON.stringify(todayStats);
  } else {
    loadLocalStorage();
  }
}

function loadLocalStorage() {
  const guessCharacterStore = useGuessCharacterStore();
  guessCharacterStore.attempts = getLocalStorageTodayAttempts();
  guessCharacterStore.attempts.forEach((attempt) => {
    const char = guessCharacterStore.characters.find(
      (character) => character.name === attempt.name
    );
    const index = guessCharacterStore.characters.indexOf(char);
    guessCharacterStore.characters.splice(index, 1);
    addAttempt(attempt);
    if (attempt.name === guessCharacterStore.dailyCharacter.name) {
      guessCharacterStore.dailyCharacterGuessed = true;
    }
  });
}

function getLocalStorageTodayAttempts() {
  if (localStorage.todayAttempts) {
    return JSON.parse(localStorage.todayAttempts);
  } else {
    return [];
  }
}

function newDay() {
  const today = new Date();
  const todayString = today.toDateString();
  if (!localStorage.todayGuessCharacterStorage) {
    return true;
  }
  const lastDay = new Date(
    JSON.parse(localStorage.todayGuessCharacterStorage).date
  );
  const lastDayString = lastDay.toDateString();
  return todayString !== lastDayString;
}

async function checkDeviceDate() {
  try {
    // Obtener la fecha y hora actual del dispositivo
    const fechaDispositivo = new Date();

    // Obtener la fecha y hora actual de un servidor de tiempo confiable
    const respuesta = await fetch("https://worldtimeapi.org/api/ip");
    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la fecha y hora del servidor");
    }
    const datos = await respuesta.json();
    const fechaServidor = new Date(datos.datetime);

    // Calcular la diferencia en milisegundos
    const diferencia = Math.abs(fechaServidor - fechaDispositivo);

    // Definir un umbral aceptable (por ejemplo, 5 minutos = 300,000 milisegundos)
    const umbralAceptable = 300000; // 5 minutos en milisegundos

    // Comprobar si la diferencia está dentro del umbral aceptable
    if (diferencia > umbralAceptable) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    showToast("Error al comprobar la fecha del dispositivo.", "error");
    console.error("Error al comprobar la fecha del dispositivo:", error);
    return false;
  }
}

function getDataForChart() {
  const guessCharacterStore = useGuessCharacterStore();
  const series = [];
  const unifyData = unifyValues();
  series.push({
    values: unifyData.values,
    "data-success": unifyData.successValues,
    text: "Personajes",
    "line-color": "black",
    "legend-item": {
      "background-color": "#black",
      borderRadius: 5,
      "font-color": "white",
    },
    "legend-marker": {
      visible: false,
    },
  });
  guessCharacterStore.chartDataValues = series;
  guessCharacterStore.chartDataDates = unifyData.dates;
}
function unifyValues() {
  if (!localStorage.historyGuessCharacterStorage) {
    return { values: [], dates: [] };
  } else {
    const historyStats = JSON.parse(localStorage.historyGuessCharacterStorage);
    const attempts = [];
    const dates = [];
    const successValues = [];
    historyStats.forEach((day) => {
      attempts.push(day.character_attempts_count);
      dates.push(new Date(day.date).toLocaleDateString());
      successValues.push(day.guessed_character ? 1 : 0);
    });
    return { values: attempts, dates: dates, successValues: successValues };
  }
}
