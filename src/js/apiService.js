import { data } from 'autoprefixer';
import axios from 'axios';

// ============синхронный axios =======================
const fetchGallery = (key, pageNumber, searchQuery) =>
    axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`)
        .then(response => response)
        .then(dataSet => dataSet.data)


// ============подробный синхронный axios =======================
// const fetchGallery = (key, pageNumber, searchQuery) =>
//     axios.get(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`)
//         .then(response => {
//             console.log(response);
//             return response;
//         })
//         .then(dataSet => {
//             console.log(dataSet.data);
//             return dataSet.data;
//         })
//     .then(data => {
//     console.log(data.hits);
// })


// ============синхронный fetch =======================
// function fetchGallery(key, pageNumber,searchQuery) {

//    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`)
//        .then(response => response.json())
//         .catch(error => {
//             throw error;
//         });
// }


// ============асинхронный fetch=======================
// async function fetchGallery(key, pageNumber, searchQuery) {
//     try {
//         const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`);
//         const images = response.json();
//         return images;
//     } catch (error) {
//             throw error;
//         };
// }

export default fetchGallery