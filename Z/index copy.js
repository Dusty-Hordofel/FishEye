//recupère les données des photographes

async function getPhotographers() {
  // fetch all photographers information
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    console.log("🚀 ~ file: index.js:7 ~ getPhotographers ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:21 ~ getPhotographers ~ error", error);
  }
}

console.log("🚀 ~ file: index.js:21 ~ getPhotographers ~ ", getPhotographers());

//Function to get the details of the photographers
async function getPhotographersDetails() {
  //retrieve photographers data from getPhotographers(): photographers and medias
  const { photographers } = await getPhotographers();
  // photographerStore = photographers;

  console.log(
    "🚀 ~ file: index.js:19 ~ getPhotographersDetails ~ photographers:",
    Array.isArray(photographers)
  );

  return photographers;
}

// console.log(photographerStore);
// fontion permettant de recupérer les media des photographes
// const getPhotographersMedia = async () => {
//   const { media } = await getPhotographers();
//   console.log("🚀 ~ file: index.js:38 ~ getPhotographersMedia ~ media:", media);
// };

// getPhotographersMedia();
// console.log(photographerStore);
//Function to display the the photographer's data
async function displayData(photographers) {
  //select photographers div
  const photographersSection = document.querySelector(".photographer_section");

  //
  photographers.forEach((photographer) => {
    //use photographerFactory() to display  photographer
    const photographerModel = photographerFactory(photographer);

    //retrieve photographerFactory elements with data
    const userCardDOM = photographerModel.getUserCardDOM();
    //display photographerFactory elements model with data
    photographersSection?.appendChild(userCardDOM);
  });
}

//Display photographers data using displayData()
const init = async () => {
  const photographersData = await getPhotographersDetails();
  displayData(photographersData);
};

init();

const initiative = async () => {
  const photographers = await getPhotographersDetails();
  photographersStore(photographers);
  console.log(test);
};

initiative();

// console.log(test);
