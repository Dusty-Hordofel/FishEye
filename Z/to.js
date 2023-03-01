//photograph header section selector's
const main = document.querySelector(".photograph-header");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");

//photograph medias selector
const allWork = document.querySelector(".photograph-work");

// fontion permettant de recupérer les media des photographes
const getPhotographersMedia = async () => {
  const { media } = await getPhotographers();
  return media;
};

// retrieve id from url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

//display photographer details using id
const displayPhotographerdetails = async (id) => {
  const photographerDetails = await getPhotographersDetails();
  const findPhotographer = photographerDetails.find((p) => p.id == id);
  console.log(
    "🚀 ~ file: photographer.js:14 ~ displayPhotographerdetails ~ photographerDetails:",
    findPhotographer
  );

  return findPhotographer;
};

// create an individual photographer card
async function createIndividualPhotographerCard() {
  //retrieve photographer information
  const photographer = await displayPhotographerdetails(id);

  //use article as a child of an anchor element
  let link = document.createElement("a");
  // Set the href attribute of the anchor element to the link URL
  link.href = "index.html";
  //append  logo home
  link.appendChild(logo);

  //image path
  const picture = `assets/photographers/${photographer.portrait}`;

  //image
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", "photographer profile");

  //create div element in main section
  const divElement = document.createElement("div");

  //add photograph-description  to main section
  divElement.classList.add("photograph-description");

  //photographer name
  const h1 = document.createElement("h1");
  h1.textContent = photographer.name;

  //location
  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = `${photographer.city}, ${photographer.country}`;
  location.setAttribute("aria-label", "location and country");

  //description
  const description = document.createElement("p");
  description.textContent = photographer.tagline;
  description.classList.add("description");

  //Append the h2, location and description as children to divElement
  divElement.appendChild(h1);
  divElement.appendChild(location);
  divElement.appendChild(description);

  //add image and divElement to main section
  main.appendChild(img);
  main.appendChild(divElement);

  //add link to a logo
  header.appendChild(link);

  //select photograph-main children
  var buttonChild = main.children[0];
  var h1TitleChild = main.children[2];
  //insert h2 title before the button
  main.insertBefore(h1TitleChild, buttonChild);
}

createIndividualPhotographerCard();

//individual photographer information
const photographerInformation = async () => {
  //retrieve photographer information
  const photographer = await displayPhotographerdetails(id);

  //  retrieve photographe media
  const photographerMedia = await getPhotographersMedia();

  //   use filter to dispaly all media the photographerId we clicked on
  const photographerMediaDetails = photographerMedia.filter(
    (p) => p.photographerId == id
  );

  return { photographerMediaDetails, photographer };
};

//display all media information
const displayPhotographerMedia = async () => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();
  console.log(
    "🚀 ~ file: photographer.js:113 ~ displayPhotographerMedia ~ photographerMediaDetails:",
    photographerMediaDetails
  );

  //autoplay muted controls
  const medias = `
    <ul class= "photograph-work-content">
    ${photographerMediaDetails
      .map(
        (work) =>
          `<li class="photograph-work-content-img" media-id="${work.id}">
         <${work.image ? "img" : "video"} src="assets/images/${
            photographer.name
          }/${work.image ? work.image : work.video}" alt=${
            work.image ? "photograph work presentation" : "#"
          } ${
            work.video ? "muted" : "#"
          } class="photograph-work-content-img"></${
            work.image ? "img" : "video"
          }>  
          <div class="photograph-work-content-description">
          <h2>${work.title}</h2>
          <div class="photograph-work-content-description-likes">
          <p>${work.likes}</p>
          <span><i class="fa-solid fa-heart"></i></span>
          </div>
          </div>
          </li>`
      )
      .join("")}
          </ul>
          `;
  // document.querySelector("#all-medias").innerHTML = medias;
  // const allMedias = document.querySelector(".all-medias");
  // console.log(
  //   "🚀 ~ file: photographer.js:148 ~ displayPhotographerMedia ~ allMedias:",
  //   allMedias
  // );
  // const mediasElement = document.createElement("div");
  // mediasElement.classList.add("all-medias");
  // mediasElement.appendChild(medias);

  allWork.insertAdjacentHTML("beforeend", medias);
  // const see = document.querySelectorAll(".photograph-work-content-img");
  // console.log("🚀 ~ file: photographer.js:159 ~ fullScreenPhoto ~ see:", see);
  return { medias, photographerMediaDetails, photographer };
};

//display photographer media
// displayPhotographerMedia();

//photographer rate and price
const photographerRateAndPrice = async () => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();

  //calcul photographer totalLikes
  const totalLikes = photographerMediaDetails.reduce(
    (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
    0
  );

  //create rateAndPrice variable to store photographer totalLikes and price
  const rateAndPrice = `
    <ul class="photographer-rate-and-price-container">
    <li class="photographer-rate-and-price-likes">${totalLikes}<span><i class="fa-solid fa-heart"></i></span></li>
    <li class="photographer-rate-and-price-prices">${photographer.price}€ / jour</li>
    </ul>
    `;

  allWork.insertAdjacentHTML("beforeend", rateAndPrice);
};

