import * as actionTypes from '../actions/actionTypes';

const initialState = {
  username: null,
  error: null,
  isLoading: false
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    isLoading: true
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    username: action.username,
    isLoading: false
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    isLoading: false
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    username: null,
    isLoading: false
  };
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    default: return state;
  }
}

export default authReducer;
