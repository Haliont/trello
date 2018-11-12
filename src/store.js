import { createStore } from 'redux';
import reducers from './reducers';

const initialLists = {
  0: {
    id: 0,
    title: 'TODO',
  },
  1: {
    id: 1,
    title: 'In Progress',
  },
  2: {
    id: 2,
    title: 'Testing',
  },
  3: {
    id: 3,
    title: 'Done',
  },
};

const cardsJSON = localStorage.cards || JSON.stringify({});
const listsJSON = localStorage.lists || JSON.stringify(initialLists);

const preloadState = {
  cards: JSON.parse(cardsJSON),
  lists: JSON.parse(listsJSON),
  username: localStorage.username || '',
};

export default createStore(
  reducers,
  preloadState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);
