import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import App from './components/App';

import Board from './containers/Board';

import store from './store';

store.subscribe(() => {
  const {
    cards,
    lists,
    username,
    comments,
  } = store.getState();

  localStorage.cards = JSON.stringify(cards);
  localStorage.lists = JSON.stringify(lists);
  localStorage.comments = JSON.stringify(comments);
  localStorage.username = username;
});

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('root'),
);
