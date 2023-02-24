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

  //select photograph section
  const main = document.querySelector(".photograph-header");
  const header = document.querySelector("header");
  const logo = document.querySelector(".logo");

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
  img.setAttribute("alt", "photographer profile image");

  //create div element in main section
  const divElement = document.createElement("div");

  //add photograph-description  to main section
  divElement.classList.add("photograph-description");

  //photographer name
  const h2 = document.createElement("h2");
  h2.textContent = photographer.name;

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
  divElement.appendChild(h2);
  divElement.appendChild(location);
  divElement.appendChild(description);

  //add image and divElement to main section
  main.appendChild(img);
  main.appendChild(divElement);

  //add link to a logo
  header.appendChild(link);

  //select photograph-main children
  var buttonChild = main.children[0];
  var h2TitleChild = main.children[2];
  //insert h2 title before the button
  main.insertBefore(h2TitleChild, buttonChild);
}

createIndividualPhotographerCard();

//display all media information
const displayPhotographerMedia = async (id) => {
  //   console.log(await getPhotographersMedia());
  const photographerMedia = await getPhotographersMedia();
  console.log(
    "🚀 ~ file: photographer.js:62 ~ displayPhotographerMedia ~ photographerMedia:",
    photographerMedia
  );

  //   use filter to dispaly all media the photographerId we clicked on
  const photographe = photographerMedia.filter((p) => p.photographerId == id);
  //   const photographe = photographerMedia.find((p) => p.photographerId == id);
  console.log(
    "🚀 ~ file: photographer.js:70 ~ displayPhotographerMedia ~ photographe:",
    photographe
  );
};

//display photographer media
displayPhotographerMedia(id);
