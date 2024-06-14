import { useGuessCharacterStore } from "@/store/guessCharacterStore.js";
import { attemptFields } from "../config/attempt-info-config.js";

export const addAttempt = (attempt) => {
  const guessCharacterStore = useGuessCharacterStore();
  const attemptFieldset = document.createElement("fieldset");
  document
    .getElementById("character-attempt-list")
    .insertBefore(
      attemptFieldset,
      document.getElementById("character-attempt-list").firstChild
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
      const attemptFieldSpan = document.createElement("span");
      const attemptFieldP = document.createElement("p");

      if (field === "runeDrop") {
        //first rune drop
        const runeDrops = [];
        attempt.drops.forEach((drop) => {
          if (drop.includes("Runes")) {
            runeDrops.push(drop);
          }
        });
        const dailyCharacterRuneDrops = [];
        guessCharacterStore.dailyCharacter.drops.forEach((drop) => {
          if (drop.includes("Runes")) {
            dailyCharacterRuneDrops.push(drop);
          }
        });
        if (dailyCharacterRuneDrops[0] == runeDrops[0]) {
          attemptFieldDiv.classList.add("correct");
        } else {
          attemptFieldDiv.classList.add("incorrect");
          if (dailyCharacterRuneDrops[0] > runeDrops[0]) {
            attemptFieldSpan.classList.add("inferior");
          } else if (dailyCharacterRuneDrops[0] < runeDrops[0]) {
            attemptFieldSpan.classList.add("superior");
          }
        }
        attemptFieldP.innerHTML = runeDrops[0];
      } else if (field === "itemDrop") {
        //first item drop
        const itemDrops = [];
        attempt.drops.forEach((drop) => {
          if (!drop.includes("Runes")) {
            itemDrops.push(drop);
          }
        });
        const dailyCharacterItemDrops = [];
        guessCharacterStore.dailyCharacter.drops.forEach((drop) => {
          if (!drop.includes("Runes")) {
            dailyCharacterItemDrops.push(drop);
          }
        });
        if (dailyCharacterItemDrops[0] == itemDrops[0]) {
          attemptFieldDiv.classList.add("correct");
        } else {
          attemptFieldDiv.classList.add("incorrect");
        }
        attemptFieldP.innerHTML = itemDrops[0];
      } else {
        if (guessCharacterStore.dailyCharacter[field] == attempt[field]) {
          attemptFieldDiv.classList.add("correct");
        } else {
          attemptFieldDiv.classList.add("incorrect");
        }
        attemptFieldP.innerHTML = attempt[field];
      }
      if (field === "healthPoints") {
        if (attempt[field] > guessCharacterStore.dailyCharacter[field]) {
          attemptFieldSpan.classList.add("inferior");
        } else if (attempt[field] < guessCharacterStore.dailyCharacter[field]) {
          attemptFieldSpan.classList.add("superior");
        }
      }
      attemptFieldSpan.appendChild(attemptFieldP);
      attemptFieldDiv.appendChild(attemptFieldSpan);
      attemptFieldset.appendChild(attemptFieldDiv);
    }, 300 * (index + 1));
  });
};
