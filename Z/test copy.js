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

  allWork.insertAdjacentHTML("beforeend", medias);
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

//FULL SCREEN IMAGE ON CLICK
const fullScreenPhoto = async () => {
  //retrieve  medias medias and photographerMediaDetails from displayPhotographerMedia()
  const { medias, photographer, photographerMediaDetails } =
    await displayPhotographerMedia();

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
      // console.log(
      //   "🚀 ~ file: photographer.js:225 ~ photo.addEventListener ~ productId:",
      //   mediaId
      // );

      // find the corresponding media object from the photographerMediaDetails array
      let selectedMedia = photographerMediaDetails.find(
        (photoOrVideo) => photoOrVideo.id == mediaId
      );

      // const mediaContent = selectedMedia.video
      //   ? `<video src="assets/images/${photographer.name}/${selectedMedia.video}"  muted class="photograph-work-content-img-modal"></video>`
      //   : `<img src="assets/images/${photographer.name}/${selectedMedia.image}" alt="photograph work presentation" class="photograph-work-content-img-modal">`;

      // console.log(
      //   "🚀 ~ file: photographer.js:243 ~ media.addEventListener ~ selectedMedia:",
      //   selectedMedia
      // );

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
      // const tata = document.querySelectorAll(".photograph-work-content-img");
      const imageModal = fullScreenMedia.querySelector(
        ".photograph-work-content-img-modal"
      );

      let currentIndex = photographerMediaDetails.findIndex(
        (obj) => obj.id === selectedMedia.id
      );

      //Arrow Left
      arrowLeft.addEventListener("click", async function () {
        //retrieve photographer and all media information
        const { photographerMediaDetails, photographer } =
          await photographerInformation();
        console.log(
          "🚀 ~ file: photographer.js:294 ~ photographerMediaDetails:",
          photographerMediaDetails
        );

        // let previousImageIndex =
        console.log(photographerMediaDetails[currentIndex - 1]);
        console.log("🚀 ~ file: photographer.js:301 ~ position:", currentIndex);

        function showPrevImage() {
          currentIndex--;
          if (currentIndex < 0) {
            currentIndex = photographerMediaDetails.length - 1;
          }
          console.log(currentIndex);
          // console.log(tata[currentIndex]);
          const previousImage = photographerMediaDetails[currentIndex];
          console.log(
            "🚀 ~ file: photographer.js:319 ~ showPrevImage ~ product:",
            previousImage
          );

          imageModal.src = `assets/images/${photographer.name}/${
            previousImage.image ? previousImage.image : previousImage.video
          }`;

          let see = (imageModal.src = `assets/images/${photographer.name}/${
            previousImage.image ? previousImage.image : previousImage.video
          }`);
          console.log(
            "🚀 ~ file: photographer.js:311 ~ showPrevImage ~ see:",
            see,
            imageModal
          );

          imageModal.tagName === "VIDEO"
            ? console.log("Video")
            : console.log("Image");
          // imageModal.src = previousImage.image
          //   ? `assets/images/${photographer.name}/${previousImage.image}`
          //   : "Molimo";

          // imageModal.src = `assets/images/${photographer.name}/${imageList[imageIndex]}`;
        }
        console.log(
          "🚀 ~ file: photographer.js:327 ~ showPrevImage ~ currentIndex:",
          currentIndex
        );
        console.log(
          "🚀 ~ file: photographer.js:327 ~ showPrevImage ~ currentIndex:",
          currentIndex
        );
        showPrevImage();

        console.log("left arrow left");
      });

      //arrow right
      arrowRight.addEventListener("click", () => {
        console.log("arrow right");
      });
    });
  });
  // console.log(
  //   "🚀 ~ file: photographer.js:248 ~ fullScreenPhoto ~ see:",
  //   mediasContent
  // );
};

fullScreenPhoto();
