import { defineStore } from "pinia";

export const useGuessCharacterStore = defineStore("guessCharacterStore", {
  state: () => {
    return {
      characters: [],
      dailyCharacter: null,
      dailyCharacterGuessed: false,
      characterNameInput: "",
      attempts: [],
      chartDataValues: [],
      chartDataDates: [],
    };
  },
  getters: {},
  actions: {},
});
