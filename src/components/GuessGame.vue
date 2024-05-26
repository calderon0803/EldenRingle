<script setup>
import GuessCharacterPanel from "./character/GuessCharacterPanel.vue";
import GuessCharacterAttempts from "./character/GuessCharacterAttempts.vue";
import { ref } from "vue";

const gameMode = ref("character");
</script>

<template>
  <div class="panel">
    <div class="game-panel">
      <img class="logo" src="@/assets/logo.png" />
      <fieldset class="input-flex-group mt-3">
        <button class="button gamemode" @click="gameMode = 'character'">
          <img class="svglogo" src="/src/assets/guess-player-icon.svg" />
        </button>
        <button class="button gamemode" @click="gameMode = 'tecnique'">
          <img class="svglogo" src="/src/assets/guess-tecnique-icon.svg" />
        </button>
        <button class="button gamemode" @click="gameMode = 'goal'">
          <img class="svglogo" src="/src/assets/guess-goal-icon.svg" />
        </button>
      </fieldset>
      <GuessCharacterPanel v-if="gameMode == 'character'" />
    </div>
    <GuessCharacterAttempts v-if="gameMode == 'character'" />
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

.gamemode {
  width: 60px;
  background-color: #3ab11a;
  border: 3px solid white;
  border-radius: 30px;
  padding: 5px;
}

.gamemode:focus {
  width: 60px;
  background-color: #3ab11a;
  border: 3px solid white;
  border-radius: 30px;
  padding: 5px;
}

.gamemode:hover {
  width: 60px;
  background-color: #297713;
  border: 3px solid #aaa;
}

.svglogo {
  height: 75%;
}
</style>
