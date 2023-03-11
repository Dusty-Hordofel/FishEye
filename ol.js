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

  console.log("🚀 ~ file: fullScreen.js:4 ~ fullScreenMedia ~ olivier:", media);
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
  //   //add image element for the selected media
  //   let imgElement = document.createElement("img");
  //   imgElement.src = `assets/images/${name}/${image}`;
  //   imgElement.classList =
  //     "photograph-work-content-img-modal photograph-work-img hide";
  //   imgElement.alt = "photograph work presentation";

  //create video element for the selected media
  //   let videoElement = document.createElement("video");
  //   videoElement.src = `assets/images/${name}/${video}`;

  //   console.log(imgElement, videoElement);

  //add html script in fullScreenMedia div element

  // add event listener to the close button to remove the full screen element
  fullScreenMedia
    .querySelector(".close-button")
    .addEventListener("click", function () {
      fullScreenMedia.remove();
    });

  // add the full screen element to the document
  document.body.appendChild(fullScreenMedia);
  console.log(fullScreenMedia);
  // left arrow
  leftArrow(allPhotographerMedias, media, mediaIndex, fullScreenMedia, name);
};
