const leftArrow = (
  photographerMedias,
  selectedMedia,
  index,
  name,
  fullScreenMedia,
  imageElement,
  videoElement
) => {
  const arrowLeft = document.querySelector(".fa-chevron-left");

  arrowLeft.addEventListener("click", () => {
    index--;

    if (index < 0) {
      index = photographerMedias.length - 1;
    }

    selectedMedia = photographerMedias[index];

    console.log(fullScreenMedia);

    if (selectedMedia.image) {
      //Element to be hidden
      videoElement.classList.add("hide");
      //Element to be added
      imageElement.classList.remove("hide");
      imageElement.src = `assets/images/${name}/${selectedMedia.image}`;
    } else {
      //Element to be hidden
      imageElement.classList.add("hide");
      //Element to be added
      videoElement.classList.remove("hide");
      videoElement.src = `assets/images/${name}/${selectedMedia.video}`;
    }
  });
};

const rightArrow = (
  photographerMedias,
  selectedMedia,
  index,
  name,
  fullScreenMedia,
  imageElement,
  videoElement
) => {
  const arrowRight = document.querySelector(".fa-chevron-right");

  arrowRight.addEventListener("click", () => {
    index++;

    if (index >= photographerMedias.length) {
      index = 0;
    }

    selectedMedia = photographerMedias[index];

    console.log(fullScreenMedia);

    if (selectedMedia.image) {
      //Element to be hidden
      videoElement.classList.add("hide");
      //Element to be added
      imageElement.classList.remove("hide");
      imageElement.src = `assets/images/${name}/${selectedMedia.image}`;
    } else {
      //Element to be hidden
      imageElement.classList.add("hide");
      //Element to be added
      videoElement.classList.remove("hide");
      videoElement.src = `assets/images/${name}/${selectedMedia.video}`;
    }
  });
};

export { leftArrow, rightArrow };
