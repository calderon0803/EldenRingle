<script setup>
import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { ref } from "vue";

const guessCharacterStore = useGuessCharacterStore();

const props = defineProps({
  finish: {
    type: Boolean,
    required: true,
  },
  gameOptions: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(["sendAttempt"]);
//const options = ref([]);

const nameInput = ref(null);

const selectOption = (option) => {
  emit("sendAttempt", option);
  nameInput.value = null;
};

// const addImages = () => {
//   props.gameOptions.forEach((option) => {
//     const characterImage = new URL(
//       `/src/assets/characters/${option.name}.jpg`,
//       import.meta.url
//     ).href;
//     if (characterImage.includes("undefined")) {
//       option["imageUrl"] = new URL(
//         "/src/assets/characters/Default.jpg",
//         import.meta.url
//       ).href;
//     } else {
//       option["imageUrl"] = characterImage;
//     }
//   });
// };

const filterFunction = () => {
  if (!nameInput.value) return;
  const filter = nameInput.value.toUpperCase();
  const inputDropdown = document.getElementById("inputDropdown");
  const option = inputDropdown.getElementsByClassName("option");
  for (let i = 0; i < option.length; i++) {
    const txtValue = option[i].textContent || option[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      option[i].style.display = "";
    } else {
      option[i].style.display = "none";
    }
  }
};
</script>

<template>
  <div class="dropdowninput">
    <div v-if="!props.finish" class="dropdown">
      <div id="inputDropdown" class="dropdown-content show">
        <input
          v-model="nameInput"
          class="input name-input"
          type="text"
          placeholder="Buscar..."
          @keyup="filterFunction()"
        />
        <div v-if="nameInput" class="options">
          <a
            v-for="(option, index) in props.gameOptions"
            :key="index"
            class="option"
            @click="selectOption(option)"
            ><div class="media">
              <div class="media-left">
                <figure class="image my-1 ml-1">
                  <img class="option-pic" :src="option.image" />
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-6 my-2 mr-1">{{ option.name }}</p>
              </div>
            </div></a
          >
        </div>
      </div>
    </div>
    <div v-else class="sucess-msg my-3">
      <div class="mb-3">
        <span>¡Felicidades!<br />Has adivinado el personaje de hoy</span>
      </div>
      <div class="mt-3">
        <span>Intentos: {{ guessCharacterStore.attempts.length }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.name-input {
  background-color: #fff;
  border: 3px solid #000;
  box-sizing: border-box;
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
}

.name-input:hover {
  background-color: #fff;
  border: 3px solid #000;
}

.name-input:focus {
  background-color: #fff;
  border: 3px solid #000;
}

.options {
  max-height: 400px;
  overflow-y: auto;
}

.option-card {
  cursor: pointer;
  border-radius: 0%;
  background-color: white;
  border: 1px solid black;
  width: auto;
}

.option {
  background-color: #f5f5f5;
}

.option:hover {
  background-color: #959595;
}

.option-pic {
  width: 60px;
  height: 60px;
}

.win-pic {
  background-image: url("/src/assets/win.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 50%;
  margin: auto;
}

.sucess-msg {
  max-width: 500px;
  height: 200px;
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: block;
  border-radius: 5px;
  padding: 1rem;
  background-image: url("/src/assets/win.jpg");
  background-size: cover;
}

.dropdowninput {
  position: static !important;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}

.dropdown-content {
  background-color: transparent;
  position: absolute;
  min-width: 230px;
  overflow: auto;
  border: none;
  z-index: 1;
  width: 100%;
}
</style>
