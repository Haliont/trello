import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';

import store from './store';

store.subscribe(() => {
  const {
    cards,
    lists,
    username,
    comments,
    isRegistered,
  } = store.getState();

  localStorage.cards = JSON.stringify(cards);
  localStorage.lists = JSON.stringify(lists);
  localStorage.comments = JSON.stringify(comments);
  localStorage.username = username;
  localStorage.isRegistered = isRegistered;
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
