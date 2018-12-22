import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import { uid } from '../../utils';

import * as cardsActions from './actions';

const cardsById = handleActions({
  [cardsActions.fetchCardsSuccess](_a, { payload }) {
    return payload || {};
  },
  [cardsActions.addCard](state, { payload: card }) {
    const cardId = uid();
    return { ...state, [cardId]: { id: cardId, ...card } };
  },
  [cardsActions.removeCard](state, { payload: id }) {
    return _.omit(state, [id]);
  },
  [cardsActions.setCardTitle](state, { payload: { id, title } }) {
    const card = state[id];
    const updatedCard = { ...card, title };
    return { ...state, [id]: updatedCard };
  },
  [cardsActions.setCardDesc](state, { payload: { id, desc } }) {
    const card = state[id];
    const updatedCard = { ...card, desc };
    return { ...state, [id]: updatedCard };
  },
  [cardsActions.moveCard](cards, { payload: { cardId, state } }) {
    const card = cards[cardId];
    const updatedCard = { ...card, state };
    return { ...cards, [cardId]: updatedCard };
  },
}, {});


const cardsFetchingState = handleActions({
  [cardsActions.fetchCardsRequest]() {
    return 'requested';
  },
  [cardsActions.fetchCardsSuccess]() {
    return 'success';
  },
  [cardsActions.fetchCardsFailure]() {
    return 'failed';
  },
}, 'none');

export default combineReducers({
  cardsById,
  cardsFetchingState,
});
