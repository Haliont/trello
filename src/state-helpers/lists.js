import { updateItem, uid } from '../helpers';

/*
lists = [
  {
    id: 0,
    title: 'Title of list',
    cardIds: [1, 2, 3],
  }
]
* */

const make = (lists = []) => lists;
const getList = (id, lists) => lists.find(list => id === list.id);

const addList = (
  list = {
    id: uid(),
    title: 'Default title',
    cardIds: [],
  },
  lists,
) => make([...lists, list]);

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
  make,
  getList,
  addList,
  setListTitle,
  addCardInList,
  removeCardFromList,
};
