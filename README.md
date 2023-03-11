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
/* Photographer medias */
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

### 6.photographer rate and price

- factorise information by creating `photographerInformation()`

```js
//individual photographer information
const photographerInformation = async () => {
  //retrieve photographer information
  const photographer = await displayPhotographerdetails(id);

  //  retrieve photographe media
  const photographerMedia = await getPhotographersMedia();

  //   use filter to dispaly all media the photographerId we clicked on
  const photographe = photographerMedia.filter((p) => p.photographerId == id);

  return { photographe, photographer };
};
```

- create `photographerRateAndPrice`, the small insert that displays the daily rate of the photographer

```js
//photographer rate and price
const photographerRateAndPrice = async () => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();

  //calcul photographer totalLikes
  const totalLikes = photographerMediaDetails.reduce(
    (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
    0
  );

  //create rateAndPrice variable to store photographer totalLikes and price
  const rateAndPrice = `
    <ul class="photographer-rate-and-price-container">
    <li class="photographer-rate-and-price-likes">${totalLikes}</li>
    <li class="photographer-rate-and-price-prices">${photographer.price}€ / jour</li>
    </ul>
    `;

  allWork.insertAdjacentHTML("beforeend", rateAndPrice);
  // const newChild = document.createElement("div");
  // newChild.innerHTML = rateAndPrice;

  // const referenceChild = document.querySelector(".photograph-work-content");
  // allWork.insertBefore(newChild, referenceChild.nextSibling);
  // console.log(
  //   "🚀 ~ file: photographer.js:159 ~ photographerRateAndPrice ~ rateAndPrice:",
  //   rateAndPrice
  // );
};

photographerRateAndPrice();
```

- style

```css
/************************************/
/* Photographe rate and price */
/************************************/

.photographer-rate-and-price-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #db8876;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 376px;
  height: 89px;
  font-size: 24px;
  right: 40px;
  top: 90vh;
}

.photographer-rate-and-price-likes span {
  margin-left: 10px;
}
```

## Section 4. Modal

### 7. Create the contact modal

- update [forms](./photographer.html) script

```html
<!-- CONTACT MODAL -->
<div id="contact_modal">
  <div class="modal">
    <!-- conact button -->
    <header class="modal-header">
      <h2>Contactez-moi</h2>
      <img src="assets/icons/close.svg" onclick="closeModal()" />
    </header>
    <!-- forms -->
    <form
      name="reserve"
      action="photographer.html"
      method="get"
      id="form"
      class="form"
    >
      <div class="formData">
        <label for="first">Prénom</label>
        <input
          class="text-control"
          type="text"
          id="first"
          name="first"
          minlength="2"
        />
        <div class="input-handler">
          <br />
          <small></small>
        </div>
      </div>
      <div class="formData">
        <label for="last">Nom</label>
        <input class="text-control" type="text" id="last" name="last" />
        <div class="input-handler">
          <br />
          <small></small>
        </div>
      </div>
      <div class="formData">
        <label for="email">E-mail</label>
        <input class="text-control" type="email" id="email" name="email" />
        <div class="input-handler">
          <br />
          <small></small>
        </div>
      </div>
      <div class="formData">
        <label for="message">Votre message</label>
        <textarea id="message" name="message" class="text-control"></textarea>
        <div class="input-handler">
          <br />
          <small></small>
        </div>
      </div>
      <button type="submit" class="contact_button">Envoyer</button>
    </form>
    <!-- end forms -->
  </div>
</div>
<!-- END OF CONTACT MODAL -->
```

- update [forms](css/photographer.css) styles
- create a `photographerName()`

```js
const photographerName = async () => {
  //retrieve photographer and all media information
  const { photographerMediaDetails, photographer } =
    await photographerInformation();
  const name = `${photographer.name}`;

  const modalContact = document.querySelector(".modal");
  const photographerName = document.createElement("h2");
  photographerName.textContent = name;
  const modalHeader = document.querySelector(".modal-header");
  const nextSiblingElement = modalHeader.nextSibling;
  modalContact.insertBefore(photographerName, nextSiblingElement);
};

photographerName();
```

### 8. Manage Lightbox media

- create lightbox [lightbox](./scripts/pages/photographer.js)

### external links

### 9.View and manage likes

- create [increaseLikes()](scripts/pages/photographer.js) to handle likes

