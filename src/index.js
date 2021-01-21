import './styles.css';
import '../node_modules/basicLightbox/dist/basicLightbox.min.css'

import fetchGallery from './js/apiService.js';
import galleryTemplate from './templates/gallery.hbs';
import photoCardTemplate from './templates/photoCard.hbs';


// ===============НАСТРОЙКИ БИБЛИОТЕК=================
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

// import * as basicLightbox from 'basiclightbox';
const basicLightbox = require('basiclightbox');
const debounce = require('lodash.debounce');


// ==============ИСХОДНЫЕ ПЕРЕМЕННЫЕ====================
const inputRef = document.querySelector('input');
const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector(".gallery-wrapper");
const loadButtonRef = document.querySelector(".load-images");

const key = '19878712-8b5821339c38877bcf5918ddb';
let pageNumber = 1;
let searchQuery = inputRef.value;

// ==============СЛУШАТЕЛИ СОБЫТИЙ====================
// inputRef.addEventListener('input', debounce(renewRequest, 2000));
formRef.addEventListener('submit', renewRequest);
loadButtonRef.addEventListener('click', loadImages);
galleryRef.addEventListener('click', showLargeImg);



// =========Функция обновления запроса по отправке формы и вводу поиска==============
function renewRequest(event) {
  event.preventDefault();
  searchQuery = inputRef.value;
  galleryRef.innerHTML = "";
  renderGallery(searchQuery);
}

// //=========І. СОЗДАНИЕ ГАЛЛЕРЕИИ с КНОПКОЙ ДОЗАГРУЗКИ==============
// function renderGallery(searchQuery) {
  
//   // ================Получение данных для заполнения шаблона галереии============== 
//   fetchGallery(key, pageNumber, searchQuery).then(data => {
//     const photoCard = photoCardTemplate(data.hits);
//     const gallery = galleryTemplate(data.hits);
    
      
//     // ================Рендер разметки галереи============== 
//     if (data.total >= 1) {
//     galleryRef.insertAdjacentHTML('beforeend', gallery);
//       const galleryListRef = document.querySelectorAll(".gallery");
//         const countGalleryList = galleryListRef.length;
//         const targetGalleryListRef = galleryListRef.[countGalleryList - 1];
//       targetGalleryListRef.insertAdjacentHTML('beforeend', photoCard);
//       // ==============скролл к началу загруженных картинок============
//       // smoothScroll(targetGalleryListRef);
//       window.scrollTo(
//       {
//         top: targetGalleryListRef.offsetTop,
//         behavior: 'smooth',
//       }
//       );
//       // ===========Добавление кнопки дозагрузки картинок или сообщения ==============  
//       if (data.total > 12) {
//         loadButtonRef.style.display = 'inline';
//       }     
//       if (document.querySelectorAll(".gallery-item").length >= data.total) {
//       loadButtonRef.style.display = 'none';
//       alert({
//         text: "All available pictures have loaded"
//       });
//       return alert;
//     }
//     }

//     // ================Сообщение об ошибке============== 
//     else {
//       // inputRef.value = "";
//       error({
//         text: "Nothing found. Please, enter a correct query"
//       });
//       return error;
//     }
//   }).catch(error => console.log(error));
// }


// //======================РАОТА С ИЗОБРАЖЕНИЯМИ=========
// function showLargeImg(event) {
//     // =======Открытие большого изображения по клику======
//   const src = event.target.dataset.url;
//   const alt = event.target.alt;
//   const largeImg = basicLightbox.create(`<img src=${src} alt="${alt}" class="show">`);
//   largeImg.show();
//   window.addEventListener('keydown', onPressESC);
//   function onPressESC(event) {
//     if (event.code === 'Escape') {
//       closelargeImg();
//       window.removeEventListener('keydown', onPressESC);
//     }
//   }

//   // =======Закрытие большого изображения по клику======
//   const closelargeImg = function () { largeImg.close() };
//   const showImgRef = document.querySelector(".show");
//   showImgRef.addEventListener('click', closelargeImg);
// };

// // ================ФУНКЦИЯ ДОЗАГРУЗКИ ИЗОБРАЖЕНИЙ============== 
// function loadImages() {
//   pageNumber += 1;
//   renderGallery(searchQuery);
// }


