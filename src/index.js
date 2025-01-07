import { fetchBreeds } from './components/cat-api';
import { fetchCatByBreed } from './components/cat-api';
import { Notify } from 'notiflix';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
};

const { selectEl, catInfoEl, loaderEl } = refs;

selectEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');

fetchBreeds()
  .then(arrayBreeds => {
    selectEl.insertAdjacentHTML('beforeend', renderBreeds(arrayBreeds));
    showInfo(loaderEl, selectEl);
  })
  .catch(error => {
    loaderEl.classList.add('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
    console.log(error);
  });

selectEl.addEventListener('change', onChange);

function onChange(e) {
  catInfoEl.innerHTML = '';
  loaderEl.classList.remove('is-hidden');
  
  fetchCatByBreed(e.target.value)
    .then(data => {
      catInfoEl.insertAdjacentHTML('beforeend', renderBreedsInfo(data));
      showInfo(loaderEl, catInfoEl);
    })
    .catch(error => {
      loaderEl.classList.add('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
      console.log(error);
    });
}

function renderBreeds(breeds) {
 return  breeds.map(
    breed =>
      `<option value=${breed.reference_image_id}>${breed.name}</option>`
  )
  .join('');
}

function renderBreedsInfo(data) {
  return data.breeds.map(
    breed => `<img src=${data.url} class='cat-img' />
    <div class='cat-container'><h1>${data.breeds[0].name}</h1>
    <p>${data.breeds[0].description}</p>
    <span id="temp">Temperament:&nbsp;<h3>${data.breeds[0].temperament}</h3></div>`
  );
}

function showInfo(loader, elInfo) {
  elInfo.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
}
