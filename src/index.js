import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

fetchBreeds()
  .then(arrayBreeds =>
    selectEl.insertAdjacentHTML('beforeend', renderBreeds(arrayBreeds))
  )
  .catch(error => console.log(error));

selectEl.addEventListener('change', onChange);

function onChange(e) {
  fetchCatByBreed(e.target.value).then(breeds =>
    catInfoEl.insertAdjacentHTML('beforeend', renderBreedsImage(breeds))
  );
}

function renderBreeds(breeds) {
  return breeds
    .map(breed => `<option value=${breed.id}>${breed.name}</option>`)
    .join('');
}

function renderBreedsImage(breeds) {
  return breeds.map(breed => {
    return `<img src=${breed.url} width=450px height=300px/>`;
  });
}
