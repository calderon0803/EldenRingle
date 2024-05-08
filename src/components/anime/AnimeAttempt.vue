<script setup>
import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";

const guestAnimeStore = useGuestAnimeStore();

const props = defineProps({
  attempt: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});
</script>

<template>
  <fieldset class="input-flex-group attempt">
    <div class="attempt-info-pic">
      <img class="pic" :src="props.attempt.main_pic" />
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.type == props.attempt.type
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>{{ props.attempt.type }}</p>
      </span>
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.genres[0] == props.attempt.genres[0]
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>
          {{ props.attempt.genres[0] }}
        </p>
      </span>
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.state == props.attempt.state
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>{{ props.attempt.state }}</p>
      </span>
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.source == props.attempt.source
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>{{ props.attempt.source }}</p>
      </span>
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.season == props.attempt.season
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>{{ props.attempt.season }}</p>
      </span>
    </div>
    <div
      class="attempt-info"
      :class="
        guestAnimeStore.dailyAnime.year == props.attempt.year
          ? 'correct'
          : 'incorrect'
      "
    >
      <span>
        <p>{{ props.attempt.year }}</p>
      </span>
    </div>
  </fieldset>
</template>
<style lang="scss" scoped>
p {
  font-size: 12px;
  color: white;
  text-transform: uppercase;
}

span {
  min-height: 60px;
  display: inline-flex;
  align-items: center;
}

.pic {
  width: 100%;
  height: 100%;
}

.correct {
  background-color: app-variables.$success;
}

.incorrect {
  background-color: app-variables.$error;
}

.attempt-info-pic {
  height: 60px;
  width: 40px;
  padding: 0;
  margin: 3px;
  border: 2px solid black;
  border-radius: 5%;
  color: white;
  text-align: center;
  animation-delay: 3s;
}

.attempt-info {
  height: 60px;
  width: 60px;
  padding: 0;
  margin: 3px;
  border: 2px solid black;
  border-radius: 5%;
  color: white;
  text-align: center;
}

.input-flex-group {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;

  &--general-data {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.attempt {
  width: 100%;
  justify-content: center;
}
</style>
