import { createAction } from 'redux-actions';

export const updateUsername = createAction('UPDATE_USERNAME');
export const signup = createAction('SIGNUP');

export const openCard = createAction('OPEN_CARD');
export const closeCard = createAction('CLOSE_CARD');
export const setListTitle = createAction('SET_LIST_TITLE');

export const addCard = createAction('ADD_CARD');
export const removeCard = createAction('REMOVE_CARD');

export const setCardTitle = createAction('SET_CARD_TITLE');
export const setCardDesc = createAction('SET_CARD_DESC');
