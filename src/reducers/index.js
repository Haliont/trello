import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omit } from 'lodash';
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
  [actions.removeCard](state, { payload: id }) {
    return omit(state, [id]);
  },
}, {});

const activeCardId = handleActions({
  [actions.openCard](_, { payload: id }) {
    return id;
  },
  [actions.closeCard]() {
    return null;
  },
}, null);

export default combineReducers({
  lists,
  cards,
  username,
  activeCardId,
});
