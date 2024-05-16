import { defineStore } from "pinia";

export const useGuessCharacterStore = defineStore("guessCharacterStore", {
  state: () => {
    return {
      characters: [],
      dailyCharacter: null,
      characterNameInput: "",
      attempts: [],
    };
  },
  getters: {},
  actions: {},
});
