<script setup>
import GuestAnime from "./components/GuestAnime.vue";
import { onMounted } from "vue";
import { useDataLoader } from "@/composables/dataLoader.js";
import TheToast from "./components/layout/TheToast.vue";
import { getDailyNumber } from "@/utils/dailyNumber.js";
onMounted(async () => {
  await useDataLoader();
  getDailyNumber();
});
</script>

<template>
  <div class="grid">
    <GuestAnime />
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
  background-image: url("@/assets/app-bg.jpg");
  background-size: cover;
}
</style>
