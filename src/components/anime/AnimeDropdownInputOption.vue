<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="media">
      <div class="media-left">
        <figure class="image">
          <img class="pic" :src="props.item.main_pic" />
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ props.item.title }}</p>
        <p class="subtitle is-6">{{ props.item.year }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card {
  margin: 0.5rem;
  cursor: pointer;
}

.pic {
  max-width: 30px;
  max-height: 60px;
}
</style>