photographerRateAndPrice();

//photographername on contact modal

const photographerName = async () => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();
  const name = `${photographer.name}`;

  const modalContact = document.querySelector(".modal");
  const photographerName = document.createElement("h2");
  photographerName.textContent = name;
  const modalHeader = document.querySelector(".modal-header");
  const nextSiblingElement = modalHeader.nextSibling;
  modalContact.insertBefore(photographerName, nextSiblingElement);
};

photographerName();

//diplay medias in full screen on click
// const displayImage = document.querySelector(".photograph-work");
// const displayImages = document.querySelector(".photograph-work-content");
// console.log("🚀 ~ file: photographer.js:199 ~ displayImages:", displayImages);
// console.log("🚀 ~ file: photographer.js:198 ~ displayImage:", displayImage);

//full screen image

// const folo = async () => {
//   //retrieve  medias medias and photographerMediaDetails from displayPhotographerMedia()
//   const { medias, photographer, photographerMediaDetails } =
//     console.log("🚀 ~ file: photographer.js:220 ~ folo ~ photographerMediaDetails:", photographerMediaDetails)
//     await displayPhotographerMedia();

//   // photographerMediaDetails.forEach((media, index) => console.log(media));
// };
// console.log("🚀 ~ file: photographer.js:225 ~ folo ~ folo:", folo());

