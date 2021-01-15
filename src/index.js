import './styles.css';
import './js/apiService.js';

// import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

import fetchGallery from './js/fetchGallery.js';
import galleryTemplate from './templates/gallery.hbs';
import photoCardTemplate from './templates/photoCard.hbs';

const debounce = require('lodash.debounce');

const inputRef = document.querySelector('input');
const galleryRef = document.querySelector(".gallery-wrapper");
const loadButtonRef = document.querySelector(".load-images");




inputRef.addEventListener('input', debounce(renderGallery, 500));
loadButtonRef.addEventListener('click', loadImages);


// Lightbox для показа больших изображений по клику
// document.querySelector('button.image').onclick = () => {
// 	basicLightbox.create(`
// 		<img width="1400" height="900" src="https://placehold.it/1400x900">
// 	`).show()}

const key = '19878712-8b5821339c38877bcf5918ddb';
let pageNumber = 1;
let searchQuery = inputRef.value;


function renderGallery(event) {
  if (searchQuery === "") {
    // galleryRef.innerHTML = "";
    searchQuery = event.target.value;
  }

  fetchGallery(key, pageNumber, searchQuery).then(data => {
    const photoCard = photoCardTemplate(data.hits);
    const gallery = galleryTemplate(data.hits);
    // const limit = data.totalHits;
    // console.log(data);
      
      if (data.total >= 1) {
        galleryRef.insertAdjacentHTML('beforeend', gallery);
        const galleryItemRef = document.querySelectorAll(".gallery");

        Array.prototype.map.call(galleryItemRef,
          function (obj) {
            obj.insertAdjacentHTML('beforeend', photoCard);
          
            if (data.total > 12) {
              loadButtonRef.style.display = 'inline';
            }
  })
        
      } else {
        inputRef.value = "";
      error ({
  text: "Nothing found. Please, enter a correct query"
});
      return error;
    }
  }).catch(error => console.log(error))
}

function loadImages(event) {
  pageNumber += 1;
  searchQuery = inputRef.value;
  // renderGallery(event);
  // console.log(searchQuery);
}




// ==============================================================
        
      //       if (galleryRef !== "") {
      //   const galleryItemRef = document.querySelectorAll(".gallery-item");
      //   Array.prototype.map.call(galleryItemRef,
      //   function (obj) {obj.addEventListener('click', renderNewGallery); })
      //   function renderNewGallery(event) {
      //     galleryRef.innerHTML="";
      //     searchQuery = event.currentTarget.textContent;

      //   fetchGallery(searchQuery).then(data => {
      //     // const photoCard = photoCardTemplate(data.hits);
      //     galleryRef.insertAdjacentHTML('beforeend', photoCard);
      //     searchQuery = "";
      //   })
      // };
      //   }
      





// function renderGallery(event) {
//   galleryRef.innerHTML = "";
//   let searchQuery = event.target.value;

//     fetchGallery(searchQuery).then(data => {
//     const photoCard = photoCardTemplate(data.hits);
//     const gallery = galleryTemplate(data.hits);
//       if (!data.hits) {
//       error({
//   text: "Type your request!"
//       });
//       return error;
//     } else if (data.hits.length === 1) {
//       galleryRef.insertAdjacentHTML('beforeend', photoCard);
//       inputRef.value = "";
//     }else if (data.hits.length >= 2) {
//       galleryRef.insertAdjacentHTML('beforeend', gallery);

//       if (galleryRef !== "") {
//         const galleryItemRef = document.querySelectorAll(".gallery-item");
//         Array.prototype.map.call(galleryItemRef,
//         function (obj) {obj.addEventListener('click', renderNewGallery); })
//         function renderNewGallery(event) {
//           galleryRef.innerHTML="";
//           searchQuery = event.currentTarget.textContent;

//         fetchGallery(searchQuery).then(data => {
//           const photoCard = photoCardTemplate(data.hits);
//           galleryRef.insertAdjacentHTML('beforeend', photoCard);
//           searchQuery = "";
//         })
//       };
//         }
//     } else {
//       const alertNotification = alert({
//   text: "Nothing found. Please, enter a more specific query"
// });
//       return alertNotification;
//     }
//   }).catch(error => console.log(error))
// }
