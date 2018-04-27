import {
  getRandomWoofDog,
  getUkDog,
  getRandomCEODog,
  getCEODogBreeds,
  getDogsForABreed
} from '../util/api';

const handleError = (error) => {
  console.log('CON', error.config);
  if (error.response) {
    console.log('RESPONSE', error.response);
    return error.response;
  } else if (error.request) {
    console.log('REQUEST', error.request);
    return error.request;
  }
  console.log('Message', error.message);
  return error.message;
};

export const noLongerHittingApi = () => ({ type: 'no_longer_hitting_api' });

export const getMorePictures = () => (dispatch) => {
  dispatch({ type: 'hitting_the_api' });
  const newData = [];
  getUkDog(20)
    .then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        newData[i] = { id: response.data.data[i].id, uri: response.data.data[i].url };
      }
      dispatch({ type: 'add_new_dogs', newData });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getPicturesOfABreed = breed => (dispatch) => {
  dispatch({ type: 'hitting_the_api' });
  const newData = [];
  getDogsForABreed(breed)
    .then((response) => {
      console.log('BREED', response);
      for (let i = 0; i < response.data.message.length; i++) {
        newData[i] = { id: i, uri: response.data.message[i] };
      }
      dispatch({ type: 'add_new_dogs', newData });
    })
    .catch((error) => {
      handleError(error);
    });
};

export const getBreeds = () => (dispatch) => {
  getCEODogBreeds()
    .then((response) => {
      dispatch({ type: 'store_breeds', breeds: Object.keys(response.data.message) });
    })
    .catch((error) => {
      handleError(error);
    });
};
