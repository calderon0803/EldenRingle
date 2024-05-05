import { defineStore } from "pinia";

export const useGuestAnimeStore = defineStore("guestAnimeStore", {
  state: () => {
    return {
      animes: [],
      dailyAnime: null,
      animeNameInput: "",
      selectedAttempt: null,
      attempts: [],
    };
  },
  getters: {},
  actions: {},
});
