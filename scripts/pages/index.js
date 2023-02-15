//recupère les données des photographes
async function getPhotographers() {
  // fetch all photographers information
  try {
    const response = await fetch("../../data/photographers.json");
    const data = await response.json();
    const { photographers, media } = data;
    console.log(
      "🚀 ~ file: index.js:42 ~ getPhotographers ~ data",
      photographers,
      media
      // data.photographers
    );
    // et bien retourner le tableau photographers seulement une fois récupéré
    return {
      photographers: [...photographers],
    };
  } catch (error) {
    console.log("🚀 ~ file: index.js:21 ~ getPhotographers ~ error", error);
  }
}

//fontion permettant d'afficher les données
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    console.log(
      "🚀 ~ file: index.js:47 ~ photographers.forEach ~ photographerModel",
      photographerModel
    );
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

//récupérer les données et afficher les photographes
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log("🚀 ~ file: index.js:64 ~ init ~ photographers", photographers);
  displayData(photographers);
}

init();