// // ================Функция определения текущего положения на странице============== 
//   function currentYPosition() {
//     if (self.pageYOffset) return self.pageYOffset;
//     return 0;
// }

// // ============Функция определения текущего положения элемента на странице============== 
// function elmYPosition(targetGalleryListRef) {
//     let y = targetGalleryListRef.offsetTop;
//     let node = targetGalleryListRef;
//   while (node.offsetParent && node.offsetParent != document.body) {
//       node = node.offsetParent;
//       y += node.offsetTop;
//   }
//   return y;
// }

// // ============Функция плавного скролла============== 
// function smoothScroll(targetGalleryListRef) {
//   const startY = currentYPosition();
//   const stopY = elmYPosition(targetGalleryListRef);
//   const distance = stopY > startY ? stopY - startY : startY - stopY;
//   scrollTo(0, stopY);
//     if (distance < 100) {
//         scrollTo(0, stopY); return;
//     }
//     const speed = Math.round(distance / 100);
//     if (speed >= 20) speed = 20;
//     const step = Math.round(distance / 25);
//     let leapY = stopY > startY ? startY + step : startY - step;
//   let timer = 0;
//     if (stopY > startY) {
//         for ( let i=startY; i<stopY; i+=step ) {
//             setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//             leapY += step; if (leapY > stopY) leapY = stopY; timer+=1;
//         } return;
//     }
//     for ( let i=startY; i>stopY; i-=step ) {
//         setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
//         leapY -= step; if (leapY < stopY) leapY = stopY; timer+=1;
//   }
//   }
// // ==========================================================================================



//=========ІІ. СОЗДАНИЕ ГАЛЛЕРЕИИ с INTERSECTION OBSERVER==============
function renderGallery(searchQuery) {

  // ================Получение данных для заполнения шаблона галереии============== 
  fetchGallery(key, pageNumber, searchQuery).then(data => {
    const photoCard = photoCardTemplate(data.hits);
    const gallery = galleryTemplate(data.hits);
    
      
    // ================Рендер разметки галереи============== 
    if (data.total >= 1) {
      galleryRef.insertAdjacentHTML('beforeend', gallery);
      const galleryListRef = document.querySelectorAll(".gallery");
      const countGalleryList = galleryListRef.length;
      const targetGalleryListRef = galleryListRef.[countGalleryList - 1];
      targetGalleryListRef.insertAdjacentHTML('beforeend', photoCard);

      
      // ===========Дозагрузка картинок при скролле ==============      
      if (data.total > 12) {
         const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting === true) {
            pageNumber += 1;
            observer.unobserve(targetGalleryListRef);
            renderGallery(searchQuery);
          }
        })
      });

      observer.observe(targetGalleryListRef);
  }     

      if (document.querySelectorAll(".gallery-item").length >= data.total) {
      alert({
        text: "All available pictures have loaded"
      });
      return alert;
    }
    }

    // ================Сообщение об ошибке============== 
    else {
      inputRef.value = "";
      error({
        text: "Nothing found. Please, enter a correct query"
      });
      return error;
    }
  }).catch(error => console.log(error));
}


//======================РАОТА С ИЗОБРАЖЕНИЯМИ=========
function showLargeImg(event) {
    // =======Открытие большого изображения по клику======
  const src = event.target.dataset.url;
  const alt = event.target.alt;
  const largeImg = basicLightbox.create(`<img src=${src} alt="${alt}" class="show">`);
  largeImg.show();
  window.addEventListener('keydown', onPressESC);
  function onPressESC(event) {
    if (event.code === 'Escape') {
      closelargeImg();
      window.removeEventListener('keydown', onPressESC);
    }
  }

  // =======Закрытие большого изображения по клику======
  const closelargeImg = function () { largeImg.close() };
  const showImgRef = document.querySelector(".show");
  showImgRef.addEventListener('click', closelargeImg);
};

// ================ФУНКЦИЯ ДОЗАГРУЗКИ ИЗОБРАЖЕНИЙ============== 
function loadImages() {
  pageNumber += 1;
  renderGallery(searchQuery);
}
          
