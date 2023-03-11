//PHOTOGRAPHER RATE AND PRICE
export const photographerRateAndPrice = (
  allmedias,
  photographerInformation,
  allWorkSelector
) => {
  //retrieve photographer and all media information
  //   const { allmedias, photographer } =
  //     await photographerInformation();

  //calcul photographer totalLikes
  const totalLikes = allmedias.reduce(
    (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
    0
  );

  //create rateAndPrice variable to store photographer totalLikes and price
  const rateAndPrice = `
      <ul class="photographer-rate-and-price-container">
      <li class="photographer-rate-and-price-likes">${totalLikes}<span><i class="fa-solid fa-heart"></i></span></li>
      <li class="photographer-rate-and-price-prices">${photographerInformation.price}€ / jour</li>
      </ul>
      `;

  allWorkSelector.insertAdjacentHTML("beforeend", rateAndPrice);
};
