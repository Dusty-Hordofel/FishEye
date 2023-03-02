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

//INDIVIDUAL PHOTOGRAPHER INFORMATION
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
        (work, index) =>
          `<li class="photograph-work-container" >
         <${work.image ? "img" : "video"} src="assets/images/${
            photographer.name
          }/${work.image ? work.image : work.video}" alt=${
            work.image ? "photograph work presentation" : "#"
          } ${
            work.video ? "muted" : "#"
          } class="photograph-work-content-img" key="${index}"></${
            work.image ? "img" : "video"
          } >  
          <div class="photograph-work-content-description">
          <h2>${work.title}</h2>
          <div class="photograph-work-content-description-likes">
          <p class="photographer-likes" >${work.likes}</p>
          <span><i class="fa-solid fa-heart" key="${index}"></i></span>
          </div>
          </div>
          </li>`
      )
      .join("")}
          </ul>
          `;

  allWork.insertAdjacentHTML("beforeend", medias);
  return { photographerMediaDetails, photographer };
};

// displayPhotographerMedia();

//PHOTOGRAPHER RATE AND PRICE
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
  // const likes = document.querySelectorAll(".fa-heart");
  // console.log("🚀 ~ file: photographer.js:363 ~ likes:", likes);

  console.log(
    "🚀 ~ file: photographer.js:201 ~ fullScreenPhoto ~ photographerMediaDetails:",
    photographerMediaDetails
  );
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
      let mediaIndex = media.getAttribute("key");
      console.log(
        "🚀 ~ file: photographer.js:217 ~ media.addEventListener ~ mediaId:",
        mediaIndex
      );

      //selected media information
      // let selectedMedia = photographerMediaDetails[mediaIndex];

      // console.log(
      //   "🚀 ~ file: photographer.js:228 ~ media.addEventListener ~ selectedMedia:",
      //   selectedMedia
      // );

      // let fullScreenMedia = document.createElement("div");
      // fullScreenMedia.classList.add("full-screen-media");

      //show media in full screen

      // <${selectedMedia.image ? "img" : "video"} src="assets/images/${
      //   photographer.name
      // }/${
      //   selectedMedia.image ? selectedMedia.image : selectedMedia.video
      // }" alt=${selectedMedia.image ? "photograph work presentation" : "#"} ${
      //   selectedMedia.video ? "autoplay muted controls" : "#"
      // } class="photograph-work-content-img-modal"></${
      //   selectedMedia.image ? "img" : "video"
      // }>

      let selectedMedia = photographerMediaDetails[mediaIndex];
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

        //scroll through all the media
        const arrowLeft = document.querySelector(".fa-chevron-left");
        const arrowRight = document.querySelector(".fa-chevron-right");
        const imageModal = fullScreenMedia.querySelectorAll(
          ".photograph-work-content-img-modal"
        );
        console.log(
          "🚀 ~ file: photographer.js:298 ~ renderMediaSlider ~ imageModal:",
          imageModal
        );

        //Arrow Left
        arrowLeft.addEventListener("click", function () {
          mediaIndex--;

          if (mediaIndex < 0) {
            mediaIndex = photographerMediaDetails.length - 1;
          }

          selectedMedia = photographerMediaDetails[mediaIndex];
          console.log(
            "🚀 ~ file: photographer.js:317 ~ selectedMedia:",
            selectedMedia
          );
          console.log(
            "🚀 ~ file: photographer.js:321 ~ selectedMedia:",
            fullScreenMedia
          );

          imageModal.forEach((mediaSlider) => {
            mediaSlider.src = `assets/images/${photographer.name}/${
              selectedMedia.image ? selectedMedia.image : selectedMedia.video
            }`;
          });
        });

        //Arrow right
        arrowRight.addEventListener("click", function () {
          mediaIndex++;

          if (mediaIndex >= photographerMediaDetails.length) {
            mediaIndex = 0;
          }

          selectedMedia = photographerMediaDetails[mediaIndex];
          console.log(
            "🚀 ~ file: photographer.js:317 ~ selectedMedia:",
            selectedMedia
          );
          console.log(
            "🚀 ~ file: photographer.js:321 ~ selectedMedia:",
            fullScreenMedia
          );

          imageModal.forEach((mediaSlider) => {
            mediaSlider.src = `assets/images/${photographer.name}/${
              selectedMedia.image ? selectedMedia.image : selectedMedia.video
            }`;
          });
        });
      };
      renderMediaSlider();
    });
  });
};

fullScreenPhoto();

//INCREASE LIKES

async function increaseLikes() {
  const { photographerMediaDetails } = await photographerInformation();
  const likes = document.querySelectorAll(".fa-heart");

  const photographerLikes = document.querySelectorAll(".photographer-likes");
  const newTotalLikes = document.querySelector(
    ".photographer-rate-and-price-likes"
  );

  likes.forEach((like) => {
    like.addEventListener("click", async () => {
      //retrieve the like index
      const likeIndex = like.getAttribute("key");

      //increase  likes count
      const increase = (photographerMediaDetails[likeIndex].likes += 1);
      //display likes to client side
      photographerLikes[likeIndex].innerHTML = increase;

      //calcul new  totalLikes
      const totalLikes = photographerMediaDetails.reduce(
        (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
        0
      );

      //display new  totalLikes
      newTotalLikes.innerHTML = totalLikes;
    });
  });
}

increaseLikes();
