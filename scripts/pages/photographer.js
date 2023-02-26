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
const displayPhotographerMedia = async (id) => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();

  const medias = `
    <ul class= "photograph-work-content">
    ${photographerMediaDetails
      .map(
        (work) =>
          `<li class="photograph-work-content-img">
         <${work.image ? "img" : "video"} src="assets/images/${
            photographer.name
          }/${work.image ? work.image : work.video}" alt=${
            work.image ? "photograph work presentation" : "#"
          } ${
            work.video ? "autoplay muted controls" : "#"
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
};

//display photographer media
displayPhotographerMedia(id);

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
