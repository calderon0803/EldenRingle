import { useGuestCharacterStore } from "@/store/guestCharacterStore.js";
import { showToast } from "@/utils/showToast.js";
import { getDailyNumber } from "@/utils/dailyNumber";
import axios from "axios";

export async function useDataLoader() {
  const guestCharacterStore = useGuestCharacterStore();
  fetch("/data/captain-tsubasa-characters.json")
    .then(function (res) {
      return res.json();
    })
    .then(async function (data) {
      guestCharacterStore.characters = data;
      showToast("Personajes cargados correctamente", "success");
      getRandomCharacter();

      return data;
    })
    .catch(function () {
      showError();
    });

  const showError = () => {
    showToast("Error al cargar los animes.", "error");
  };
}

export function getRandomCharacter() {
  const guestCharacterStore = useGuestCharacterStore();
  guestCharacterStore.dailyCharacter =
    guestCharacterStore.characters[
      getDailyNumber().toFixed(0) % guestCharacterStore.characters.length
    ];
  console.log(guestCharacterStore.dailyCharacter);
}

export async function getAnimes() {
  const url =
    "https://api.gigasheet.com/file/1527fb6e_f9e1_4c64_ab10_e92ebd804b08/filter";
  const _basicHeaders = {
    "Content-Type": "application/json",
  };
  const payload = {
    startRow: 0,
    endRow: 500,
    rowGroupCols: [],
    valueCols: [],
    pivotCols: [],
    pivotMode: false,
    groupKeys: [],
    filterModel: {
      _cnf_: [
        [
          {
            colId: "O",
            isChecked: false,
            isCaseSensitive: false,
            filterType: "number",
            filter: "1",
            type: "inRange",
            filterTo: "500",
          },
        ],
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
    sortModel: [
      {
        colId: "O",
        sort: "asc",
      },
    ],
    columnHighlights: {},
  };
  const res = await axios.post(url, payload, { headers: _basicHeaders });
  return res;
}
// const lista = [];
// const animes = await getAnimes();
// animes.data.rows.forEach((anime) => {
//   lista.push({
//     title: anime.C,
//     title_jap: anime.AE,
//     type: anime.D,
//     state: anime.G,
//     episodes: anime.H,
//     init_date: anime.I,
//     end_date: anime.J,
//     source: anime.K,
//     year: anime.R,
//     season: anime.S,
//     main_pic: anime.AB,
//     genres: anime.V,
//     studios: anime.W,
//     synopsis: anime.X,
//   });
// });
// console.log(lista);
