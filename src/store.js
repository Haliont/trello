import { createStore } from 'redux';
import reducers from './reducers';

const preloadState = {
  username: localStorage.username || '',
};

export default createStore(
  reducers,
  preloadState,
);
