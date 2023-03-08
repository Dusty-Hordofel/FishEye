import {
  photographersInfoStore,
  photographersStore,
  photographerFactories,
  getphotographerMediasDetails,
  photographerMediasStore,
  getphotographerInformations,
  photographerInformations,
  mediasStore,
  photographersMediasStore,
} from "../factories/photographer.js";

//Function to get the photographer's medias
async function getPhotographersMedias() {
  try {
    // fetch all photographers information
    const response = await fetch("http://localhost:3000/media");
    //transform response to a JSON object
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: photographer.js:11 ~ getPhotographersDetails ~ error:",
      error
    );
  }
}

getPhotographersMedias();

// retrieve id from url
let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log("🚀 ~ file: photographer.js:28 ~ id:", id);

//get photographer information
const photographerInformation = () => {
  getphotographerInformations(photographersInfoStore, id);
};
photographerInformation();

//add medias to the localstorage
const localstorageMedias = async () => {
  const medias = await getPhotographersMedias();
  mediasStore(medias);
  console.log(photographersMediasStore);
};

localstorageMedias();
console.log(photographersMediasStore);

console.log(photographerInformations);

//get individual photographer information
getphotographerMediasDetails(photographersMediasStore, id);

console.log(photographerMediasStore);
