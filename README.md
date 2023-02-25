# CORP COMMENT - Accommodations and Activities Website

### Author Links

👋 Hello, I'm Hordofel Dusty BAMANA.

👇 Follow Me:

- [Twitter](https://twitter.com/hordofel)
- [LinkedIn](https://www.linkedin.com/in/dusty-hordofel-bamana-08389310a)

---

### 🚀 Description

rmtDev comment .....

---

# Directive du projet GameOn

1. Forkez ce repo ;
2. Il est conseillé d'utiliser VisualStudio Code et vous pouvez utiliser Docker, mais ce n'est pas obligatoire ;
3. Il n'y a aucune dépendance ;
4. Vous ne devez utiliser que du CSS personnalisé et du JavaScript pur, sans jQuery, Bootstrap ou autre librairie.

---

# issues à prendre en compte

1. Ajouter confirmation quand envoi réussi

- Après une validation réussie, inclure un message de confirmation de la soumission réussie pour l'utilisateur (ex. "Merci ! Votre réservation a été reçue.")

2. Ajouter validation ou messages d'erreur
   Des messages d'erreur spécifiques doivent apparaître sous l'entrée qui n'est pas correcte. Les messages d'erreur doivent s'afficher sous le champ de saisie associé. Exemples :

   - "Veuillez entrer 2 caractères ou plus pour le champ du nom."
   - "Vous devez choisir une option."
   - "Vous devez vérifier que vous acceptez les termes et conditions."
   - "Vous devez entrer votre date de naissance."

3. Implémenter entrées du formulaire

- (1) Lier les labels aux entrées dans le HTML en utilisant les attributs "for" et "id" dans le code existant. Corriger le code HTML quand nécessaire.
- (2) Utiliser du JavaScript pur (pas de jQuery) pour terminer le formulaire :

  - Le formulaire doit être valide quand l'utilisateur clique sur "Submit"
  - Les données doivent être saisies correctement :
    - (1) Le champ Prénom a un minimum de 2 caractères / n'est pas vide.
    - (2) Le champ du nom de famille a un minimum de 2 caractères / n'est pas vide.
    - (3) L'adresse électronique est valide.
    - (4) Pour le nombre de concours, une valeur numérique est saisie.
    - (5) Un bouton radio est sélectionné.
    - (6) La case des conditions générales est cochée, l'autre case est facultative / peut être laissée décochée.
  - Conserver les données du formulaire (ne pas effacer le formulaire) lorsqu'il ne passe pas la validation.

4. TODO : fermer la modale

- Ajouter la fonctionnalité au bouton (x)

---

## Demo

![Corp_Comment Desktop Demo](./images/maquettes/Desktop.png "Desktop Demo")
![Corp_Comment Tablet Demo](./images/maquettes/Tablet.png "Tablet Demo")

---

## Section 1. Setup

---

### 1. import Project from GitHub

- clone a github repository named `https://github.com/OpenClassrooms-Student-Center/Front-End-Fisheye.git`
- understand and test all scripts in the project
- create a setup branch `Setup` in github repository to save the setup folder structure

---

## Section 2. Import Data

### 2. fetch data from JSON file

- Add fetch in the getPhotographers function to get your datas, and make a console.log of these datas, return the datas

```js
/recupère les données des photographes
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

```

- Modify `scripts/factories/Photographer.js` to get the necessary data (id, tagline, city, etc)

```js
function photographerFactory(data) {
  const { name, portrait, id, tagline, city, price, country } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const location = document.createElement("p");
    location.textContent = `${city}, ${country}`;
    const description = document.createElement("p");
    description.textContent = tagline;
    const fees = document.createElement("p");
    fees.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(fees);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
```

---

## Section 3. Integrate the homepage

### 3. Integrate the homepage

## Section 4. Manage the navigation between the home page and the photographer page

### 4. create photographer card

```js
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
  img.setAttribute("alt", "photographer profile");

  //create div element in main section
  const divElement = document.createElement("div");

  //add photograph-description  to main section
  divElement.classList.add("photograph-description");

  //photographer name
  const h1 = document.createElement("h1");
  h1.textContent = photographer.name;

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
  divElement.appendChild(h1);
  divElement.appendChild(location);
  divElement.appendChild(description);

  //add image and divElement to main section
  main.appendChild(img);
  main.appendChild(divElement);

  //add link to a logo
  header.appendChild(link);

  //select photograph-main children
  var buttonChild = main.children[0];
  var h1TitleChild = main.children[2];
  //insert h2 title before the button
  main.insertBefore(h1TitleChild, buttonChild);
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
```

### 5.Display the static content of the photographer page

- add contionnal rendering for image or video

```js
//display all media information
const displayPhotographerMedia = async (id) => {
  //retrieve photographer information
  const photographer = await displayPhotographerdetails(id);

  //  retrieve photographe media
  const photographerMedia = await getPhotographersMedia();

  //   use filter to dispaly all media the photographerId we clicked on
  const photographe = photographerMedia.filter((p) => p.photographerId == id);

  const medias = `
    <ul class= "photograph-work-content">
    ${photographe
      .map(
        (work) =>
          `<li class="photograph-work-content-img">
         <${work.image ? "img" : "video"} src="assets/images/${
            photographer.name
          }/${work.image ? work.image : work.video}" alt=${
            work.image ? "photograph work presentation" : "#"
          } ${
            work.video ? "autoplay muted controls" : "#"
          } class="photograph-work-content-img"></${
            work.image ? "img" : "video"
          }>  
          <div class="photograph-work-content-description">
          <h2>${work.title}</h2>
          <div class="photograph-work-content-description-likes">
          <p>${work.likes}</p>
          <span><i class="fa-solid fa-heart"></i></span>
          </div>
          </div>
          </li>`
      )
      .join("")}
          </ul>
          `;
  allWork.insertAdjacentHTML("beforeend", medias);
};

//display photographer media
displayPhotographerMedia(id);
```

-style medias section

```css
/************************************/
/* Photographe medias */
/************************************/

.photograph-work {
  /* background: #901c1c; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 100px;
}
.photograph-work-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: 90px;
}
.photograph-work-content-img {
  width: 330px;
  height: 300px;
  list-style-type: none;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  object-fit: cover;
}

.photograph-work-content-description {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  color: #901c1c;
}

.photograph-work-content-description h2 {
  font-size: 24px;
}

.photograph-work-content-description-likes {
  display: flex;
  align-items: center;
}
.photograph-work-content-description-likes span {
  display: block;
  margin-left: 0.6rem;
}
```
