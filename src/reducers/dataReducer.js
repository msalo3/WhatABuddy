const INITIAL_STATE = {
  data: [
    { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' }
  ],
  hittingTheApi: false,
  breeds: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'add_new_dogs':
      return {
        ...state,
        data: action.newData
      };
    case 'no_longer_hitting_api':
      return {
        ...state,
        hittingTheApi: false
      };
    case 'hitting_the_api':
      return {
        ...state,
        hittingTheApi: true
      };
    case 'store_breeds':
      return {
        ...state,
        breeds: action.breeds
      };
    default:
      return state;
  }
};
