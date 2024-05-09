import { defineStore } from "pinia";

export const useGuestCharacterStore = defineStore("guestCharacterStore", {
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
