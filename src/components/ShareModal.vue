<script setup>
import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import StatsChart from "@/components/StatsChart.vue";
import { ref, watch } from "vue";

const guessCharacterStore = useGuessCharacterStore();

const emit = defineEmits(["close"]);

const shareText = ref("¡Mira mis estadísticas de juego en Captain Tsubasadle!");
const shareUrl = "www.captaintsubasadle.es";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => guessCharacterStore.chartDataValues,
  (newValue) => {
    shareText.value = `¡Mira mis estadísticas de juego en Captain Tsubasadle! He acertado: ${newValue[0].values.length} personajes.`;
  }
);
</script>
<template>
  <div class="modal" :class="props.show ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-content">
      <StatsChart
        :data-series="guessCharacterStore.chartDataValues"
        :scale-x-values="guessCharacterStore.chartDataDates"
      />
      <fieldset class="input-flex-group">
        <button class="button is-dark">
          <span class="mdi mdi-content-copy mr-3"></span>Copiar
        </button>
      </fieldset>
      <fieldset class="input-flex-group mt-3">
        <button class="button is-black">
          <a
            class="sharelink"
            :href="
              'https://x.com/intent/post?text=' +
              shareText +
              '&url=' +
              shareUrl +
              '&hashtags=captaintsubasadle'
            "
          >
            <img class="svglogo" src="/src/assets/social/X.svg"
          /></a>
        </button>
        <button class="button" style="background-color: #00e676">
          <a
            class="sharelink"
            :href="'https://api.whatsapp.com/send?text=' + shareText"
          >
            <img class="svglogo" src="/src/assets/social/WHATSAPP.svg"
          /></a>
        </button>
        <button class="button is-black">
          <a
            class="sharelink"
            :href="'https://threads.net/intent/post?text=' + shareText"
          >
            <img class="svglogo" src="/src/assets/social/THREADS.svg"
          /></a>
        </button>
      </fieldset>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="emit('close')"
    ></button>
  </div>
</template>
<style>
.modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  margin: 0 auto;
}

.button {
  margin: 0 10px;
  width: 100%;
}

.sharelink {
  height: 100%;
}

.svglogo {
  height: 75%;
}

.instagram {
  background: rgb(131 58 180);
  background: linear-gradient(
    -135deg,
    rgb(131 58 180 / 100%) 0%,
    rgb(253 29 29 / 100%) 50%,
    rgb(252 176 69 / 100%) 100%
  );
}
</style>
