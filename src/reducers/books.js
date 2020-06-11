import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  collectionByGenres: [],
  books: []
};

const fetchBooksStart = (state, action) => {
  return {
    ...state,
    isLoading: true,
  };
};

const fetchBooksSuccess = (state, action) => {
  return {
    isLoading: false,
    books: action.books
  };
};

const fetchBooksFail = (state, action) => {
  return {
    ...state,
    isLoading: false
  };
};

const fetchSuggestedBooksSuccess = (state, action) => {
  return {
    ...state,
    collectionByGenres: action.collectionByGenres,
    isLoading: false
  };
};

const fetchSuggestedBooksFail = (state, action) => {
  return {
    ...state,
    isLoading: false
  }
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BOOKS_START: return fetchBooksStart(state, action);
    case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess(state, action);
    case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail(state, action);
    case actionTypes.FETCH_SUGGESTED_BOOKS_SUCCESS: return fetchSuggestedBooksSuccess(state, action);
    case actionTypes.FETCH_SUGGESTED_BOOKS_FAIL: return fetchSuggestedBooksFail(state, action);
    default: return state;
  }
}

export default booksReducer;
