import {
  photographersInfoStore,
  photographersStore,
  photographerFactories,
} from "../factories/photographer.js";
import { getElement } from "../utils/utils.js";

//Function to get the details of the photographers
async function getPhotographersDetails() {
  try {
    // fetch all photographers information
    const response = await fetch("http://localhost:3000/photographers");
    const data = await response.json();
    console.log("🚀 ~ file: index_test.js:9 ~ getPhotographers ~ data:", data);
    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: index_test.js:13 ~ getPhotographers ~ error",
      error
    );
  }
}

getPhotographersDetails();

//Display Photographers informations

const displayPhotographerData = async () => {
  const informations = await getPhotographersDetails();
  console.log(
    "🚀 ~ file: index_test.js:30 ~ displayPhotographerData ~ informations:",
    informations
  );
  photographerFactories(informations, getElement(".photographer_section"));
};

displayPhotographerData();

//add information to the local storage
const localstorageInfo = async () => {
  const photographers = await getPhotographersDetails();
  photographersStore(photographers);
  console.log(photographersInfoStore);
};

localstorageInfo();
