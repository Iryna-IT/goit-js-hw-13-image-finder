// const key = '19878712-8b5821339c38877bcf5918ddb';
// let pageNumber = 1;

function fetchGallery(key, pageNumber,searchQuery) {

   return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${key}`)
       .then(response => response.json())
        .catch(error => {
            console.log(error);
        });
}

export default fetchGallery
