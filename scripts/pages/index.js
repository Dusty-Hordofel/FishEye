//recupère les données des photographes
async function getPhotographers() {
  // fetch all photographers information
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:21 ~ getPhotographers ~ error", error);
  }
}

//fonction permettant de récupérer les details des photographes
async function getPhotographersDetails() {
  const { photographers } = await getPhotographers();
  return photographers;
  // console.log(
  //   "🚀 ~ file: index.js:26 ~ getPhotographersDetails ~ photographers:",
  //   photographers
  // );
}

// fontion permettant de recupérer les media des photographes
// const getPhotographersMedia = async () => {
//   const { media } = await getPhotographers();
//   console.log("🚀 ~ file: index.js:38 ~ getPhotographersMedia ~ media:", media);
// };

// getPhotographersMedia();

//fontion permettant d'afficher les données
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    // console.log(
    //   "🚀 ~ file: index.js:47 ~ photographers.forEach ~ photographerModel",
    //   photographerModel
    // );
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection?.appendChild(userCardDOM);
  });
}

//afficher les données des photographes
const init = async () => {
  displayData(await getPhotographersDetails());
};

init();
