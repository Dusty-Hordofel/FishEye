import { getElement, getAllElement } from "../utils/utils.js";

import { fullScreenMedia } from "../factories/fullScreen.js";

import { photographerMediasStore } from "../factories/photographer.js";
console.log(
  "🚀 ~ file: menu.js:4 ~ photographerMediasStore:",
  photographerMediasStore
);

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

// console.log(photographerMediasStore);
