import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import './index.css';
import App from './App/App.js';
import registerServiceWorker from './serviceWorker';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import booksReducer from './reducers/books';

const rootReducer = combineReducers({
  auth: authReducer,
  books: booksReducer,
  profile: profileReducer
});

const composeEnhacers = window.__REDUX_DEFTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhacers(
  applyMiddleware(ReduxThunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
