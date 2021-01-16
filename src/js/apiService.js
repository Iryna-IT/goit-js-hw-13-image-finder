// import axios from 'axios';

function fetchGallery(key, pageNumber,searchQuery) {

   return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`)
       .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}

export default fetchGallery
