import { updateItem, uid } from '../helpers';

/*
cards = [
  {
    id: 0,
    title: 'Card title',
    desc: '',
    commentIds: [],
  },
]
* */

const make = (cards = []) => cards;
const getCard = (id, cards = []) => cards.find(card => id === card.id);
const getCards = (ids = [], cards = []) => cards.filter(card => ids.includes(card.id));

const addCard = (
  card = {
    id: uid(),
    title: 'Card title',
    desc: '',
    commentIds: [],
  },
  cards,
) => make([...cards, card]);

const setCardTitle = (cardId, title, cards) => updateItem(cardId, { title }, cards);
const setCardDesc = (cardId, desc, cards) => updateItem(cardId, { desc }, cards);
const removeCard = (cardId, cards) => cards.filter(card => cardId !== card.id);

const addCommentInCard = (cardId, commentId, cards) => {
  const { commentIds } = getCard(cardId, cards);
  return updateItem(cardId, { commentIds: [...commentIds, commentId] }, cards);
};

const removeCommentFromCard = (cardId, commentId, cards) => {
  const { commentIds } = getCard(cardId, cards);
  const filteredCommentIds = commentIds.filter(id => id !== commentId);
  return updateItem(cardId, { commentIds: filteredCommentIds }, cards);
};


export {
  make,
  getCard,
  getCards,
  addCard,
  setCardTitle,
  setCardDesc,
  removeCard,
  addCommentInCard,
  removeCommentFromCard,
};
