const renderMediaSlider = () => {
  console.log(
    "🚀 ~ file: photographer.js:240 ~ renderMediaSlider ~ selectedMedia:",
    selectedMedia
  );

  let fullScreenMedia = document.createElement("div");
  fullScreenMedia.classList.add("full-screen-media");

  fullScreenMedia.innerHTML = `
  <div class="full-screen-modal">
  <i class="fa-solid fa-chevron-left slider-icon"></i>
  ${
    selectedMedia.image
      ? `
      <img
        src="assets/images/${photographer.name}/${selectedMedia.image}"
        class="photograph-work-content-img-modal"
        alt="photograph work presentation"
      />`
      : `<video
      src="assets/images/${photographer.name}/${selectedMedia.video}"
      class="photograph-work-content-img-modal"
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
};

renderMediaSlider();
