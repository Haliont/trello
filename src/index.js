import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import App from './containers/App';

import { getBoardsMap } from './store/boards/selectors';
import { getCardsMap } from './store/cards/selectors';
import { getComments } from './store/comments/selectors';
// import * as userSelectors from './store/user/selectors';

import configureStore from './store';

const preloadState = JSON.parse(localStorage.state || JSON.stringify({}));

const store = configureStore(preloadState);

const secretKey = 'ygg0KKW6tJ89txLJX5wwJTPyGzHEgrNghoUfOHP5';

store.subscribe(async () => {
  const state = store.getState();
  const boardsById = getBoardsMap(state);
  const cardsById = getCardsMap(state);
  const commentsById = getComments(state);

  localStorage.state = JSON.stringify(state);

  await axios.put(
    `https://canban-projects.firebaseio.com/storage/boardsById.json?auth=${secretKey}`,
    boardsById,
  );

  await axios.put(
    `https://canban-projects.firebaseio.com/storage/cardsById.json?auth=${secretKey}`,
    cardsById,
  );

  await axios.put(
    `https://canban-projects.firebaseio.com/storage/commentsById.json?auth=${secretKey}`,
    commentsById,
  );
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
