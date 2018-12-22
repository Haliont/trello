import _ from 'lodash';
import { createSelector } from 'reselect';

export const getCards = state => state.cards;
export const getCardsMap = createSelector(
  getCards,
  cards => cards.cardsById,
);

export const isFetching = createSelector(
  getCards,
  cards => cards.cardsFetchingState === 'requested',
);


export const getCardsList = createSelector(
  getCardsMap,
  cardsById => Object.values(cardsById),
);

export const getCardsByBoardId = (state, boardId) => Object.values(
  _.pickBy(getCardsMap(state), card => card.boardId === boardId),
);

export const filterCardsByState = (cards, cardState) => cards
  .filter(card => card.state === cardState);
