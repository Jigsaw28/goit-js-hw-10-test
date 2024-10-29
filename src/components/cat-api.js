import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ OFrhDDL1NVR7U24ugIJs8RwWKPwHHn dANBllOqKums5AX67h55iRvctYDKV5 xeLV';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.error(error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
