import _ from 'lodash';
import { uid } from '../helpers';

const getCard = (id, cards) => cards[id];
const getCardsByListId = (listId, cards) => Object
  .values(_.pickBy(cards, card => card.listId === listId));

const addCard = (
  card = {
    id: uid(),
    title: 'Card title',
    desc: '',
    author: '',
  },
  cards,
) => ({ ...cards, [card.id]: card });

const setCardTitle = (cardId, title, cards) => {
  const card = cards[cardId];
  const updatedCard = { ...card, title };
  return { ...cards, [cardId]: updatedCard };
};

const setCardDesc = (cardId, desc, cards) => {
  const card = cards[cardId];
  const updatedCard = { ...card, desc };
  return { ...cards, [cardId]: updatedCard };
};

const removeCard = (cardId, cards) => _.omit(cards, cardId);

export {
  getCard,
  addCard,
  removeCard,
  setCardDesc,
  setCardTitle,
  getCardsByListId,
};
