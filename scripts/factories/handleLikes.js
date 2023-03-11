//HANDLE LIKES

export const handleLikes = (
  likesBtn,
  numberOfLike,
  totalOfLike,
  photographerMedias
) => {
  console.log(
    "🚀 ~ file: handleLikes.js:4 ~ handleLikes ~ likesBtn:",
    likesBtn,
    numberOfLike,
    totalOfLike,
    photographerMedias
  );

  likesBtn.forEach((like) => {
    like.addEventListener("click", () => {
      console.log("Console.log");
      //retrieve the like index
      const likeIndex = like.getAttribute("key");
      console.log(
        "🚀 ~ file: handleLikes.js:22 ~ like.addEventListener ~ likeIndex:",
        likeIndex
      );

      //conditionnal rendering: increase or decrease the like
      if ([...like.classList].includes("count-plus")) {
        like.classList.remove("count-plus");
        like.classList.add("count-moin");

        //increase the number of likes
        let increase = (photographerMedias[likeIndex].likes += 1);

        //display increased likes on screen
        numberOfLike[likeIndex].textContent = increase;
      } else {
        like.classList.add("count-plus");
        like.classList.remove("count-moin");

        //decrease the number of likes
        let decrease = (photographerMedias[likeIndex].likes -= 1);

        //display decreased likes on screen
        numberOfLike[likeIndex].textContent = decrease;
      }

      //calcul new  totalLikes
      const totalLikes = photographerMedias.reduce(
        (accumulator, currentItemValue) => accumulator + currentItemValue.likes,
        0
      );

      //display new  totalLikes
      totalOfLike.innerHTML = totalLikes;
    });
  });
};

//   handleLikes();
