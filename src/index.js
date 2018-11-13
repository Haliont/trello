import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';

import store from './store';

store.subscribe(() => {
  const state = store.getState();
  localStorage.state = JSON.stringify(state);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
