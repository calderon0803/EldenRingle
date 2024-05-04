<script setup>
const props = defineProps({
  attempt: {
    type: Object,
    required: false,
    default: () => ({
      id: 6,
      name: "My Hero Academia",
      gender: "Shonen",
      author: "Kohei Horikoshi",
      image: "myheroacademia.jpg",
      year: "2014",
    }),
  },
});
</script>

<template>
  <fieldset class="input-flex-group mx-3">
    <div class="notification is-success">
      <p
        v-for="(genre, index) in props.attempt.genres"
        :key="index"
        class="genre"
      >
        {{ props.attempt.genre }}
      </p>
    </div>
    <div class="notification is-success">
      {{ props.attempt.author }}
    </div>
    <div class="notification is-success">
      {{ props.attempt.init_date.substr(0, 4) }}
    </div>
  </fieldset>
</template>
<style lang="scss" scoped>
.notification {
  height: auto;
  width: auto;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  text-align: center;
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
