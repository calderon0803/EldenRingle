<script setup>
import BaseDropdownInputOption from "./AnimeDropdownInputOption.vue";
import BaseInput from "@/components/base/ui/BaseInput.vue";
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";

const guestAnimeStore = useGuestAnimeStore();

const props = defineProps({
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
      :model-value="guestAnimeStore.animeNameInput"
      placeholder="Nombre del anime"
      @update:model-value="guestAnimeStore.animeNameInput = $event"
    />
  </fieldset>
  <div v-if="guestAnimeStore.animeNameInput">
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
</style>
