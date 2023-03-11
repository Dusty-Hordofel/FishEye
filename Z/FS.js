import { leftArrow } from "./slide.js";
import { individualMedia } from "../pages/photographer.js";
import { getElement, getAllElement } from "../utils/utils.js";

export const momo = (medias) => {
  console.log("🚀 ~ file: fullScreen.js:6 ~ momo ~ medias:", medias);
};
// momo();

export const fullScreenMedia = (
  media,
  name,
  mediaIndex,
  allPhotographerMedias
) => {
  console.log("🚀 ~ file: fullScreen.js:15 ~ media:", media);
  console.log(
    "🚀 ~ file: fullScreen.js:16 ~ fullScreenMedia ~ allPhotographerMedias:",
    allPhotographerMedias
  );
  console.log(
    "🚀 ~ file: fullScreen.js:20 ~ fullScreenMedia ~ index:",
    mediaIndex
  );
  //retrieve individual photographer media information
  const { date, id, likes, photographerId, title, video, image } = media;
  console.log("🚀 ~ file: fullScreen.js:26 ~ id:", id);

  console.log("🚀 ~ file: fullScreen.js:4 ~ fullScreenMedia ~ olivier:", media);
  console.log("YOYOYOYOYOYOYOYOYOYOYOYOYOYOYOYOY");

  //get elements
  const imageElement = getElement(".photograph-work-img");
  const videoElement = getElement(".photograph-work-video");
  const fullScreenMedia = getElement(".full-screen-media");

  if (image) {
    //Element to be hidden
    videoElement.classList.add("hide");
    //Element to be added
    imageElement.classList.remove("hide");
    imageElement.src = `assets/images/${name}/${image}`;
  } else {
    //Element to be hidden
    imageElement.classList.add("hide");
    //Element to be added
    videoElement.classList.remove("hide");
    videoElement.src = `assets/images/${name}/${video}`;
  }

  //   display full screen Media
  fullScreenMedia.classList.remove("hide");

  // add event listener to the close button to remove the full screen element
  fullScreenMedia
    .querySelector(".close-button")
    .addEventListener("click", function () {
      //  hide full screen Media
      fullScreenMedia.classList.add("hide");
    });

  console.log(fullScreenMedia);
  // left arrow
  leftArrow(
    allPhotographerMedias,
    media,
    mediaIndex,
    name,
    fullScreenMedia,
    imageElement,
    videoElement
  );
};
