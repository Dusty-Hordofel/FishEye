//PHOTOGRAPHER RATE AND PRICE
export const photographerRateAndPrice = (
  allmedias,
  photographerInformation,
  allWorkSelector
) => {
  //calcul photographer totalLikes
  const totalLikes = allmedias.reduce(
    (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
    0
  );

  //create rateAndPrice variable to store photographer totalLikes and price
  const rateAndPrice = `
      <div class="photographer-rate-and-price-container" tabindex="0">
      <div class="photographer-rate-and-price-likes" tabindex="0">${totalLikes}<span><i class="fa-solid fa-heart"></i></span></div>
      <div class="photographer-rate-and-price-prices" tabindex="0">${photographerInformation.price}€ / jour</div>
      </div>
      `;

  allWorkSelector.insertAdjacentHTML("beforeend", rateAndPrice);
};
