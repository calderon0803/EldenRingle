import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      toastText: "",
      toastType: null,
      toastIsVisible: false,
      panelVisibility: true,
    };
  },
  getters: {},
  actions: {
    showToast(message, type, time) {
      this.toastText = message;
      this.toastType = type;
      this.toastIsVisible = true;
      setTimeout(() => {
        this.toastIsVisible = false;
      }, time);
    },
    hideToast() {
      this.toastIsVisible = false;
    },
  },
});
