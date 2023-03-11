import { leftArrow, rightArrow } from "./slide.js";
import { individualMedia } from "../pages/photographer.js";
import { getElement, getAllElement } from "../utils/utils.js";

export const fullScreenMedia = (
  media,
  name,
  mediaIndex,
  allPhotographerMedias
) => {
  //retrieve individual photographer media information
  const { date, id, likes, photographerId, title, video, image } = media;

  //get elements
  const imageElement = getElement(".photograph-work-img");
  const videoElement = getElement(".photograph-work-video");
  const fullScreenMedia = getElement(".full-screen-media");
  const titleImg = getElement(".title");
  console.log("🚀 ~ file: fullScreen.js:19 ~ tile:", titleImg);

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

  titleImg.textContent = title;

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
    videoElement,
    titleImg
  );
  //right arrow
  rightArrow(
    allPhotographerMedias,
    media,
    mediaIndex,
    name,
    fullScreenMedia,
    imageElement,
    videoElement,
    titleImg
  );
};
