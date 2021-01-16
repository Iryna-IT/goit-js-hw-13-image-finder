import './styles.css';
// import './js/apiService.js';

import fetchGallery from './js/fetchGallery.js';
import galleryTemplate from './templates/gallery.hbs';
import photoCardTemplate from './templates/photoCard.hbs';


// ===============НАСТРОЙКИ БИБЛИОТЕК=================
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const basicLightbox = require('basiclightbox');
const debounce = require('lodash.debounce');


// ==============ИСХОДНЫЕ ПЕРЕМЕННЫЕ====================
const inputRef = document.querySelector('input');
const galleryRef = document.querySelector(".gallery-wrapper");
const loadButtonRef = document.querySelector(".load-images");

const key = '19878712-8b5821339c38877bcf5918ddb';
let pageNumber = 1;
let searchQuery = inputRef.value;

// ==============СЛУШАТЕЛИ СОБЫТИЙ====================
inputRef.addEventListener('input', debounce(renderGallery, 500));
loadButtonRef.addEventListener('click', loadImages);


// =========ФУНКЦИЯ СОЗДАНИЯ ГАЛЛЕРЕИИ==============
function renderGallery(event) {
  searchQuery = event.target.value;
  // if (searchQuery !== "") {
  //   searchQuery = event.target.value;
  // }
// ================Получение данных для заполнения шаблона галереии============== 
  fetchGallery(key, pageNumber, searchQuery).then(data => {
    const photoCard = photoCardTemplate(data.hits);
    const gallery = galleryTemplate(data.hits);
    // const limit = data.totalHits;
    // console.log(data);
      
    // ================Рендер разметки галереи============== 
    if (data.total >= 1) {
      galleryRef.insertAdjacentHTML('beforeend', gallery);
      const galleryListRef = document.querySelectorAll(".gallery");
      const countGalleryList = galleryListRef.length;
      const targetGalleryListRef = galleryListRef.[countGalleryList - 1];
      targetGalleryListRef.insertAdjacentHTML('beforeend', photoCard);
      
      // ======== Работа с большим изображением =======
      const imgRef = document.querySelector("img");
      // =======Открытие изображения по клику======
      imgRef.onclick = (event) => {
        const src = event.target.dataset.url;
        const largeImg = basicLightbox.create(`<img src=${src} class="show">`);
        largeImg.show();
        // =======Закрытие изображения по клику======
        const closelargeImg = function () { largeImg.close() };
        const showImgRef = document.querySelector(".show");
        showImgRef.addEventListener('click', closelargeImg);
      };
      // ===========Добавление кнопки дозагрузки картинок==============  
      if (data.total > 12) {
        loadButtonRef.style.display = 'inline';
      }
      // ====================очистка запроса======================
      
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
  // =========================ОЧИСТКА СТРАНИЦЫ ==============
  // console.log(searchQuery);
  // inputRef.removeEventListener('input', debounce(renderGallery, 500));
  //   inputRef.addEventListener("input", cleanInput);
  // function cleanInput() {
  //   searchQuery = "";
  //     inputRef.value = "";
  //       galleryRef.innerHTML = "";
  //     }
  //   console.log(searchQuery);
  // if (searchQuery !== "") {
  //   inputRef.removeEventListener('input', debounce(renderGallery, 500));
  //   inputRef.addEventListener("input", debounce(cleanInput, 500));
  //   function cleanInput() {
  //     inputRef.value = "";
  //       galleryRef.innerHTML = "";
  //     }
  //   console.log(searchQuery);
  // }
}

// ================ФУНКЦИЯ ДОЗАГРУЗКИ ИЗОБРАЖЕНИЙ ПО СОБЫТИЮ И СКРОЛЛА============== 
function loadImages(event) {
pageNumber += 1;
  searchQuery = inputRef.value;
  renderGallery(event);

// ================Функция определения текущего положения на странице============== 
  function currentYPosition() {
    if (self.pageYOffset) return self.pageYOffset;
    return 0;
}

// ============Функция определения текущего положения элемента на странице============== 
  function elmYPosition() {
    let y = loadButtonRef.offsetTop - 20;
    let node = document.querySelector(".gallery");
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    } return y;
}

// ============Функция плавного скролла============== 
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
  // ============Вызов функции скролла============== 
  smoothScroll();
}
