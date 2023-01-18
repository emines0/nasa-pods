


// NASA API 
const apiKey = 'gF2xzPXhYu8QNiFG9L6dG0HRDakOBNrbabyqgqgl';
const apiCount = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${apiCount}`;

let resultsArray = [];

// Get 10 images from NASA API

async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    
    console.log(resultsArray);

  } catch (error) {
    // Catch Error Here
    console.log('Error!: ') + error;
  }
}

getNasaPictures();