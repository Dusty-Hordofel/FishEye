const arrowRight = document.querySelector(".fa-chevron-right");

const leftArrow = (
  photographerMedias,
  selectedMedia,
  index,
  name,
  fullScreenMedia,
  imageElement,
  videoElement
) => {
  console.log("🚀 ~ file: slide.js:13 ~ name:", name);
  const arrowLeft = document.querySelector(".fa-chevron-left");
  const imageModal = fullScreenMedia.querySelector(
    ".photograph-work-content-img-modal"
  );

  console.log("🚀 ~ file: slide.js:25 ~ videoElement:", videoElement);
  console.log("🚀 ~ file: slide.js:26 ~ imageElement:", imageElement);

  console.log("🚀 ~ file: slide.js:28 ~ imageModal:", imageModal);

  console.log(
    "🚀 ~ file: slide.js:8 ~ leftArrow ~ index:",
    index,
    photographerMedias
  );

  arrowLeft.addEventListener("click", () => {
    index--;
    console.log(
      "🚀 ~ file: slide.js:26 ~ arrowLeft.addEventListener ~ selectedMedia:",
      index
    );

    if (index < 0) {
      index = photographerMedias.length - 1;
    }

    selectedMedia = photographerMedias[index];
    console.log(
      "🚀 ~ file: slide.js:42 ~ arrowLeft.addEventListener ~ selectedMedia:",
      selectedMedia.image
    );

    console.log(fullScreenMedia);

    console.log(
      "🚀 ~ file: photographer.js:49 ~ arrowLeft.addEventListener ~ selectedMedia:",
      imageModal.src.includes(".jpg")
    );
    // imageModal.src.includes(".jpg")
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

export { leftArrow };
