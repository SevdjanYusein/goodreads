import * as actionTypes from '../actions/actionTypes';

const initialState = {
  shelves: {
    read: [],
    reading: [],
    willRead: []
  },
  genres: [],
  isLoading: false
};

const getUserStart = (state, action) => {
  return {
    ...state,
    isLoading: true
  };
};

const getUserSuccess = (state, action) => {
  return {
    ...state,
    shelves: action.shelves,
    genres: action.genres,
    isLoading: false
  };
};

const getUserFail = (state, action) => {
  return {
    ...state,
    isLoading: false
  };
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_START: return getUserStart(state, action);
    case actionTypes.GET_USER_SUCCESS: return getUserSuccess(state, action);
    case actionTypes.GET_USER_FAIL: return getUserFail(state, action);
    default: return state;
  }
};

export default profileReducer;