const fullScreenPhoto = async () => {
  //retrieve  medias medias and photographerMediaDetails from displayPhotographerMedia()
  const { medias, photographer, photographerMediaDetails } =
    await displayPhotographerMedia();

  //selected Media
  function selectedMediaId() {
    //select all medias using classname
    const mediasContent = document.querySelectorAll(
      ".photograph-work-content-img"
    );
    // console.log(
    //   "🚀 ~ file: photographer.js:239 ~ fullScreenPhoto ~ mediasContent:",
    //   mediasContent
    // );

    // add event listener to each media
    mediasContent.forEach((media) => {
      media.addEventListener("click", () => {
        // get the media id from the media-id attribute
        let mediaId = media.getAttribute("media-id");
        // console.log(
        //   "🚀 ~ file: photographer.js:22 ~ photo.addEventListener ~ productId:",
        //   mediaId
        // );

        // find the corresponding media object from the photographerMediaDetails array
        let selectedMedia = photographerMediaDetails.find(
          (photoOrVideo) => photoOrVideo.id == mediaId
        );

        console.log(
          "🚀 ~ file: photographer.js:259 ~ media.addEventListener ~ selectedMedia:",
          selectedMedia
        );

        return selectedMedia;
      });
    });
  }

  selectedMediaId();

  //test

  let momo = photographerMediaDetails.forEach((media, index) => {
    const { selectedMedia } = selectedMediaId();
    console.log(
      "🚀 ~ file: photographer.js:273 ~ momo ~ selectedMedia:",
      selectedMedia
    );
    // {
    //   if (index === currentIndex) {
    //     console.log("YEEEEEEEEESSSSSS");
    //     console.log(imageSelected);
    //   }
    // }
    // console.log(media)
  });
  console.log("🚀 ~ file: photographer.js:235 ~ fullScreenPhoto ~ momo:", momo);

  //select all medias using classname
  const mediasContent = document.querySelectorAll(
    ".photograph-work-content-img"
  );
  console.log(
    "🚀 ~ file: photographer.js:224 ~ fullScreenPhoto ~ mediasContent:",
    mediasContent
  );

  // add event listener to each media
  mediasContent.forEach((media) => {
    media.addEventListener("click", () => {
      // get the media id from the media-id attribute
      let mediaId = media.getAttribute("media-id");
      console.log(
        "🚀 ~ file: photographer.js:225 ~ photo.addEventListener ~ productId:",
        mediaId
      );

      // find the corresponding media object from the photographerMediaDetails array
      let selectedMedia = photographerMediaDetails.find(
        (photoOrVideo) => photoOrVideo.id == mediaId
      );

      console.log(
        "🚀 ~ file: photographer.js:243 ~ media.addEventListener ~ selectedMedia:",
        selectedMedia
      );

      // create a new HTML element to display the selected media in full screen

      let fullScreenMedia = document.createElement("div");

      fullScreenMedia.classList.add("full-screen-media");
      fullScreenMedia.innerHTML = `
      <div class="full-screen-modal">
      <i class="fa-solid fa-chevron-left slider-icon"></i>
      <${selectedMedia.image ? "img" : "video"} src="assets/images/${
        photographer.name
      }/${
        selectedMedia.image ? selectedMedia.image : selectedMedia.video
      }" alt=${selectedMedia.image ? "photograph work presentation" : "#"} ${
        selectedMedia.video ? "autoplay muted controls" : "#"
      } class="photograph-work-content-img-modal"></${
        selectedMedia.image ? "img" : "video"
      }>
      
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

      //scroll through all the media

      const arrowLeft = document.querySelector(".fa-chevron-left");
      const arrowRight = document.querySelector(".fa-chevron-right");
      const imageModal = fullScreenMedia.querySelector(
        ".photograph-work-content-img-modal"
      );
      console.log(
        "🚀 ~ file: photographer.js:289 ~ media.addEventListener ~ imageModal:",
        imageModal
      );
      // const arrowRight = document.querySelector(".fa-chevron-right");//select tthe text

      //arrow left
      arrowLeft.addEventListener("click", async function () {
        //retrieve photographer and all media information
        const { photographerMediaDetails, photographer } =
          await photographerInformation();
        console.log(
          "🚀 ~ file: photographer.js:294 ~ photographerMediaDetails:",
          photographerMediaDetails
        );

        //get position on an element in the array

        // function getPosition(item) {
        //   const itemId = parseInt(item.dataset.id);
        //   const position = data.findIndex((obj) => obj.id === itemId);
        //   return position;
        // }

        let currentIndex = photographerMediaDetails.findIndex(
          (obj) => obj.id === selectedMedia.id
        );

        photographerMediaDetails.forEach((imageSelected, index) => {
          if (index === currentIndex) {
            console.log("YEEEEEEEEESSSSSS");
            console.log(imageSelected);
          }
        });

        // let previousImageIndex =
        console.log(photographerMediaDetails[currentIndex - 1]);

        console.log("🚀 ~ file: photographer.js:301 ~ position:", currentIndex);

        function showPrevImage() {
          currentIndex--;
          // console.log(
          //   "🚀 ~ file: photographer.js:320 ~ showPrevImage ~ previousIndex:",
          //   previousIndex
          // );
          // currentIndex = currentIndex - 1;
          if (currentIndex < 0) {
            currentIndex = photographerMediaDetails.length - 1;
          }
          const previousImage = photographerMediaDetails[currentIndex];
          console.log(
            "🚀 ~ file: photographer.js:319 ~ showPrevImage ~ product:",
            previousImage
          );
          // imageModal.src = previousImage.image;

          imageModal.src = `assets/images/${photographer.name}/${previousImage.image}`;
          // imageModal.src = `assets/images/${ photographer.name}/${imageList[imageIndex]}`;
        }
        showPrevImage();
        // const clone = photographerMediaDetails.slice();
        // console.log(clone.indexOf(selectedMedia));
        console.log("left arrow left");
        // const testo = photographerMediaDetails.findIndex(selectedMedia.image);
        // console.log(
        //   "🚀 ~ file: photographer.js:295 ~ arrowLeft.addEventListener ~ testo:",
        //   testo
        // );
      });
      //arrow right
      arrowRight.addEventListener("click", () => {
        console.log("arrow right");
      });
    });
  });
  console.log(
    "🚀 ~ file: photographer.js:248 ~ fullScreenPhoto ~ see:",
    mediasContent
  );
};

fullScreenPhoto();

// const see = document.querySelector(".photograph-work");
// console.log("🚀 ~ file: photographer.js:210 ~ fullScreenPhoto ~ see:", see);

{
  /* <p>Price: ${selectedMedia.price}</p>
<p>Description: ${selectedMedia.title}</p>
<img src="${selectedMedia.imageUrl}" alt="${selectedMedia.name}"> */
}

// Add event listener to allow scrolling through all media
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowLeft") {
//     // Navigate to the previous product
//     const previousIndex =
//       (currentIndex - 1 + products.length) % products.length;
//     const previousProduct = products[previousIndex];
//     previousProduct.click();
//   } else if (event.key === "ArrowRight") {
//     // Navigate to the next product
//     const nextIndex = (currentIndex + 1) % products.length;
//     const nextProduct = products[nextIndex];
//     nextProduct.click();
//   }
// });

// const fullScreenMedia = document.querySelector(".full-screen-media");
// const imageModal = fullScreenMedia.querySelector(".photograph-work-content-img-modal");
// const leftIcon = fullScreenMedia.querySelector(".fa-chevron-left");
// const rightIcon = fullScreenMedia.querySelector(".fa-chevron-right");
// const photographerName = photographer.name;

// // array of image file names to be displayed
// const imageList = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];

// let imageIndex = 0; // set initial image index to 0

// // function to update the image source
// function updateImage() {
//   imageModal.src = `assets/images/${photographerName}/${imageList[imageIndex]}`;
// }

// // add click event listener to left icon
// leftIcon.addEventListener("click", () => {
//   imageIndex--;
//   if (imageIndex < 0) {
//     imageIndex = imageList.length - 1;
//   }
//   updateImage();
// });

// // add click event listener to right icon
// rightIcon.addEventListener("click", () => {
//   imageIndex++;
//   if (imageIndex >= imageList.length) {
//     imageIndex = 0;
//   }
//   updateImage();
// });

${selectedMedia.image}?<image src="assets/images/${photographer.name}/${selectedMedia.image}"/>: "MOTO PAMA"