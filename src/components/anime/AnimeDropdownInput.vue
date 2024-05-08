<script setup>
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";

const guestAnimeStore = useGuestAnimeStore();

const props = defineProps({
  finish: {
    type: Boolean,
    required: true,
  },
  gameOptions: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "sendAttempt"]);

const selectOption = (option) => {
  emit("sendAttempt", option);
  guestAnimeStore.animeNameInput = null;
};
</script>

<template>
  <input
    v-if="!props.finish"
    v-model="guestAnimeStore.animeNameInput"
    class="input name-input"
    type="text"
    placeholder="Nombre del anime"
  />
  <div v-else class="notification is-success sucess-msg mt-3">
    ¡Felicidades! Has adivinado el anime de hoy! <br /><br />
    <span>Intentos: {{ guestAnimeStore.attempts.length }}</span>
  </div>
  <div v-if="guestAnimeStore.animeNameInput" class="options">
    <div
      v-for="option in props.gameOptions"
      :key="option.id"
      class="option-card"
      :item="option"
      @click="selectOption(option)"
    >
      <div class="media">
        <div class="media-left">
          <figure class="image my-1 ml-1">
            <img class="option-pic" :src="option.main_pic" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6 my-2 mr-1">{{ option.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.name-input {
  margin: 0.5rem auto;
  width: 100%;
}

.options {
  overflow-y: scroll;
  height: 500px;
  width: 30%;
  position: absolute;
}

.option-card {
  cursor: pointer;
  border-radius: 0%;
  background-color: white;
  width: auto;
  border: 1px solid black;
}

.option-pic {
  max-width: 30px;
  max-height: 60px;
}

.sucess-msg {
  width: 100%;
  text-align: center;
}

/* width */
::-webkit-scrollbar {
  width: 0.5rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 5%;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
