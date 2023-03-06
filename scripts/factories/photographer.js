window.myGlobalVar;

function photographerFactory(data) {
  window.myGlobalVar = data;
  const { name, portrait, id, tagline, city, price, country } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    //article
    const article = document.createElement("article");

    //use article as a child of an anchor element
    let link = document.createElement("a");
    // Set the href attribute of the anchor element to the link URL
    link.href = `photographer.html?id=${id}`;

    //image
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photographer profile image");
    //name
    const h2 = document.createElement("h2");
    h2.textContent = name;

    //Append the h2 & image element as a child of the anchor element
    link.appendChild(img);
    link.appendChild(h2);

    //location
    const location = document.createElement("p");
    location.classList.add("location");
    location.textContent = `${city}, ${country}`;
    location.setAttribute("aria-label", "location and country");

    //description
    const description = document.createElement("p");
    description.textContent = tagline;
    description.classList.add("description");

    //price
    const fees = document.createElement("p");
    fees.classList.add("price");
    fees.textContent = `${price}€/jour`;

    //append child to article
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(fees);

    return article;
  }

  return { name, picture, getUserCardDOM };
}

let test;
const photographersStore = (products) => {
  console.log(products);
  test = products;

  return products;
};

console.log(window.myGlobalVar);
