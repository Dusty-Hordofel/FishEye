//DISPLAY ALL INDIVIDUAL PHOTOGRAPHER MEDIAS

const displayPhotographerMedia = (medias, element, photographer) => {
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
               ${video ? "muted" : ""} class=${
                image
                  ? "photograph-work-content-img"
                  : "photograph-work-content-video"
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
};

export { displayPhotographerMedia };
