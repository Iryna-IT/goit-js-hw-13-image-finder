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
      const galleryListRef = document.querySelectorAll(".gallery");
      const countGalleryList = galleryListRef.length;
      const targetGalleryListRef = galleryListRef.[countGalleryList - 1];
      // console.log(galleryListRef);
      // console.log(countGalleryList);
      // console.log(galleryItemRef);
      targetGalleryListRef.insertAdjacentHTML('beforeend', photoCard);
       
      // function zoomImg(event) {
      //   const targetImg = event.target;
      //   const newSrc = targetImg.dataset.url;
        
      // }

      // const imgRef = document.querySelectorAll("img");
      // Array.prototype.map.call(imgRef,
      //   function (obj) {
      //     obj.addEventListener('click', zoomImg);
      //   });
          
          if (data.total > 12) {
            loadButtonRef.style.display = 'inline';
          }
    }
        
       else {
        inputRef.value = "";
      error ({
  text: "Nothing found. Please, enter a correct query"
});
      return error;
    }
  }).catch(error => console.log(error))
}

// let scrollHeight = document.querySelector(".gallery").offsetHeight; 
// console.log(scrollHeight)


function loadImages(event) {
pageNumber += 1;
  searchQuery = inputRef.value;
  renderGallery(event);


  function currentYPosition() {
    if (self.pageYOffset) return self.pageYOffset;
    return 0;
}

  function elmYPosition() {
    let y = loadButtonRef.offsetTop - 20;
    let node = document.querySelector(".gallery");
    console.log(y);
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    } return y;
}

function smoothScroll() {
    const startY = currentYPosition();
    const stopY = elmYPosition();
    const distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( let i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( let i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
  smoothScroll();
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
