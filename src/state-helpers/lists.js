import { updateItem, uid } from '../helpers';

const getList = (id, lists) => lists.find(list => id === list.id);

const addList = (
  list = {
    id: uid(),
    title: 'Default title',
    cardIds: [],
  },
  lists,
) => [...lists, list];

const setListTitle = (listId, title, lists) => updateItem(listId, { title }, lists);

const addCardInList = (listId, cardId, lists) => {
  const { cardIds } = getList(listId, lists);
  return updateItem(listId, { cardIds: [...cardIds, cardId] }, lists);
};

const removeCardFromList = (listId, cardId, lists) => {
  const { cardIds } = getList(listId, lists);
  const filteredCardIds = cardIds.filter(id => id !== cardId);
  return updateItem(listId, { cardIds: filteredCardIds }, lists);
};

export {
  getList,
  addList,
  setListTitle,
  addCardInList,
  removeCardFromList,
};
