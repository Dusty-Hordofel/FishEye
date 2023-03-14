import { getStorageItem, setStorageItem, formatPrice } from "../utils/utils.js";

//PHOTOGRAPHERS PROFILE FACTORY
const photographerFactories = (informations, element) => {
  element.innerHTML = informations
    .map((information) => {
      const { city, country, id, name, portrait, price, tagline } = information;
      return `
    <article class="photoraher-profile" aria-label="Informations sur le photographe ${name} tabindex="0">
    <a href="photographer.html?id=${id}" title="Visiter la page de profil de ${name}" role="link">
    <img src="assets/photographers/${portrait}" alt="Photo de profil du photographe ${name}"/>
    <h2>${name}</h2>
    </a>
    <p class="location" aria-label="ville et pays où se trouve le photographe">${city}, ${country}</p>
    <p class="description" aria-label="citation du photographe:${name}">${tagline}</p>
    <p class="price" aria-label="coût de la prestation du photographe ${name}">${formatPrice(
        price
      )}/jour</p>
    </article>
    `;
    })
    .join("");
};

//PHOTOGRAPHER PROFILE CARD
const photographerCard = (informations, element) => {
  const { city, country, name, portrait, tagline } = informations;

  element.innerHTML = `
    <div class="photograph-description">
    <h1 tabindex="0">${name}</h1>
    <p class="location" aria-label="ville et pays de ${name}" tabindex="0">${city}, ${country}</p>
    <p class="description" tabindex="0" aria-label="citation du photographe ${name}">${tagline}</p>
  </div>
  <button class="contact_button" onclick="displayModal()" tabindex="0"
  aria-label="Bouton pour ouvrir la boîte de dialogue pour contacter le photographe ${name}">Contactez-moi</button>
  <img src="assets/photographers/${portrait}" alt="photo de profil du photographe ${name}" tabindex="0"/>

  `;
};

//Gobal photographers Medias Informations variable
let photographerMediasStore;

// GET ALL MEDIAS DETAILS TAKEN BY PHOTOGRAPHER
const getphotographerMediasDetails = (informations, id) => {
  //   use filter to dispaly all media the photographerId we clicked on
  const photographerMediaDetails = informations.filter(
    (p) => p.photographerId == id
  );

  console.log(
    "🚀 ~ file: photographer.js:42 ~ getphotographerMediasDetails ~ informations:",
    photographerMediaDetails
  );
  photographerMediasStore = photographerMediaDetails;
  console.log(
    "🚀 ~ file: photographer.js:43 ~ getphotographerMediasDetails ~ photographerMediasStore:",
    photographerMediasStore
  );

  return photographerMediaDetails;
};

//Gobal photographers Informations variable
let photographerInformations;

//GET ALL PHOTOGRAPHER INFORMATION
const getphotographerInformations = (photographersInformation, id) => {
  //get photographer detail using id
  const findPhotographer = photographersInformation.find(
    (photographerInformation) => photographerInformation.id == id
  );
  photographerInformations = findPhotographer;

  return findPhotographer;
};

// Global photographersInfoStore variable
let photographersInfoStore = getStorageItem("photographersInfoStore");
//Global photographers Medias variable
let photographersMediasStore = getStorageItem("photographersMediasStore");

//create photographer store
const photographersStore = (products) => {
  console.log(products);
  //affecte products to photographersInfoStore
  photographersInfoStore = products;

  //add photographersInfoStore to the local storage
  setStorageItem("photographersInfoStore", photographersInfoStore);

  return products;
};

//create photographer medias store
const mediasStore = (medias) => {
  console.log(medias);
  //affecte products to photographersInfoStore
  photographersMediasStore = medias;

  //add photographersInfoStore to the local storage
  setStorageItem("photographersMediasStore", photographersMediasStore);

  return medias;
};

export {
  photographersInfoStore,
  photographersStore,
  photographerFactories,
  getphotographerMediasDetails,
  photographerMediasStore,
  getphotographerInformations,
  photographerInformations,
  mediasStore,
  photographersMediasStore,
  photographerCard,
};
