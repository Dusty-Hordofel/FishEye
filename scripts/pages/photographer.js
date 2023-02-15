//Mettre le code JavaScript lié à la page photographer.html

// console.log(" olomide");

// class Cat {
//   //constructor qui detient les properties du futur objet qui sont liés aux parametre du constructeur
//   constructor(race, couleur, age) {
//     this.race = race;
//     this.couleur = couleur;
//     this.age = age;
//   }
//   //methode calin -- une methode est une fonction dans un objet
//   // calin est la fonction liée aux objets qu'on va créer avec cette classe
//   calin() {
//     console.log(`vous avez caliner votre ${this.race}`);
//   }
// }

// const chat = new Cat("Siamois", "gris", 8);
// console.log("🚀 ~ file: photographer.js:20 ~ chat", chat);
// const chat2 = chat.calin();

//factory function avec les closures
function createACat(race, couleur, age) {
  function calin() {
    console.log(`vous avez caliner votre ${race}`);
  }
  return {
    race,
    couleur,
    age,
    calin,
  };
}

const chat1 = createACat("chien", "grey", 9);
const chat2 = createACat("Lyon", "yellow", 19);
console.log(chat1, chat1.calin());
console.log(chat2, chat2.calin());
