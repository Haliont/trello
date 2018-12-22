import { createAction } from 'redux-actions';
import axios from 'axios';

const secretKey = 'ygg0KKW6tJ89txLJX5wwJTPyGzHEgrNghoUfOHP5';

export const addCard = createAction('ADD_CARD');
export const moveCard = createAction('MOVE_CARD');
export const removeCard = createAction('REMOVE_CARD');
export const reorderCard = createAction('REORDER_CARD');
export const setCardDesc = createAction('SET_CARD_DESC');
export const setCardTitle = createAction('SET_CARD_TITLE');

export const fetchCardsRequest = createAction('FETCH_CARDS_REQUEST');
export const fetchCardsSuccess = createAction('FETCH_CARDS_SUCCESS');
export const fetchCardsFailure = createAction('FETCH_CARDS_FAILURE');

export const fetchCards = () => async (dispatch) => {
  dispatch(fetchCardsRequest());
  try {
    // await sleep(2000);
    const { data } = await axios.get(
      `https://canban-projects.firebaseio.com/storage/cardsById.json?auth=${secretKey}`,
    );
    dispatch(fetchCardsSuccess(data));
  } catch (e) {
    dispatch(fetchCardsFailure());
  }
};
