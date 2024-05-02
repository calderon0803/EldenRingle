<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "info",
    validator(value) {
      return ["success", "warning", "error", "info"].includes(value);
    },
  },
});

const imageUrl = ref(
  new URL(`/src/assets/icons/toast-icons/${props.type}.svg`, import.meta.url)
    .href
);

watch(
  () => props.type,
  (newValue) => {
    imageUrl.value = new URL(
      `/src/assets/icons/toast-icons/${newValue}.svg`,
      import.meta.url
    ).href;
  }
);
</script>
<template>
  <div :class="`toast toast--${type}`">
    <img class="toast__icon toast-icon" :src="imageUrl" :alt="`${type} icon`" />
    <span class="toast__msg">{{ text }}</span>
    <img
      class="toast__close"
      src="@/assets/icons/toast-icons/close.svg"
      alt="close icon"
    />
  </div>
</template>
<style lang="scss" scoped>
@use "sass:color";

@each $key, $value in app-variables.$types {
  .toast {
    max-width: 80vw;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgb(0 0 0 / 16%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease;
    margin: 0.5rem 0;

    &__icon {
      width: 40px;
      height: 40px;
      margin-right: 1rem;
      padding: 0.5rem;
    }

    &__msg {
      font-size: 1rem;
      font-weight: 500;
    }

    &__close {
      width: 32px;
      height: 32px;
      padding: 0.5rem;
      margin-left: auto;
      cursor: pointer;
    }
  }

  .toast--#{$key} {
    /* stylelint-disable-next-line function-no-unknown */
    border: 1px solid rgba($value, 0.5);
    background-color: #fff;

    .toast-icon {
      /* stylelint-disable-next-line function-no-unknown */
      background-color: rgba($value, 1);
    }
  }
}
</style>
