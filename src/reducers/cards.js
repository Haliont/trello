import { createAction, handleActions } from 'redux-actions';
import { omit } from 'lodash';
import { uid } from '../helpers';

export const addCard = createAction('ADD_CARD');
export const removeCard = createAction('REMOVE_CARD');
export const setCardTitle = createAction('SET_CARD_TITLE');
export const setCardDesc = createAction('SET_CARD_DESC');

export default handleActions({
  [addCard](state, { payload: card }) {
    const cardId = uid();
    return { ...state, [cardId]: { id: cardId, ...card } };
  },
  [removeCard](state, { payload: id }) {
    return omit(state, [id]);
  },
  [setCardTitle](state, { payload: { id, title } }) {
    const card = state[id];
    const updatedCard = { ...card, title };
    return { ...state, [id]: updatedCard };
  },
  [setCardDesc](state, { payload: { id, desc } }) {
    const card = state[id];
    const updatedCard = { ...card, desc };
    return { ...state, [id]: updatedCard };
  },
}, {});
