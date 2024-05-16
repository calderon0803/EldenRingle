import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { attemptFields, arcsOrder } from "../config/attempt-info-config.js";

export const addAttempt = (attempt) => {
  const guessCharacterStore = useGuessCharacterStore();
  const attemptFieldset = document.createElement("fieldset");
  document
    .getElementById("attempt-list")
    .insertBefore(
      attemptFieldset,
      document.getElementById("attempt-list").firstChild
    );
  attemptFieldset.id = "attempt";
  attemptFieldset.classList.add("input-flex-group", "attempt");
  //Image
  const attemptPicImg = document.createElement("img");
  attemptPicImg.classList.add("full-pic");
  const characterImage = new URL(attempt.image, import.meta.url).href;

  attemptPicImg.src = characterImage;

  const attemptPicDiv = document.createElement("div");
  attemptPicDiv.classList.add("attempt-info-pic");
  attemptPicDiv.appendChild(attemptPicImg);
  attemptFieldset.appendChild(attemptPicDiv);
  //Info
  attemptFields.forEach((field, index) => {
    setTimeout(() => {
      const attemptFieldDiv = document.createElement("div");
      attemptFieldDiv.classList.add("attempt-info");
      if (guessCharacterStore.dailyCharacter[field] == attempt[field]) {
        attemptFieldDiv.classList.add("correct");
      } else {
        attemptFieldDiv.classList.add("incorrect");
      }
      const attemptFieldSpan = document.createElement("span");
      const attemptFieldP = document.createElement("p");
      const attemptRoleSpan = document.createElement("span");
      if (field === "role") {
        if (attempt[field] === "Delantero") {
          attemptRoleSpan.classList.add(
            "mdi",
            "mdi-page-layout-header",
            "mdi-24px"
          );
          attemptFieldP.appendChild(attemptRoleSpan);
        } else if (attempt[field] === "Centrocampista") {
          attemptRoleSpan.classList.add(
            "mdi",
            "mdi-page-layout-body",
            "mdi-24px"
          );
          attemptFieldP.appendChild(attemptRoleSpan);
        } else if (attempt[field] === "Defensa") {
          attemptRoleSpan.classList.add(
            "mdi",
            "mdi-page-layout-footer",
            "mdi-24px"
          );
          attemptFieldP.appendChild(attemptRoleSpan);
        } else if (attempt[field] === "Portero") {
          attemptRoleSpan.classList.add(
            "mdi",
            "mdi-hand-front-left-outline",
            "mdi-24px"
          );
          attemptFieldP.appendChild(attemptRoleSpan);
        } else {
          attemptFieldP.innerHTML = attempt[field];
        }
      } else if (field === "number") {
        if (attempt[field] > guessCharacterStore.dailyCharacter[field]) {
          attemptFieldSpan.classList.add("inferior");
        } else if (attempt[field] < guessCharacterStore.dailyCharacter[field]) {
          attemptFieldSpan.classList.add("superior");
        }
        attemptFieldP.innerHTML = attempt[field];
      } else if (field === "debut") {
        if (
          arcsOrder.indexOf(attempt[field]) >
          arcsOrder.indexOf(guessCharacterStore.dailyCharacter[field])
        ) {
          attemptFieldSpan.classList.add("inferior");
        } else if (
          arcsOrder.indexOf(attempt[field]) <
          arcsOrder.indexOf(guessCharacterStore.dailyCharacter[field])
        ) {
          attemptFieldSpan.classList.add("superior");
        }
        attemptFieldP.innerHTML = attempt[field];
      } else {
        attemptFieldP.innerHTML = attempt[field];
      }
      attemptFieldSpan.appendChild(attemptFieldP);
      attemptFieldDiv.appendChild(attemptFieldSpan);
      attemptFieldset.appendChild(attemptFieldDiv);
    }, 300 * (index + 1));
  });
};
