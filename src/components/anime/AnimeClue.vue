<script setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: () => "",
  },
  value: {
    type: [String, Number],
    required: false,
    default: () => "",
  },
});

const showClue = () => {
  const clue = document.querySelector(".clue");
  clue.addEventListener("click", function () {
    clue.classList.toggle("is-flipped");
  });
};
</script>

<template>
  <div class="scene">
    <div class="clue" @click="showClue()">
      <div class="clue-face clue-face-front">
        <span>
          <p>{{ props.type }}</p></span
        >
      </div>
      <div class="clue-face clue-face-back">
        <span>
          <p>{{ props.value }}</p>
        </span>
      </div>
    </div>
  </div>
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

.scene {
  width: 60px;
  height: 60px;
  perspective: 600px;
  cursor: pointer;
}

.clue {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  padding: 0;
  border: 2px solid black;
  border-radius: 5%;
  color: white;
  text-align: center;
}

.clue-face {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
}

.clue-face-front {
  background: blue;
}

.clue-face-back {
  background: orange;
  transform: rotateY(180deg);
}

.clue.is-flipped {
  transform: rotateY(180deg);
}
</style>
