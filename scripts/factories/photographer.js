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
