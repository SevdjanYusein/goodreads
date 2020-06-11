import * as actionTypes from './actionTypes';

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START
  };
};

export const getUserSuccess = (shelves, genres) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    shelves,
    genres
  };
};

export const getUserFail = () => {
  return {
    type: actionTypes.GET_USER_FAIL
  };
};

export const getUserInfo = (username) => {
  return dispatch => {
    dispatch(getUserStart());

    const user = JSON.parse(window.localStorage.getItem(username));
    if (user) {
      dispatch(getUserSuccess(user.shelves, user.genres));
    } else {
      dispatch(getUserFail());
    }
  };
};

export const updateUserInfo = (genres, username) => {
  return dispatch => {
    const user = JSON.parse(window.localStorage.getItem(username));
    if (user) {
      user.genres = genres;
      window.localStorage.setItem(user.username, JSON.stringify(user));
      dispatch(getUserSuccess(user.shelves, user.genres));
    } else {
      dispatch(getUserFail());
    }
  };
};
