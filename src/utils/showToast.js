import { useAppStore } from "@/store/appStore.js";

export const showToast = (message, type = "success", time = 3000) => {
  const { showToast } = useAppStore();
  showToast(message, type, time);
};

export const hideToast = () => {
  const { hideToast } = useAppStore();
  hideToast();
};
