<script setup>
import BaseDropdownInputOption from "./BaseDropdownInputOption.vue";
import BaseInput from "@/components/base/ui/BaseInput.vue";
import { watch, ref } from "vue";

const props = defineProps({
  gameOptions: {
    type: Array,
    required: true,
  },
});

const textInput = ref(null);
const emit = defineEmits(["update:modelValue"]);

watch(
  () => textInput.value,
  () => {
    emit("update:modelValue", textInput.value);
    console.log(props.gameOptions);
  }
);
</script>

<template>
  <fieldset class="input-flex-group mx-3">
    <BaseInput
      placeholder="Nombre del anime"
      @update:model-value="textInput = $event"
    />
  </fieldset>
  <div v-if="textInput">
    <BaseDropdownInputOption
      v-for="option in props.gameOptions"
      :key="option.id"
      :item="option"
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
