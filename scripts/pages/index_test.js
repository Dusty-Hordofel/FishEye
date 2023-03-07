import {
  photographerInfoStore,
  photographersStore,
  photographerFactories,
} from "../factories/photographer3.js";
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

//Display Photographers information

const displayPhotographerData = async () => {
  const informations = await getPhotographersDetails();
  console.log(
    "🚀 ~ file: index_test.js:30 ~ displayPhotographerData ~ informations:",
    informations
  );
  photographerFactories(informations, getElement(".photographer_section"));
};

displayPhotographerData();

// console.log(photographerStore);
// fontion permettant de recupérer les media des photographes
// const getPhotographersMedia = async () => {
//   const { media } = await getPhotographers();
//   console.log("🚀 ~ file: index.js:38 ~ getPhotographersMedia ~ media:", media);
// };

// getPhotographersMedia();
// console.log(photographerStore);
//Function to display the the photographer's data
// async function displayData(photographers) {
//   //select photographers div
//   const photographersSection = getElement(".photographer_section");

//   //
//   photographers.forEach((photographer) => {
//     //use photographerFactory() to display  photographer
//     const photographerModel = photographerFactory(photographer);

//     //retrieve photographerFactory elements with data
//     const userCardDOM = photographerModel.getUserCardDOM();
//     //display photographerFactory elements model with data
//     photographersSection?.appendChild(userCardDOM);
//   });
// }

//Display photographers data using displayData()
// const init = async () => {
//   const photographersData = await getPhotographersDetails();
//   displayData(photographersData);
// };

// init();

const initiative = async () => {
  const photographers = await getPhotographersDetails();
  photographersStore(photographers);
  console.log(photographerInfoStore);
};

initiative();

// console.log(test);
