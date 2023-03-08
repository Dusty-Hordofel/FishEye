//photograph header section selector's
const main = document.querySelector(".photograph-header");
const header = document.querySelector("header");
const logo = document.querySelector(".logo");

//photograph medias selector
const allWork = document.querySelector(".photograph-work");

//filter selector
const dropdownMenu = document.querySelector(".dropdown");
const select = document.querySelector(".select");
const caret = document.querySelector(".caret");
const menu = document.querySelector(".menu");
const options = document.querySelectorAll(".menu li");
const selected = document.querySelector(".selected");

// retrieve id from url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

// RETRIEVE ALL PHOTOGRAPHERS MEDIAS
const getPhotographersMedia = async () => {
  const { media } = await getPhotographers();
  return media;
};

//RETRIEVE PHOTOGRAPHER DETAILS: {Name,city,country,price,tagline,...}
const displayPhotographerdetails = async (identifier) => {
  //get photographer details
  const photographerDetails = await getPhotographersDetails();
  //get photographer detail using id
  const findPhotographer = photographerDetails.find((p) => p.id == identifier);
  console.log(
    "🚀 ~ file: photographer.js:14 ~ displayPhotographerdetails ~ photographerDetails:",
    findPhotographer
  );
  //return findPhotographer
  return findPhotographer;
};

<a href="photographer.html?id=${id}"></a>;

//RETRIEVE ALL MEDIAS DETAILS TAKEN BY PHOTOGRAPHER : Each media contains {id,photographerId,image,likes,date,price}
const getphotographerMediasDetails = async () => {
  //  retrieve photographe media
  const photographerMedia = await getPhotographersMedia();

  //   use filter to dispaly all media the photographerId we clicked on
  const photographerMediaDetails = photographerMedia.filter(
    (p) => p.photographerId == id
  );

  return photographerMediaDetails;
};

//INDIVIDUAL PHOTOGRAPHER ALL INFORMATION: Personal Information and Photos done
const photographerInformation = async () => {
  //retrieve photographer information
  const photographer = await displayPhotographerdetails(id);

  //  retrieve photographe media
  const photographerMediaDetails = await getphotographerMediasDetails();

  return { photographerMediaDetails, photographer };
};

// CREATE PHOTOGRAPHER INDIVIDUAL HEADER CARD
async function createIndividualPhotographerCard() {
  //retrieve photographer information with id
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

//DISPLAY ALL INDIVIDUAL PHOTOGRAPHER MEDIAS
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
          }/${work.image ? work.image : work.video}" 
          
          ${work.image ? `alt=${work.title}` : ""}
           ${
             work.video ? "muted" : ""
           } class="photograph-work-content-img" key="${index}"  ${
            work.image ? "/" : ""
          }> ${work.image ? "" : "</video>"} 
          <div class="photograph-work-content-description">
          <h2>${work.title}</h2>
          <div class="photograph-work-content-description-likes">
          <p class="photographer-likes" >${work.likes}</p>
          <button class="like-btn count-plus" key="${index}"><i class="fa-solid fa-heart count-plus" ></i></button>
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

