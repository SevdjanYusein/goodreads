import * as actionTypes from '../actions/actions';

const initialState = {
  username: '',
  genres: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GENRES: {
      const user = window.localStorage.getItem(state.username);
      window.localStorage.setItem(user.username, JSON.stringify({
        ...user,
        genres: state.genres
      }));

      return {
        ...state,
        genres: action.newSelectedGenres
      };
    }
    default: return state;
  }
};

export default reducer;
