import { displayPhotographerMedia } from "../factories/displayMedias.js";
import { getElement } from "../utils/utils.js";
import { photographerInformations } from "../factories/photographer.js";

//FILTER MENU ALGORITHM

const sortMediaByPopularity = (medias, element, photographer) => {
  //sort photographerMedias By Likes
  const sortByLikes = medias.sort((a, b) => b.likes - a.likes);
  displayPhotographerMedia(sortByLikes, element, photographer);
};

const sortMediaByTitles = (photographerMedias) => {
  //sort photographerMedias By Likes
  const sortTitles = photographerMedias.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  displayPhotographerMedia(
    sortTitles,
    getElement(".photograph-work"),
    photographerInformations
  );
};

const sortMediaByDates = (photographerMedias) => {
  //sort photographerMedias By Likes
  const sortTitles = photographerMedias.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  displayPhotographerMedia(
    sortTitles,
    getElement(".photograph-work"),
    photographerInformations
  );
};

export { sortMediaByPopularity, sortMediaByDates, sortMediaByTitles };