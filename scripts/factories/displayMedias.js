//DISPLAY ALL INDIVIDUAL PHOTOGRAPHER MEDIAS
import { fullScreenMedia } from "./fullScreen.js";
import { getAllElement, getElement } from "../utils/utils.js";
import { photographerRateAndPrice } from "./photographerRateAndPrice.js";
import { handleLikes } from "./handleLikes.js";

//photograph medias selector
const allWork = document.querySelector(".photograph-work");
console.log("🚀 ~ file: displayMedias.js:15 ~ allWork:", allWork);

const displayPhotographerMedia = (medias, element, photographer) => {
  console.log(
    "🚀 ~ file: displayMedias.js:10 ~ displayPhotographerMedia ~ medias:",
    medias
  );
  let allPhotographerMedias = medias;
  // momo(medias);
  //retrieve photographer information
  const { name } = photographer;

  //autoplay muted controls
  element.innerHTML = `
          <ul class= "photograph-work-content">
          ${medias
            .map((media, index) => {
              const { likes, title, video, image, date } = media;
              return ` 
              <li class="photograph-work-container" >
              <${image ? "img" : "video"} src="assets/images/${name}/${
                image ? image : video
              }"

              ${image ? `alt=${title}` : ""}
               ${video ? "muted" : ""} class="photographer-medias" 
               id=${
                 image ? "photograph-content-img" : "photograph-content-video"
               } key="${index}"  ${image ? "/" : ""}> ${image ? "" : "</video>"}
              <div class="photograph-work-content-description">
              <h2>${title}</h2>
              <div class="photograph-work-content-description-likes">
              <p class="photographer-likes" >${likes}</p>
              <button class="like-btn count-plus" key="${index}"><i class="fa-solid fa-heart count-plus" ></i></button>
              </div>
              </div>
              </li>`;
            })
            .join("")}
                </ul>
                `;

  const mediasContent = getAllElement(".photographer-medias");
  mediasContent.forEach((media) => {
    media.addEventListener("click", () => {
      // get the media index from the media-id attribute
      let mediaIndex = media.getAttribute("key");
      console.log(
        "🚀 ~ file: displayMedias.js:41 ~ media.addEventListener ~ mediaIndex:",
        mediaIndex
      );
      //display content of  selected media
      let selectedMedia = medias[mediaIndex];
      console.log(medias);
      fullScreenMedia(selectedMedia, name, mediaIndex, allPhotographerMedias);
      console.log(
        "🚀 ~ file: displayMedias.js:48 ~ media.addEventListener ~ selectedMedia:",
        selectedMedia
      );
    });
  });

  //photographer rate and price
  photographerRateAndPrice(allPhotographerMedias, photographer, allWork);

  //handle likes
  const likesBtn = getAllElement(".like-btn");
  const likeNumber = getAllElement(".photographer-likes");
  const newTotalLikes = getElement(".photographer-rate-and-price-likes");
  console.log(
    "🚀 ~ file: displayMedias.js:84 ~ displayPhotographerMedia ~ newTotalLikes:",
    newTotalLikes
  );
  handleLikes(likesBtn, likeNumber, newTotalLikes, medias);
};

export { displayPhotographerMedia };
