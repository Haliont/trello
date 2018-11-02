import { uid } from '../helpers';

const getList = (id, lists) => lists[id];

const addList = (
  list = {
    id: uid(),
    title: 'Default title',
    cardIds: [],
  },
  lists,
) => ({ ...lists, [list.id]: list });

const setListTitle = (listId, title, lists) => {
  const list = lists[listId];
  const updatedList = { ...list, title };
  return { ...lists, [listId]: updatedList };
};

export {
  getList,
  addList,
  setListTitle,
};
