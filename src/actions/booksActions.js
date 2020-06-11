import axios from 'axios';

import { BOOKS_COUNT } from '../constants/constants';
import * as actionTypes from './actionTypes';
import { BOOKS_API_URL } from '../constants/constants';

export const fetchBooksStart = () => {
  return {
    type: actionTypes.FETCH_BOOKS_START
  };
};

export const fetchBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books
  };
};

export const fetchBooksFail = () => {
  return {
    type: actionTypes.FETCH_BOOKS_FAIL
  };
};

const fetchSuggestedBooksSuccess = (collectionByGenres) => {
  return {
    type: actionTypes.FETCH_SUGGESTED_BOOKS_SUCCESS,
    collectionByGenres
  };
};

const fetchSuggestedBooksFail = () => {
  return {
    type: actionTypes.FETCH_SUGGESTED_BOOKS_FAIL
  };
};

export const fetchBooks = (searchTerm = 'cat') => { 
  return dispatch => {
    dispatch(fetchBooksStart());

    axios.get(BOOKS_API_URL, { params: { q: searchTerm } })
      .then(response => {
        let booksArray = [];

        if (response.data && response.data.items) {
          booksArray = response.data.items;
        }

        dispatch(fetchBooksSuccess(booksArray));
      })
      .catch(() => dispatch(fetchBooksFail()));
  };
};


const getBooksByGenre = (genre) => {
  return axios.get(BOOKS_API_URL, { params: { q: genre } });
}

export const getBooksListByGenre = (genres) => {
  return dispatch => {
    dispatch(fetchBooksStart());
    const books = [];

    Promise.all(genres.map(genre => {
      return getBooksByGenre(genre)
        .then((response) => {
          if (response.data && response.data.items) {
            books.push({
              genre,
              books: response.data.items.slice(0, BOOKS_COUNT)
            });
          }
        })
    })).then(() => {
      dispatch(fetchSuggestedBooksSuccess(books));
    }).catch(() => dispatch(fetchSuggestedBooksFail()));
  };
};
