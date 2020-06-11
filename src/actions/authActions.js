import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    username
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  window.sessionStorage.clear();

  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(authStart());

    setTimeout(() => {
      const user = JSON.parse(window.localStorage.getItem(username));
      if (user && user.password === password) {
        window.sessionStorage.setItem('user', username);
        dispatch(authSuccess(username));
      } else {
        dispatch(authFail('Wrong username or password'));
      }
    }, 1000); //TODO time to const
  };
};

export const register = (username, password, email) => {
  return dispatch => {
    dispatch(authStart());

    const user = JSON.parse(window.localStorage.getItem(username));
    if (user) {
      let errorMessage = 'Username is taken';

      if (user.email === email) {
        errorMessage = 'Email is taken';
      }

      dispatch(authFail(errorMessage));
      return;
    }

    const userData = {
      username,
      password,
      email,
      shelves: {
        read: [],
        reading: [],
        willRead: []
      },
      genres: []
    };

    window.localStorage.setItem(username, JSON.stringify(userData));
    window.sessionStorage.setItem('user', username);
    dispatch(authSuccess(username));
  };
};

export const authCheckState = () => {
  return dispatch => {
    const loggedUsername = window.sessionStorage.getItem('user');
    if (!loggedUsername) {
      dispatch(logout());
      return;
    }

    const user = window.localStorage.getItem(loggedUsername);
    if (!user) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(loggedUsername));
    }
  };
};
