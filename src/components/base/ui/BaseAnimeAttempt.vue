<script setup>
const props = defineProps({
  item: {
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
      {{ item.gender }}
    </div>
    <div class="notification is-success">
      {{ item.author }}
    </div>
    <div class="notification is-success">
      {{ item.year }}
    </div>
  </fieldset>
</template>
<style scoped>
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
