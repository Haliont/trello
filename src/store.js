import { createStore } from 'redux';
import reducers from './reducers';

const preloadStateJSON = localStorage.state || JSON.stringify({});
const preloadState = JSON.parse(preloadStateJSON);

export default createStore(
  reducers,
  preloadState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);
