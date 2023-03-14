//modal selector
const modal = document.getElementById("contact_modal");
//form children selector's
// const formData = document.querySelectorAll(".formData");
//input selector's
const form = document.getElementById("form");

//----------------------------------SUBMIT FORM--------------------------------------------------------------

//open the modal
function displayModal() {
  modal.style.display = "block";
}

//close the modal
function closeModal() {
  modal.style.display = "none";
}

//submit the form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //check input validity
  checkInputs();

  //check validation form validity
  validationForm();
});

function checkInputs() {
  //selectors
  const firstname = document.getElementById("first");
  const lastname = document.getElementById("last");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  // use trim() to remove the whitespaces
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const messageValue = message.value.trim();

  firstnameValue === ""
    ? setErrorFor(firstname, "Le prénom ne peut pas être vide")
    : setSuccessFor(firstname);

  lastnameValue === ""
    ? setErrorFor(lastname, "Le nom ne peut pas être vide")
    : setSuccessFor(lastname);

  messageValue === ""
    ? setErrorFor(message, "Le message ne peut pas être vide")
    : setSuccessFor(message);

  emailValue === ""
    ? setErrorFor(email, "L'email ne peut pas être vide")
    : !isValidEmail(emailValue)
    ? setErrorFor(email, "L'email n'est pas valide")
    : setSuccessFor(email);
}

function validationForm() {
  //verify if error classname existe
  const formdataDivs = document.querySelectorAll(".formData");
  let hasSuccess = true;

  for (let i = 0; i < formdataDivs.length; i++) {
    if (!formdataDivs[i].classList.contains("success")) {
      // If a formdata div doesn't have an error class
      hasSuccess = false; // Set hasSuccess to false
      break; // Stop the loop since there's no need to check the rest of the formdata divs
    }
  }

  if (!hasSuccess) {
    console.log("Not All formdata divs have an success class.");
    return;
  } else {
    // console.log("All formdata divs have an success class.")
    modal.style.display = "none";

    //clear input value after submitting form
    const formdataDivs = document.querySelectorAll("form input");
    const formdataTextarea = document.querySelector("form textarea");

    //remove textarea value and success class after  validation
    formdataTextarea.parentElement.className = "formData";
    formdataTextarea.value = "";

    for (let i = 0; i < formdataDivs.length; i++) {
      //clear input value
      formdataDivs[i].value = "";
      //remove sucess class
      formdataDivs[i].parentElement.className = "formData";
    }

    console.log("All Input have been validated");
  }
}

function setErrorFor(input, message) {
  //select parent element of input element witch is the ".form-control"
  const formData = input.parentElement;

  //target small element witch in  ".form-control"
  const small = formData.querySelector("small");

  //add error class
  formData.className = "formData error";

  //add error message in small tag
  small.innerText = message;
  //display error message
  const showError = formData.querySelector(".input-handler");
  showError.style.display = "block";
  //
  const formdataTextarea = document.querySelector("form textarea");
  formdataTextarea.style.marginBottom = "";
}

function setSuccessFor(input) {
  const formData = input.parentElement;

  //add success class
  formData.className = "formData success";

  //target small element witch in  ".form-control"
  // const small = formData.querySelector("small");

  //hidde error message
  const showError = formData.querySelector(".input-handler");
  showError.style.display = "none";

  //console.log input value
  console.log(input.value);
}

function isValidEmail(email) {
  // Use regular expression to validate email
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}
