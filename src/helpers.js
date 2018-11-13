import { pickBy } from 'lodash';

export const getCard = (id, cards) => cards[id];
export const getList = (id, lists) => lists[id];
export const getCardsByListId = (listId, cards) => Object
  .values(pickBy(cards, card => card.listId === listId));

export const getCommentsByCardId = (cardId, comments) => Object
  .values(pickBy(comments, comment => comment.cardId === cardId));

export const uid = (function init() {
  const { storedId } = localStorage;

  let currentId;
  if (!storedId) {
    currentId = 0;
  } else {
    currentId = Number(storedId);
  }

  const next = () => {
    currentId += 1;
    localStorage.storedId = String(currentId);
    return currentId;
  };

  return next;
}());
