import { leftArrow } from "./slide.js";
import { individualMedia } from "../pages/photographer.js";

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
  //create a div element for the selected media
  let fullScreenMedia = document.createElement("div");
  //add "full-screen-media" for selected media
  fullScreenMedia.classList.add("full-screen-media");

  //add html script in fullScreenMedia div element
  fullScreenMedia.innerHTML = `
<div class="full-screen-modal">
<i class="fa-solid fa-chevron-left slider-icon"></i>
${
  image
    ? `
    <img
      src="assets/images/${name}/${image}"
      class="photograph-work-content-img-modal photograph-work-img hide"
      alt="photograph work presentation"
      id=""
    />`
    : `<video
    src="assets/images/${name}/${video}"
    class="photograph-work-content-img-modal photograph-work-video hide"
    autoplay muted controls
  /></video>`
}
<i class="fa-solid fa-chevron-right slider-icon"></i>
<button class="close-button">
<i class="fa-solid fa-xmark media-close-icon slider-icon"></i>
</button>
</div>`;

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
