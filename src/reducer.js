import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { omit, omitBy } from 'lodash';
import { uid } from './helpers';
import * as actions from './actions';

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

const lists = handleActions({
  [actions.setListTitle](state, { payload: { id, title } }) {
    return { ...state, [id]: { ...state[id], title } };
  },
}, initialLists);

const username = handleActions({
  [actions.updateUsername](_, { payload: newName }) {
    return newName;
  },
}, '');

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
  [actions.removeComment](state, { payload: id }) {
    return omit(state, [id]);
  },
  [actions.removeCard](state, { payload: id }) {
    return omitBy(state, ({ cardId }) => cardId === id);
  },
  [actions.setCommentText](state, { payload: { id, text } }) {
    const comment = state[id];
    const updatedComment = { ...comment, text };
    return { ...state, [id]: updatedComment };
  },
}, {});

const isRegistered = handleActions({
  [actions.signup]() {
    return true;
  },
}, false);

export default combineReducers({
  lists,
  cards,
  comments,
  username,
  activeCardId,
  isRegistered,
});
