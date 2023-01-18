
const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirm = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader')


// NASA API 
const apiKey = 'gF2xzPXhYu8QNiFG9L6dG0HRDakOBNrbabyqgqgl';
const apiCount = 10;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${apiCount}`;

let resultsArray = [];
let favorites = {}; //using object instead of array - easier way for delte based on key

function createDOMNodes(page) {
  const currentArray = page === 'results' ? resultsArray : Object.values(favorites);
  currentArray.forEach((result) => {
    // Card Container
    const card = document.createElement('div');
    card.classList.add('card');
    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';
    // Image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the DAY';
    image.loading = 'lazy'; // lazy loading, images will be loaded one by one not all at the time
    image.classList.add('card-image-top');
    // Card Body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    // Card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    // Save Text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add To Favorites';
    saveText.setAttribute('onclick', `saveFavorites('${result.url}')`); 
    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;
    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');
    // Date
    const date = document.createElement('strong');
    date.textContent = result.date;
    // Copyright
    const copyright = document.createElement('span');
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    copyright.textContent = ` ${copyrightResult}`;

    // Append elements to the card container 
    // append if more than one elements to append | append child if only one element to append.
    // (from bottom to the top) 
    footer.append(date, copyright); //passing elements in the right order
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);

    // Append elements to the images container
    imagesContainer.appendChild(card);

  });
}

function updateDOM(page) {
  // Get Favorites from localStorage
  if(localStorage.getItem('nasaFavorites')) {
    favorites = JSON.parse(localStorage.getItem('nasaFavorites'));
  }

  createDOMNodes(page);

}

// Get 10 images from NASA API
async function getNasaPictures() {
  try {
    const response = await fetch(apiUrl);
    resultsArray = await response.json();
    
    updateDOM('favorites');

  } catch (error) {
    // Catch Error Here
    console.log(error);
  }
}

// Add result to Favorites
function saveFavorites(itemUrl) {
  // Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if(item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation for 2 Seconds 
      saveConfirm.hidden = false;
      setTimeout(() => {
        saveConfirm.hidden = true;
      }, 2000)
      // Set Favorites to local storage
      localStorage.setItem('nasaFavorites', JSON.stringify(favorites));
    }
  });
}

// On Load
getNasaPictures();