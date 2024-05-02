import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";
import { showToast } from "@/utils/showToast.js";

export function useDataLoader() {
  const guestAnimeStore = useGuestAnimeStore();
  fetch("/data/animes.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      guestAnimeStore.animes = data;
      showToast("Animes cargados correctamente", "success");
      return data;
    })
    .catch(function () {
      showError();
    });

  const showError = () => {
    showToast("Error al cargar los animes.", "error");
  };
}
