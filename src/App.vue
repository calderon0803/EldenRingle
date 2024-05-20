<script setup>
import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import GuessCharacter from "./components/GuessCharacter.vue";
import StatsButton from "./components/StatsButton.vue";
import DemoButton from "./components/DemoButton.vue";
import { onMounted, ref } from "vue";
import { useDataLoader } from "@/composables/dataLoader.js";
import TheToast from "./components/layout/TheToast.vue";
import StatsChart from "./components/StatsChart.vue";

const guessCharacterStore = useGuessCharacterStore();

const showModal = ref(false);

onMounted(async () => {
  await useDataLoader();
});
const demoT = {
  character_of_the_day: {
    name: "Hans Dolman",
    gender: "Masculino",
    role: "Portero",
    number: 1,
    country: "Holanda",
    teams: ["Holanda", "AFC Ajax"],
    debut: "Battle of World Youth",
    image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
  },
  character_attempts: [
    {
      name: "Callusias",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "España",
      teams: ["España", "Real Madrid CF"],
      debut: "Road to 2002",
      image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
    },
    {
      name: "Edgar Davids",
      gender: "Masculino",
      role: "Centrocampista",
      number: 26,
      country: "Holanda",
      teams: ["Juventus FC", "Holanda"],
      debut: "Road to 2002",
      image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
    },
    {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
  ],
  character_attempts_count: 7,
  guessed_character: true,
  date: "2024-05-19T08:52:25.246Z",
};

const demoH = [
  {
    character_of_the_day: {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
    character_attempts: [
      {
        name: "Callusias",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "España",
        teams: ["España", "Real Madrid CF"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
      },
      {
        name: "Edgar Davids",
        gender: "Masculino",
        role: "Centrocampista",
        number: 26,
        country: "Holanda",
        teams: ["Juventus FC", "Holanda"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
      },
      {
        name: "Hans Dolman",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "Holanda",
        teams: ["Holanda", "AFC Ajax"],
        debut: "Battle of World Youth",
        image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
      },
    ],
    character_attempts_count: 3,
    guessed_character: true,
    date: "2024-05-15T08:52:25.246Z",
  },
  {
    character_of_the_day: {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
    character_attempts: [
      {
        name: "Callusias",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "España",
        teams: ["España", "Real Madrid CF"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
      },
      {
        name: "Edgar Davids",
        gender: "Masculino",
        role: "Centrocampista",
        number: 26,
        country: "Holanda",
        teams: ["Juventus FC", "Holanda"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
      },
      {
        name: "Hans Dolman",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "Holanda",
        teams: ["Holanda", "AFC Ajax"],
        debut: "Battle of World Youth",
        image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
      },
    ],
    character_attempts_count: 2,
    guessed_character: true,
    date: "2024-05-16T08:52:25.246Z",
  },
  {
    character_of_the_day: {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
    character_attempts: [
      {
        name: "Callusias",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "España",
        teams: ["España", "Real Madrid CF"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
      },
      {
        name: "Edgar Davids",
        gender: "Masculino",
        role: "Centrocampista",
        number: 26,
        country: "Holanda",
        teams: ["Juventus FC", "Holanda"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
      },
      {
        name: "Hans Dolman",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "Holanda",
        teams: ["Holanda", "AFC Ajax"],
        debut: "Battle of World Youth",
        image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
      },
    ],
    character_attempts_count: 10,
    guessed_character: true,
    date: "2024-05-17T08:52:25.246Z",
  },
  {
    character_of_the_day: {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
    character_attempts: [
      {
        name: "Callusias",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "España",
        teams: ["España", "Real Madrid CF"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
      },
      {
        name: "Edgar Davids",
        gender: "Masculino",
        role: "Centrocampista",
        number: 26,
        country: "Holanda",
        teams: ["Juventus FC", "Holanda"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
      },
      {
        name: "Hans Dolman",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "Holanda",
        teams: ["Holanda", "AFC Ajax"],
        debut: "Battle of World Youth",
        image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
      },
    ],
    character_attempts_count: 5,
    guessed_character: true,
    date: "2024-05-18T08:52:25.246Z",
  },
  {
    character_of_the_day: {
      name: "Hans Dolman",
      gender: "Masculino",
      role: "Portero",
      number: 1,
      country: "Holanda",
      teams: ["Holanda", "AFC Ajax"],
      debut: "Battle of World Youth",
      image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
    },
    character_attempts: [
      {
        name: "Callusias",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "España",
        teams: ["España", "Real Madrid CF"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/Jyz5FtT/Callusias.webp",
      },
      {
        name: "Edgar Davids",
        gender: "Masculino",
        role: "Centrocampista",
        number: 26,
        country: "Holanda",
        teams: ["Juventus FC", "Holanda"],
        debut: "Road to 2002",
        image: "https://i.ibb.co/C5JXYMm/Davi-JUV-DT-1.webp",
      },
      {
        name: "Hans Dolman",
        gender: "Masculino",
        role: "Portero",
        number: 1,
        country: "Holanda",
        teams: ["Holanda", "AFC Ajax"],
        debut: "Battle of World Youth",
        image: "https://i.ibb.co/QXBg1dC/imagen-2024-05-14-000441309.png",
      },
    ],
    character_attempts_count: 7,
    guessed_character: true,
    date: "2024-05-19T08:52:25.246Z",
  },
];

const demoLocalStorage = () => {
  localStorage.todayGuessCharacterStorage = JSON.stringify(demoT);
  localStorage.historyGuessCharacterStorage = JSON.stringify(demoH);
};
</script>

<template>
  <div class="grid">
    <GuessCharacter />
    <StatsButton @click="showModal = true" />
    <DemoButton @click="demoLocalStorage()" />
    <div class="modal" :class="showModal ? 'is-active' : ''">
      <div class="modal-background"></div>
      <div class="modal-content">
        <StatsChart
          :data-series="guessCharacterStore.chartDataValues"
          :scale-x-values="guessCharacterStore.chartDataDates"
        />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        @click="showModal = false"
      ></button>
    </div>
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
