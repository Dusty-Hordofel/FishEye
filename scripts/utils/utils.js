const allPhotographerInfo = "http://localhost:3000/photographers";

const allMedias = "http://localhost:3000/media";

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

//format price
const formatPrice = (price) => {
  let formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
    .format(price)
    .replace(/,00/, "");
  return formattedPrice;
};

//get item in the local storage
const getStorageItem = (item) => {
  let storageItem = localStorage.getItem(item);

  storageItem
    ? (storageItem = JSON.parse(localStorage.getItem(item)))
    : (storageItem = []); //parse is used to transform string values to an object

  return storageItem;
};

// set item in the local storage
const setStorageItem = (name, item) => {
  //name of my key and the item
  localStorage.setItem(name, JSON.stringify(item)); //La méthode JSON.stringify() convertit une valeur JavaScript en chaîne JSON. we can only store data as a string in localStorage
};

export {
  allPhotographerInfo,
  allMedias,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
