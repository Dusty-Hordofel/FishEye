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
