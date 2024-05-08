import { useGuestAnimeStore } from "@/store/guestAnimeStore.js";
import { showToast } from "@/utils/showToast.js";
import { getDailyNumber } from "@/utils/dailyNumber";
import axios from "axios";

export async function useDataLoader() {
  const guestAnimeStore = useGuestAnimeStore();
  fetch("/data/animes.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      guestAnimeStore.animes = data;
      showToast("Animes cargados correctamente", "success");
      getRandomAnime();
      return data;
    })
    .catch(function () {
      showError();
    });

  const showError = () => {
    showToast("Error al cargar los animes.", "error");
  };
}

export function getRandomAnime() {
  const guestAnimeStore = useGuestAnimeStore();
  // const randomIndex = Math.floor(Math.random() * guestAnimeStore.animes.length);
  // guestAnimeStore.dailyAnime = guestAnimeStore.animes[randomIndex];
  guestAnimeStore.dailyAnime =
    guestAnimeStore.animes[
      getDailyNumber().toFixed(0) % guestAnimeStore.animes.length
    ];
  console.log(guestAnimeStore.dailyAnime);
}

export async function getAnimes() {
  const url =
    "https://api.gigasheet.com/file/1527fb6e_f9e1_4c64_ab10_e92ebd804b08/filter";
  const _basicHeaders = {
    "Content-Type": "application/json",
  };
  const payload = {
    startRow: 0,
    endRow: 8046,
    rowGroupCols: [],
    valueCols: [],
    pivotCols: [],
    pivotMode: false,
    groupKeys: [],
    filterModel: {
      _cnf_: [
        [
          {
            colId: "D",
            isChecked: false,
            isCaseSensitive: false,
            filterType: "text",
            filter: ["tv"],
            type: "equalsAny",
          },
        ],
      ],
    },
    sortModel: [],
  };
  const res = await axios.post(url, payload, { headers: _basicHeaders });
  return res;
}
