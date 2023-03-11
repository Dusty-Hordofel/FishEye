const arrowRight = document.querySelector(".fa-chevron-right");
// const imageModal = fullScreenMedia.querySelector(
//   ".photograph-work-content-img-modal"
// );

const leftArrow = (
  photographerMedias,
  selectedMedia,
  index,
  fullScreenMedia,
  name
) => {
  console.log("🚀 ~ file: slide.js:13 ~ name:", name);
  const arrowLeft = document.querySelector(".fa-chevron-left");
  const imageModal = fullScreenMedia.querySelector(
    ".photograph-work-content-img-modal"
  );
  const imageElement = document.querySelector(".photograph-work-img");
  const videoElement = document.querySelector(".photograph-work-video");
  const fullElement = document.querySelector(".full-screen-media");
  console.log("🚀 ~ file: slide.js:30 ~ fullElement:", fullElement);

  console.log("🚀 ~ file: slide.js:20 ~ videoElement:", videoElement);
  console.log("🚀 ~ file: slide.js:21 ~ imageElement:", imageElement);

  console.log("🚀 ~ file: slide.js:16 ~ imageModal:", imageModal);

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
      "🚀 ~ file: slide.js:26 ~ arrowLeft.addEventListener ~ selectedMedia:",
      selectedMedia
    );

    console.log(fullScreenMedia);

    // imageModal.src = `assets/images/${name}/${
    //   selectedMedia.image ? selectedMedia.image : selectedMedia.video
    // }`;
    console.log(
      "🚀 ~ file: photographer.js:54 ~ arrowLeft.addEventListener ~ selectedMedia:",
      imageModal.src.includes(".jpg")
    );

    if (imageModal.src.includes(".jpg")) {
      //   fullElement.classList.add("hide");
      //   imageElement.classList.add("molimo");
      //   videoElement.classList.add("Mama");
      //Element to be hidden
      //   videoElement.classList.add("hide");
      //Element to be added
      imageElement.classList.remove("hide");
      imageElement.src = `assets/images/${name}/${selectedMedia.image}`;
    } else {
      //   imageElement.classList.add("molimo");
      //   videoElement.classList.add("Mama");
      //   videoElement.classList.add("mamaNayo");
      //Element to be hidden
      //   imageElement.classList.add("hide");
      //Element to be added
      videoElement.classList.remove("hide");
      videoElement.src = `assets/images/${name}/${selectedMedia.video}`;
    }
  });
};

// leftArrow();
// //Arrow Left
// arrowLeft.addEventListener("click", function () {
//   index--;
//   console.log(
//     "🚀 ~ file: photographer.js:380 ~ renderMediaSlider ~ imageModal - mediaIndex:",
//     mediaIndex
//   );

//   if (mediaIndex < 0) {
//     mediaIndex = photographerMediaDetails.length - 1;
//   }

//   selectedMedia = photographerMediaDetails[mediaIndex];
//   console.log("🚀 ~ file: photographer.js:390 ~ selectedMedia:", selectedMedia);
//   console.log(
//     "🚀 ~ file: photographer.js:394 ~ fullScreenMedia:",
//     fullScreenMedia
//   );

//   console.log(
//     "🚀 ~ file: photographer.js:402 ~ renderMediaSlider ~ imageModal:",
//     imageModal
//   );

//   imageModal.src = `assets/images/${photographer.name}/${
//     selectedMedia.image ? selectedMedia.image : selectedMedia.video
//   }`;

//   console.log(
//     "🚀 ~ file: photographer.js:403 ~ renderMediaSlider ~ imageModal:",
//     imageModal.src.includes(".jpg")
//   );
//   imageModal.src.includes(".jpg")
//     ? console.log("first")
//     : console.log("second");

//   console.log(
//     "🚀 ~ file: photographer.js:403 ~ renderMediaSlider ~ imageModal:",
//     imageModal.src.includes(".jpg")
//   );
// });

export { leftArrow };