//FULL SCREEN IMAGE ON CLICK
const fullScreenPhoto = async () => {
  //retrieve  medias medias and photographerMediaDetails from displayPhotographerMedia()
  const { medias, photographer, photographerMediaDetails } =
    await displayPhotographerMedia();
  console.log(
    "🚀 ~ file: photographer.js:174 ~ fullScreenPhoto ~ medias:",
    medias
  );

  //select all medias using classname
  const mediasContent = document.querySelectorAll(
    ".photograph-work-content-img"
  );

  // add event listener to each media
  mediasContent.forEach((media) => {
    media.addEventListener("click", () => {
      // get the media index from the media-id attribute
      let mediaIndex = media.getAttribute("key");
      console.log(
        "🚀 ~ file: photographer.js:314 ~ media.addEventListener ~ mediaId:",
        mediaIndex
      );

      //display content of  selected media
      let selectedMedia = photographerMediaDetails[mediaIndex];

      //create a slider
      const renderMediaSlider = () => {
        console.log(
          "🚀 ~ file: photographer.js:322 ~ renderMediaSlider ~ selectedMedia:",
          selectedMedia
        );

        //create a div element for the selected media
        let fullScreenMedia = document.createElement("div");
        //add "full-screen-media" for selected media
        fullScreenMedia.classList.add("full-screen-media");

        //add html script in fullScreenMedia div element
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
            id="photograph-work-img"
          />`
          : `<video
          src="assets/images/${photographer.name}/${selectedMedia.video}"
          class="photograph-work-content-img-modal"
          id="photograph-work-video"
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
        const imageModal = fullScreenMedia.querySelector(
          ".photograph-work-content-img-modal"
        );

        //Arrow Left
        arrowLeft.addEventListener("click", function () {
          mediaIndex--;
          console.log(
            "🚀 ~ file: photographer.js:380 ~ renderMediaSlider ~ imageModal - mediaIndex:",
            mediaIndex
          );

          if (mediaIndex < 0) {
            mediaIndex = photographerMediaDetails.length - 1;
          }

          selectedMedia = photographerMediaDetails[mediaIndex];
          console.log(
            "🚀 ~ file: photographer.js:390 ~ selectedMedia:",
            selectedMedia
          );
          console.log(
            "🚀 ~ file: photographer.js:394 ~ fullScreenMedia:",
            fullScreenMedia
          );

          console.log(
            "🚀 ~ file: photographer.js:402 ~ renderMediaSlider ~ imageModal:",
            imageModal
          );

          imageModal.src = `assets/images/${photographer.name}/${
            selectedMedia.image ? selectedMedia.image : selectedMedia.video
          }`;

          console.log(
            "🚀 ~ file: photographer.js:403 ~ renderMediaSlider ~ imageModal:",
            imageModal.src.includes(".jpg")
          );
          imageModal.src.includes(".jpg")
            ? console.log("first")
            : console.log("second");

          console.log(
            "🚀 ~ file: photographer.js:403 ~ renderMediaSlider ~ imageModal:",
            imageModal.src.includes(".jpg")
          );
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
            console.log(
              "🚀 ~ file: photographer.js:418 ~ mediaSlider:",
              mediaSlider.src
            );

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

//FILTER MENU ALGORITHM

const sortMediaBy = async (sortBy) => {
  const { photographerMediaDetails, photographer } =
    await photographerInformation();
  switch (sortBy) {
    case "title":
      return photographerMediaDetails.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    case "likes":
      return photographerMediaDetails.sort((a, b) => b.likes - a.likes);
    case "date":
      return photographerMediaDetails.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    default:
      return photographerMediaDetails;
  }
};

//SORT MEDIA BY
const sortMedia = async (sortBy = "title") => {
  const { photographer } = await photographerInformation();

  const momo = await sortMediaBy(sortBy);
  const medaille = `
    <ul class= "photograph-work-content">
    ${momo
      .map(
        (work, index) =>
          `<li class="photograph-work-container" >
          <${work.image ? "img" : "video"} src="assets/images/${
            photographer.name
          }/${work.image ? work.image : work.video}" 
          
          ${work.image ? `alt=${work.title}` : ""}
           ${
             work.video ? "muted" : ""
           } class="photograph-work-content-img" key="${index}"  ${
            work.image ? "/" : ""
          }> ${work.image ? "" : "</video>"} 
          <div class="photograph-work-content-description">
          <h2>${work.title}</h2>
          <div class="photograph-work-content-description-likes">
          <p class="photographer-likes" >${work.likes}</p>
          <button class="like-btn count-plus" key="${index}"><i class="fa-solid fa-heart count-plus" ></i></button>
          </div>
          </div>
          </li>`
      )
      .join("")}
          </ul>
          `;

  allWork.innerHTML = medaille;
};

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

//PHOTOGRAPHER NAME ON CONTACT MODAL
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

//HANDLE LIKES

async function handleLikes() {
  const { photographerMediaDetails } = await photographerInformation();
  //select all like buttons
  const likes = document.querySelectorAll(".like-btn");
  //select all like numbers
  const photographerLikes = document.querySelectorAll(".photographer-likes");
  //select like and price card witch is on the bottom of the page
  const newTotalLikes = document.querySelector(
    ".photographer-rate-and-price-likes"
  );

  likes.forEach((like) => {
    like.addEventListener("click", async () => {
      //retrieve the like index
      const likeIndex = like.getAttribute("key");

      //conditionnal rendering: increase or decrease the like
      if ([...like.classList].includes("count-plus")) {
        like.classList.remove("count-plus");
        like.classList.add("count-moin");

        //increase the number of likes
        let increase = (photographerMediaDetails[likeIndex].likes += 1);

        //display increased likes on screen
        photographerLikes[likeIndex].textContent = increase;
      } else {
        like.classList.add("count-plus");
        like.classList.remove("count-moin");

        //decrease the number of likes
        let decrease = (photographerMediaDetails[likeIndex].likes -= 1);

        //display decreased likes on screen
        photographerLikes[likeIndex].textContent = decrease;
      }

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

handleLikes();

//FILTER MENU
select.addEventListener("click", () => {
  console.log("first");
  //add the clicked selected style to the selected element
  select.classList.toggle("select-clicked");
  //add rotate style to the caret element
  caret.classList.toggle("caret-rotate");
  //add open style to the menu element
  menu.classList.toggle("menu-open");
});

//loop through  all option elements
options.forEach((option) => {
  //add click envent to the option element
  option.addEventListener("click", () => {
    //change selected inner text to clicked option inner text
    selected.innerText = option.innerText;
    //Add the clicked select styles to the select element
    select.classList.remove("select-clicked");
    //remove the rotate style to the caret element
    caret.classList.remove("caret-rotate");
    //add the open style to the menu element
    menu.classList.remove("menu-open");
    //remove active class for all options elements
    options.forEach((option) => {
      option.classList.remove("active");
    });
    //add active class to clicked option element
    option.classList.add("active");
  });
});
