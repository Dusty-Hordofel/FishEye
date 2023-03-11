import {
  photographersInfoStore,
  photographersStore,
  photographerFactories,
  getphotographerMediasDetails,
  photographerMediasStore,
  getphotographerInformations,
  photographerInformations,
  mediasStore,
  photographersMediasStore,
  photographerCard,
} from "../factories/photographer.js";
// import { displayPhotographerMedia } from "../factories../displayMedias.js";
import { getElement, getAllElement } from "../utils/utils.js";
import { displayPhotographerMedia } from "../factories/displayMedias.js";
import {
  sortMediaByPopularity,
  sortMediaByDates,
  sortMediaByTitles,
} from "../filters/filter.js";

import { fullScreenMedia } from "../factories/fullScreen.js";
// import { see } from "../factories/displayMedias.js";

//Function to get the photographer's medias
async function getPhotographersMedias() {
  try {
    // fetch all photographers information
    const response = await fetch("http://localhost:3000/media");
    //transform response to a JSON object
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: photographer.js:11 ~ getPhotographersDetails ~ error:",
      error
    );
  }
}

getPhotographersMedias();

// retrieve id from url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log("🚀 ~ file: photographer.js:28 ~ id:", id);

//get photographer information
const photographerInformation = () => {
  getphotographerInformations(photographersInfoStore, id);
};
photographerInformation();

//add medias to the localstorage
const localstorageMedias = async () => {
  const medias = await getPhotographersMedias();
  mediasStore(medias);
  console.log(photographersMediasStore);
};

localstorageMedias();
console.log(photographersMediasStore);

console.log(photographerInformations);

//get individual photographer information
getphotographerMediasDetails(photographersMediasStore, id);

console.log(photographerMediasStore);

//Photographer profile Card
photographerCard(photographerInformations, getElement(".photograph-header"));

//photographer medias

// .photograph-work

displayPhotographerMedia(
  photographerMediasStore,
  getElement(".photograph-work"),
  photographerInformations
);

//Filter Photographer Medias By Popularity
getElement("#popularite").addEventListener("click", () => {
  sortMediaByPopularity(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});

//Filter Photographer Medias By Titles
getElement("#titre").addEventListener("click", () => {
  sortMediaByTitles(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});

//Filter Photographer Medias By Date
getElement("#date").addEventListener("click", () => {
  sortMediaByDates(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});

export const individualMedia = photographerMediasStore;
console.log(
  "🚀 ~ file: photographer.js:114 ~ individualMedia:",
  individualMedia
);
