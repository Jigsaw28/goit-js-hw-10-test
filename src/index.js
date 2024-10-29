import { fetchBreeds } from './components/cat-api';
import { fetchCatByBreed } from './components/cat-api';
import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  // errorEl: document.querySelector('.error'),
};

const { selectEl, catInfoEl, loaderEl } = refs;

// errorEl.classList.add('is-hidden');
selectEl.classList.add('is-hidden');
catInfoEl.classList.add('is-hidden');



fetchBreeds()
  .then(arrayBreeds => {
    selectEl.insertAdjacentHTML('beforeend', renderBreeds(arrayBreeds));
    showInfo(loaderEl, selectEl);
  })
  .catch(error => {
    loaderEl.classList.add('is-hidden');
    Notify.failure('Oops! Something went wrong! Try reloading the page!')
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
      Notify.failure('Oops! Something went wrong! Try reloading the page!')
      console.log(error);
    });
}

function renderBreeds(breeds) {
  return breeds
    .map(
      breed =>
        `<option value=${breed.reference_image_id}>${breed.name}</option>`
    )
    .join('');
}

function renderBreedsInfo(data) {
  return data.breeds.map(
    breed => `<img src=${data.url} />
    <h1>${data.breeds[0].name}</h1>
    <p>${data.breeds[0].description}</p>
    <h3>${data.breeds[0].temperament}</h3>`
  );
}

function showInfo(loader, elInfo) {
  elInfo.classList.remove('is-hidden');
  loader.classList.add('is-hidden');
}

