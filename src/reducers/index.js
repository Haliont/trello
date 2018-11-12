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
  [actions.setCardTitle](state, { payload: { id, title } }) {
    const card = state[id];
    const updatedCard = { ...card, title };
    return { ...state, [id]: updatedCard };
  },
  [actions.setCardDesc](state, { payload: { id, desc } }) {
    const card = state[id];
    const updatedCard = { ...card, desc };
    return { ...state, [id]: updatedCard };
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

const comments = handleActions({
  [actions.addComment](state, { payload: comment }) {
    const commentId = uid();
    return { ...state, [commentId]: { id: commentId, ...comment } };
  },
  // [actions.removeComment](state, { payload: id }) {
  //   return omit(state, [id]);
  // },
}, {});

export default combineReducers({
  lists,
  cards,
  comments,
  username,
  activeCardId,
});
