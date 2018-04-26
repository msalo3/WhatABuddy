import axios from './axios';

export const getRandomWoofDog = () => {
  return axios({
    method: 'GET',
    url: 'https://random.dog/woof.json'
  });
};

export const getUkDog = (limit = 1) => {
  let url = 'api.thedogapi.co.uk/v2/dog.php';
  url = limit > 1 ? url + 'limit=' + limit : url;
  return axios({
    method: 'GET',
    url
  });
};

// DOG CEO API Below

export const getRandomCEODog = () => {
  return axios({
    method: 'GET',
    url: 'https://dog.ceo/api/breeds/image/random'
  });
};

export const getCEODogBreeds = () => {
  return axios({
    method: 'GET',
    url: 'https://dog.ceo/api/breeds/list/all'
  });
};

export const getDogsForABreed = (breed) => {
  let url = 'https://dog.ceo/api/breed/' + breed + '/images';
  return axios({
    method: 'GET',
    url: url
  });
};
