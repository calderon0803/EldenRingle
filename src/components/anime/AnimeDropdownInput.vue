<script setup>
import BaseDropdownInputOption from "./AnimeDropdownInputOption.vue";
import BaseInput from "@/components/base/ui/BaseInput.vue";
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
  <fieldset class="input-flex-group mx-3">
    <BaseInput
      v-if="!props.finish"
      :model-value="guestAnimeStore.animeNameInput"
      placeholder="Nombre del anime"
      @update:model-value="guestAnimeStore.animeNameInput = $event"
    />
    <div v-else class="notification is-success sucess-msg">
      ¡Felicidades! Has adivinado el anime de hoy! <br /><br />
      <span>Intentos: {{ guestAnimeStore.attempts.length }}</span>
    </div>
  </fieldset>
  <div v-if="guestAnimeStore.animeNameInput" class="options">
    <BaseDropdownInputOption
      v-for="option in props.gameOptions"
      :key="option.id"
      :item="option"
      @click="selectOption(option)"
    />
  </div>
</template>
<style lang="scss" scoped>
.button {
  margin: 0.5rem auto;
}

.input-flex-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  width: auto;
  justify-content: space-between;
  align-items: flex-end;

  &--general-data {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.options {
  width: 25%;
  margin: 0 auto;
  margin-left: 5px;
  position: fixed;
  overflow-y: scroll;
  height: 500px;
}

.sucess-msg {
  width: 100%;
  text-align: center;
}

/* width */
::-webkit-scrollbar {
  width: 9px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
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
