<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
    validate: (value) => {
      return ["text", "number"].includes(value);
    },
  },
  modelValue: {
    type: [String, Number],
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: false,
    default: "",
  },
  helper: {
    type: String,
    required: false,
    default: "",
  },
  helperType: {
    type: String,
    required: false,
    default: "warning",
    validate: (value) => {
      return ["info", "warning", "error"].includes(value);
    },
  },
  placeholder: {
    type: String,
    required: false,
    default: "Write something...",
  },
  isValid: {
    type: Boolean,
    required: false,
    default: true,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const iconPath = ref(
  new URL(`/src/assets/icons/${props.helperType}.svg`, import.meta.url).href
);
</script>
<template>
  <div class="input-item">
    <label class="input-item__label" :for="name">{{ name }}</label>
    <input
      :id="name"
      v-model="value"
      class="input-item__input"
      :type="type"
      :name="name"
      :placeholder="props.placeholder"
      :class="isValid ? '' : `input-item__input--${props.helperType}`"
      :disabled="isDisabled"
      :step="props.type === 'number' ? '0.0001' : ''"
    />
    <span
      class="input-item__helper"
      :for="helper"
      :class="isValid ? '' : `input-item__helper--${props.helperType}`"
    >
      <img
        v-show="helper != ''"
        class="input-icon"
        alt="info icon"
        :src="iconPath"
      />

      {{ helper }}
    </span>
  </div>
</template>
<style lang="scss" scoped>
@use "sass:color";

.input-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
  width: 100%;

  &__input {
    box-shadow: 0 1px 2px rgb(31 41 55 / 8%);
    border-radius: 4px;
    font-weight: 400;
    font-size: 0.85rem;
    line-height: 20px;
    outline: none;
    color: app-variables.$color-text-solid;
    background-color: app-variables.$color-light;

    // height: 100%;
    width: 100%;
    padding: 8px;
    border: 1px solid #e1e3e6;
    transition: 0.16s ease-in;
    height: 40px;

    &::placeholder {
      color: app-variables.$app-body-text;
    }

    &:focus {
      box-shadow: 0 0 0 3px #e0e8ff;
      z-index: 9;
      border-color: app-variables.$info;
    }

    &--error {
      border: 1px solid app-variables.$error;
      box-shadow: 0 0 2px 2px #db443730;
    }

    &--success {
      border: 1px solid app-variables.$success;
      box-shadow: 0 0 2px 2px #0f9d5830;
    }

    &--warning {
      border: 1px solid app-variables.$warning;
      box-shadow: 0 0 2px 2px #f4b40030;
    }

    &--info {
      border: 1px solid app-variables.$info;
      box-shadow: 0 0 2px 2px #4285f430;
    }
  }

  &__label {
    color: app-variables.$app-body-text;
    display: block;
    margin-bottom: 0;
    font-weight: 500;
    line-height: 1.5rem;
    font-size: 0.9rem;
  }

  &__helper {
    color: #6b7280;
    margin-top: 2px;
    margin-bottom: 4px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 4px;

    &--error {
      color: app-variables.$error;
    }

    &--success {
      color: app-variables.$success;
    }

    &--warning {
      color: app-variables.$warning;
    }

    &--info {
      color: app-variables.$info;
    }

    img {
      width: 1.12rem;
      height: 1.12rem;
    }
  }
}

@media (max-width: app-variables.$breakpoint-desktop-to-medium-resolution) {
  .input-item {
    &__label {
      font-size: 0.85rem;
    }

    &__input {
      height: 32px;
    }
  }
}
</style>
