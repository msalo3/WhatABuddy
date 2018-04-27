import axios from './axios';

export const getRandomWoofDog = () => {
  return axios({
    method: 'GET',
    url: 'https://random.dog/woof.json'
  });
};

export const getUkDog = (limit) => {
  return axios({
    method: 'GET',
    url: `https://api.thedogapi.co.uk/v2/dog.php?limit=${limit}`
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
  const url = `https://dog.ceo/api/breed/${breed}/images`;
  return axios({
    method: 'GET',
    url
  });
};
