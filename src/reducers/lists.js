import { createAction, handleActions } from 'redux-actions';

export const setListTitle = createAction('SET_LIST_TITLE');

const initialLists = {
  0: {
    id: 0,
    title: 'TODO',
  },
  1: {
    id: 1,
    title: 'In Progress',
  },
  2: {
    id: 2,
    title: 'Testing',
  },
  3: {
    id: 3,
    title: 'Done',
  },
};

export default handleActions({
  [setListTitle](state, { payload: { id, title } }) {
    return { ...state, [id]: { ...state[id], title } };
  },
}, initialLists);
