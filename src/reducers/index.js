import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { uid } from '../helpers';
import * as actions from '../actions';

const username = handleActions({
  [actions.updateUsername](_, { payload: { newName } }) {
    return newName;
  },
}, '');

const lists = handleActions({
  [actions.setListTitle](state, { payload: { id, title } }) {
    return { ...state, [id]: { ...state[id], title } };
  },
}, {});

const cards = handleActions({
  [actions.addCard](state, { payload: card }) {
    const cardId = uid();
    return { ...state, [cardId]: { id: cardId, ...card } };
  },
}, {});

export default combineReducers({
  lists,
  cards,
  username,
});
