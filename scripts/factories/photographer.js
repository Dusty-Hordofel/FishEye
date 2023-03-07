import { getStorageItem, setStorageItem, formatPrice } from "../utils/utils.js";

const photographerFactories = (informations, element) => {
  console.log(
    "🚀 ~ file: photographer3.js:3 ~ photographerFactories ~ products:",
    informations,
    element
  );
  element.innerHTML = informations
    .map((information) => {
      const { city, country, id, name, portrait, price, tagline } = information;
      return `
    <article class="photoraher-profile">
    <a href="photographer.html?id=${id}">
    <img src="assets/photographers/${portrait}" alt="photographer profile image"/>
    <h2>${name}</h2>
    </a>
    <p class="location" aria-label="location and country">${city}, ${country}</p>
    <p class="description">${tagline}</p>
    <p class="price">${formatPrice(price)}/jour</p>
    </article>
    `;
    })
    .join("");
};

// let photographerInfoStore;
let photographerInfoStore = getStorageItem("photographerInfoStore");

//create photographer store
const photographersStore = (products) => {
  console.log(products);
  //affecte products to photographerInfoStore
  photographerInfoStore = products;
  console.log(
    "🚀 ~ file: photographer3.js:35 ~ photographersStore ~ photographerInfoStore:",
    photographerInfoStore
  );

  //add photographerInfoStore to the local storage
  setStorageItem("photographerInfoStore", photographerInfoStore);

  return products;
};

// console.log(photographerInfoStore);

export { photographerInfoStore, photographersStore, photographerFactories };