```js
//HANDLE LIKES

async function handleLikes() {
  const { photographerMediaDetails } = await photographerInformation();
  //select all like buttons
  const likes = document.querySelectorAll(".like-btn");
  //select all like numbers
  const photographerLikes = document.querySelectorAll(".photographer-likes");
  //select like and price card witch is on the bottom of the page
  const newTotalLikes = document.querySelector(
    ".photographer-rate-and-price-likes"
  );

  likes.forEach((like) => {
    like.addEventListener("click", async () => {
      //retrieve the like index
      const likeIndex = like.getAttribute("key");

      //conditionnal rendering: increase or decrease the like
      if ([...like.classList].includes("count-plus")) {
        like.classList.remove("count-plus");
        like.classList.add("count-moin");

        //increase the number of likes
        let increase = (photographerMediaDetails[likeIndex].likes += 1);

        //display increased likes on screen
        photographerLikes[likeIndex].textContent = increase;
      } else {
        like.classList.add("count-plus");
        like.classList.remove("count-moin");

        //decrease the number of likes
        let decrease = (photographerMediaDetails[likeIndex].likes -= 1);

        //display decreased likes on screen
        photographerLikes[likeIndex].textContent = decrease;
      }

      //calcul new  totalLikes
      const totalLikes = photographerMediaDetails.reduce(
        (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
        0
      );

      //display new  totalLikes
      newTotalLikes.innerHTML = totalLikes;
    });
  });
}

handleLikes();
```

## Section 5. Filtering

### 10. Create the sorting system

- create a dropdown menu

