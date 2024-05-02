import { defineStore } from "pinia";

export const useGuestAnimeStore = defineStore("guestAnimeStore", {
  state: () => {
    return {
      animes: [],
      attempts: 0,
    };
  },
  getters: {},
  actions: {},
});
