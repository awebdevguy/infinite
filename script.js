/*jshint esversion: 8 */ 

// Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let fetchCount = 5;
let isReady = false;
let numberOfImagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const promise = getPhotos();
promise.then((data) => displayPhotos(data));

// Get photos from Unsplash API
async function getPhotos() {
  try {

    const response = await fetch(`/.netlify/functions/fetch?count=${fetchCount}`);
    console.log("response: " + response);
    // const photosArray = await response.json();
    photosArray = await response.json();
    return photosArray;
    console.log("photosArray: " + photosArray);
    // displayPhotos(photosArray);

  } catch (error) {
    console.log("There was a problem fetching photos: " + error);
  }
}

// Create Elements for Links and Photos, then add to DOM
function displayPhotos(pArray) {
  numberOfImagesLoaded = 0;
  totalImages = pArray.length;
  pArray.forEach(photo => {
    console.log("photo: " + JSON.stringify(photo));
    // create <a></a> link to unsplash photo
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });

    // create <img> image element for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // event listener to check when each photo has loaded
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a></a> then put both inside image-container element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if photos have loaded
function imageLoaded() {
  numberOfImagesLoaded++;

  if (numberOfImagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
    fetchCount = 30;
  }
}

// check to see if scrolling near bottom of page
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
    // reset isReady back to false for next loading of photos
    isReady = false;
    getPhotos();
  }
});