- [reduce](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## Section 6. Update Project Folder

### 11. install JSON Server

- install json server

```bash
npm i -g json-server
```

- update package.json folder

```js
{
  "name": "fisheye",
  "version": "1.0.0",
  "description": "Hordofel Dusty BAMANA",
  "main": "index.js",
  "scripts": {
    "start": "json-server --watch ./data/photographers.json"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Dusty-Hordofel/FishEye.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Dusty-Hordofel/FishEye/issues"
  },
  "homepage": "https://github.com/Dusty-Hordofel/FishEye#readme"
}

```

### 12. utils file and update photographer photographerFactories function

- add [utils](./scripts/utils/utils.js)

```js
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
  }).format((price / 100).toFixed(2));
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
```

- add [photographer](./scripts/factories/photographer3.js)

```js
import { getStorageItem, setStorageItem } from "../utils/utils.js";

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
```

### 13. get getPhotographersMedias

- get [getPhotographersMedias](./scripts/pages/photographer.js)

```js
//Function to get the photographer's medias
async function getPhotographersMedias() {
  try {
    // fetch all photographers information
    const response = await fetch("http://localhost:3000/media");
    const data = await response.json();
    console.log(
      "🚀 ~ file: photographer.js:7 ~ getPhotographersDetails ~ data:",
      data
    );

    return data;
  } catch (error) {
    console.log(
      "🚀 ~ file: photographer.js:11 ~ getPhotographersDetails ~ error:",
      error
    );
  }
}

getPhotographersMedias();
```

### 13. getPhotographerDetails & photographersMedias

- get [individual photographer medias](./scripts/pages/photographer.js)

```js
// get photographer medias
const getphotographerMediasDetails = (informations, id) => {
  //   use filter to dispaly all media the photographerId we clicked on
  const photographerMediaDetails = informations.filter(
    (p) => p.photographerId == id
  );

  console.log(
    "🚀 ~ file: photographer.js:42 ~ getphotographerMediasDetails ~ informations:",
    photographerMediaDetails
  );
  photographerMediasStore = photographerMediaDetails;
  console.log(
    "🚀 ~ file: photographer.js:43 ~ getphotographerMediasDetails ~ photographerMediasStore:",
    photographerMediasStore
  );

  return photographerMediaDetails;
};
```

- get [individual photographer information](./scripts/pages/photographer.js)

```js
//Gobal photographers Informations variable
let photographerInformations;

//photographerInformation
const getphotographerInformations = (photographersInformation, id) => {
  //get photographer detail using id
  const findPhotographer = photographersInformation.find(
    (photographerInformation) => photographerInformation.id == id
  );
  photographerInformations = findPhotographer;

  return findPhotographer;
};
```

- create [photographersMediasStore](./scripts/pages/photographer.js)

```js
//Global photographers Medias variable
let photographersMediasStore = getStorageItem("photographersMediasStore");

//create photographer medias store
const mediasStore = (medias) => {
  console.log(medias);
  //affecte products to photographersInfoStore
  photographersMediasStore = medias;

  //add photographersInfoStore to the local storage
  setStorageItem("photographersMediasStore", photographersMediasStore);

  return medias;
};
```

### 14. display photographer information in photographer page.

- create [photographer factory](scripts/pages/photographer.js)

```js
//PHOTOGRAPHER PROFILE CARD
const photographerCard = (informations, element) => {
  console.log(
    "🚀 ~ file: photographer.js:26 ~ photographerCard ~ photographerCard:",
    informations,
    element
  );
  const { city, country, id, name, portrait, price, tagline } = informations;

  element.innerHTML = `
    <img src="assets/photographers/${portrait}" alt="photographer profile image"/>
    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    <div class="photograph-description">
    <h1>${name}</h1>
    <p class="location" aria-label="location and country">${city}, ${country}</p>
    <p class="description">${tagline}</p>
  </div>`;
};
```

### 15. create Display Factory to display photographer's medias

- create [displayPhotographerMedia](scripts/factories/displayMedias.js)

```js
//DISPLAY ALL INDIVIDUAL PHOTOGRAPHER MEDIAS

const displayPhotographerMedia = (medias, element, photographer) => {
  //retrieve photographer information
  const { name } = photographer;

  //autoplay muted controls
  element.innerHTML = `
          <ul class= "photograph-work-content">
          ${medias
            .map((media, index) => {
              const { likes, title, video, image, date } = media;
              return ` 
              <li class="photograph-work-container" >
              <${image ? "img" : "video"} src="assets/images/${name}/${
                image ? image : video
              }"

              ${image ? `alt=${title}` : ""}
               ${video ? "muted" : ""} class=${
                image
                  ? "photograph-work-content-img"
                  : "photograph-work-content-video"
              } key="${index}"  ${image ? "/" : ""}> ${image ? "" : "</video>"}
              <div class="photograph-work-content-description">
              <h2>${title}</h2>
              <div class="photograph-work-content-description-likes">
              <p class="photographer-likes" >${likes}</p>
              <button class="like-btn count-plus" key="${index}"><i class="fa-solid fa-heart count-plus" ></i></button>
              </div>
              </div>
              </li>`;
            })
            .join("")}
                </ul>
                `;
};

export { displayPhotographerMedia };
```

### 16. create Filter menu

- create a filter [menu](scripts/filters/menu.js)

```js
import { getElement } from "../utils/utils.js";

//select selectors
const select = getElement(".select");
const caret = getElement(".caret");
const menu = getElement(".menu");
const options = document.querySelectorAll(".menu li");
const selected = getElement(".selected");

//FILTER MENU
select.addEventListener("click", () => {
  console.log("first");
  //add the clicked selected style to the selected element
  select.classList.toggle("select-clicked");
  //add rotate style to the caret element
  caret.classList.toggle("caret-rotate");
  //add open style to the menu element
  menu.classList.toggle("menu-open");
});

//loop through  all option elements
options.forEach((option) => {
  //add click envent to the option element
  option.addEventListener("click", () => {
    //change selected inner text to clicked option inner text
    selected.innerText = option.innerText;
    //Add the clicked select styles to the select element
    select.classList.remove("select-clicked");
    //remove the rotate style to the caret element
    caret.classList.remove("caret-rotate");
    //add the open style to the menu element
    menu.classList.remove("menu-open");
    //remove active class for all options elements
    options.forEach((option) => {
      option.classList.remove("active");
    });
    //add active class to clicked option element
    option.classList.add("active");
  });
});
```

### 17. Sort using Filter menu

- sort By [popularity](scripts/filters/filter.js)

```js
const sortMediaByPopularity = (photographerMedias) => {
  //sort photographerMedias By Likes
  const sortByLikes = photographerMedias.sort((a, b) => b.likes - a.likes);
  displayPhotographerMedia(
    sortByLikes,
    getElement(".photograph-work"),
    photographerInformations
  );
};
```

- sort By [Date](scripts/filters/filter.js)

```js
const sortMediaByDates = (photographerMedias) => {
  //sort photographerMedias By Likes
  const sortTitles = photographerMedias.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  displayPhotographerMedia(
    sortTitles,
    getElement(".photograph-work"),
    photographerInformations
  );
};
```

- sort By [Titre](scripts/filters/filter.js)

```js
const sortMediaByTitles = (photographerMedias) => {
  //sort photographerMedias By Likes
  const sortTitles = photographerMedias.sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  displayPhotographerMedia(
    sortTitles,
    getElement(".photograph-work"),
    photographerInformations
  );
};
```

### 17. fullScreen Factory

- update [displayMedia](./scripts/factories/displayMedias.js)

```js
//DISPLAY ALL INDIVIDUAL PHOTOGRAPHER MEDIAS
import { fullScreenMedia } from "./fullScreen.js";

const displayPhotographerMedia = (medias, element, photographer) => {
  //retrieve photographer information
  const { name } = photographer;

  //autoplay muted controls
  element.innerHTML = `
          <ul class= "photograph-work-content">
          ${medias
            .map((media, index) => {
              const { likes, title, video, image, date } = media;
              return ` 
              <li class="photograph-work-container" >
              <${image ? "img" : "video"} src="assets/images/${name}/${
                image ? image : video
              }"

              ${image ? `alt=${title}` : ""}
               ${video ? "muted" : ""} class="photographer-medias" 
               id=${
                 image ? "photograph-content-img" : "photograph-content-video"
               } key="${index}"  ${image ? "/" : ""}> ${image ? "" : "</video>"}
              <div class="photograph-work-content-description">
              <h2>${title}</h2>
              <div class="photograph-work-content-description-likes">
              <p class="photographer-likes" >${likes}</p>
              <button class="like-btn count-plus" key="${index}"><i class="fa-solid fa-heart count-plus" ></i></button>
              </div>
              </div>
              </li>`;
            })
            .join("")}
                </ul>
                `;

  const mediasContent = document.querySelectorAll(".photographer-medias");
  mediasContent.forEach((media) => {
    media.addEventListener("click", () => {
      // get the media index from the media-id attribute
      let mediaIndex = media.getAttribute("key");
      console.log(
        "🚀 ~ file: displayMedias.js:41 ~ media.addEventListener ~ mediaIndex:",
        mediaIndex
      );
      //display content of  selected media
      let selectedMedia = medias[mediaIndex];
      fullScreenMedia(selectedMedia, name);
      console.log(
        "🚀 ~ file: displayMedias.js:48 ~ media.addEventListener ~ selectedMedia:",
        selectedMedia
      );
    });
  });
};

export { displayPhotographerMedia };
```

- Create Display [fullScreen](./scripts/factories/fullScreen.js)

```js
export const fullScreenMedia = (media, name) => {
  //retrieve individual photographer media information
  const { date, id, likes, photographerId, title, video, image } = media;

  console.log("🚀 ~ file: fullScreen.js:4 ~ fullScreenMedia ~ olivier:", media);
  //create a div element for the selected media
  let fullScreenMedia = document.createElement("div");
  //add "full-screen-media" for selected media
  fullScreenMedia.classList.add("full-screen-media");

  //add html script in fullScreenMedia div element
  fullScreenMedia.innerHTML = `
<div class="full-screen-modal">
<i class="fa-solid fa-chevron-left slider-icon"></i>
${
  image
    ? `
    <img
      src="assets/images/${name}/${image}"
      class="photograph-work-content-img-modal hide"
      alt="photograph work presentation"
      id="photograph-work-img"
    />`
    : `<video
    src="assets/images/${name}/${video}"
    class="photograph-work-content-img-modal hide"
    id="photograph-work-video"
    autoplay muted controls
  /></video>`
}
<i class="fa-solid fa-chevron-right slider-icon"></i>
<button class="close-button">
<i class="fa-solid fa-xmark media-close-icon slider-icon"></i>
</button>
</div>`;

  // add event listener to the close button to remove the full screen element
  fullScreenMedia
    .querySelector(".close-button")
    .addEventListener("click", function () {
      fullScreenMedia.remove();
    });

  // add the full screen element to the document
  document.body.appendChild(fullScreenMedia);
};
```

- use [fiters function](./scripts/pages/photographer.js)

```js
//Filter Photographer Medias By Popularity
getElement("#popularite").addEventListener("click", () => {
  sortMediaByPopularity(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});

//Filter Photographer Medias By Titles
getElement("#titre").addEventListener("click", () => {
  sortMediaByTitles(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});

//Filter Photographer Medias By Date
getElement("#date").addEventListener("click", () => {
  sortMediaByDates(
    photographerMediasStore,
    getElement(".photograph-work"),
    photographerInformations
  );
});
```

### 18. scroll through all the media

- create [leftArrow](./scripts/factories/slide.js)

```js
const leftArrow = (
  photographerMedias,
  selectedMedia,
  index,
  name,
  fullScreenMedia,
  imageElement,
  videoElement
) => {
  console.log("🚀 ~ file: slide.js:13 ~ name:", name);
  const arrowLeft = document.querySelector(".fa-chevron-left");
  const imageModal = fullScreenMedia.querySelector(
    ".photograph-work-content-img-modal"
  );

  console.log("🚀 ~ file: slide.js:25 ~ videoElement:", videoElement);
  console.log("🚀 ~ file: slide.js:26 ~ imageElement:", imageElement);

  console.log("🚀 ~ file: slide.js:28 ~ imageModal:", imageModal);

  console.log(
    "🚀 ~ file: slide.js:8 ~ leftArrow ~ index:",
    index,
    photographerMedias
  );

  arrowLeft.addEventListener("click", () => {
    index--;
    console.log(
      "🚀 ~ file: slide.js:26 ~ arrowLeft.addEventListener ~ selectedMedia:",
      index
    );

    if (index < 0) {
      index = photographerMedias.length - 1;
    }

    selectedMedia = photographerMedias[index];
    console.log(
      "🚀 ~ file: slide.js:42 ~ arrowLeft.addEventListener ~ selectedMedia:",
      selectedMedia.image
    );

    console.log(fullScreenMedia);

    console.log(
      "🚀 ~ file: photographer.js:49 ~ arrowLeft.addEventListener ~ selectedMedia:",
      imageModal.src.includes(".jpg")
    );
    // imageModal.src.includes(".jpg")
    if (selectedMedia.image) {
      //Element to be hidden
      videoElement.classList.add("hide");
      //Element to be added
      imageElement.classList.remove("hide");
      imageElement.src = `assets/images/${name}/${selectedMedia.image}`;
    } else {
      //Element to be hidden
      imageElement.classList.add("hide");
      //Element to be added
      videoElement.classList.remove("hide");
      videoElement.src = `assets/images/${name}/${selectedMedia.video}`;
    }
  });
};

export { leftArrow };
```

- create [rightArrow](./scripts/factories/slide.js)

```js
const rightArrow = (
  photographerMedias,
  selectedMedia,
  index,
  name,
  fullScreenMedia,
  imageElement,
  videoElement
) => {
  const arrowRight = document.querySelector(".fa-chevron-right");

  arrowRight.addEventListener("click", () => {
    index++;

    if (index >= photographerMedias.length) {
      index = 0;
    }

    selectedMedia = photographerMedias[index];

    console.log(fullScreenMedia);

    if (selectedMedia.image) {
      //Element to be hidden
      videoElement.classList.add("hide");
      //Element to be added
      imageElement.classList.remove("hide");
      imageElement.src = `assets/images/${name}/${selectedMedia.image}`;
    } else {
      //Element to be hidden
      imageElement.classList.add("hide");
      //Element to be added
      videoElement.classList.remove("hide");
      videoElement.src = `assets/images/${name}/${selectedMedia.video}`;
    }
  });
};

export { rightArrow };
```

- use [leftArrow & rightArrow](./scripts/filters/filter.js) in [fullscreen](./scripts/factories/fullScreen.js)

```js
import { leftArrow, rightArrow } from "./slide.js";
import { individualMedia } from "../pages/photographer.js";
import { getElement, getAllElement } from "../utils/utils.js";

export const fullScreenMedia = (
  media,
  name,
  mediaIndex,
  allPhotographerMedias
) => {
  //retrieve individual photographer media information
  const { date, id, likes, photographerId, title, video, image } = media;

  //get elements
  const imageElement = getElement(".photograph-work-img");
  const videoElement = getElement(".photograph-work-video");
  const fullScreenMedia = getElement(".full-screen-media");

  if (image) {
    //Element to be hidden
    videoElement.classList.add("hide");
    //Element to be added
    imageElement.classList.remove("hide");
    imageElement.src = `assets/images/${name}/${image}`;
  } else {
    //Element to be hidden
    imageElement.classList.add("hide");
    //Element to be added
    videoElement.classList.remove("hide");
    videoElement.src = `assets/images/${name}/${video}`;
  }

  //   display full screen Media
  fullScreenMedia.classList.remove("hide");

  // add event listener to the close button to remove the full screen element
  fullScreenMedia
    .querySelector(".close-button")
    .addEventListener("click", function () {
      //  hide full screen Media
      fullScreenMedia.classList.add("hide");
    });

  console.log(fullScreenMedia);
  // left arrow
  leftArrow(
    allPhotographerMedias,
    media,
    mediaIndex,
    name,
    fullScreenMedia,
    imageElement,
    videoElement
  );
  //right arrow
  rightArrow(
    allPhotographerMedias,
    media,
    mediaIndex,
    name,
    fullScreenMedia,
    imageElement,
    videoElement
  );
};
```

### 19.
