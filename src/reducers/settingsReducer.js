const INITIAL_STATE = {
  breed: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'save_breed':
      return {
        ...state,
        breed: action.breed
      };
    default:
      return state;
  }
};
