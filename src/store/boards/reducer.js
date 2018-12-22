import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as boardsActions from './actions';
import { uid } from '../../utils';

// const initialBoards = {
//   1: {
//     id: 1,
//     title: 'Фриланс площадка',
//     todoTitle: 'Todo',
//     doneTitle: 'Done',
//     testingTitle: 'Testing',
//     progressTitle: 'In progress',
//   },
//   2: {
//     id: 2,
//     title: 'Соц.сеть для аутистов',
//     todoTitle: 'Todo',
//     doneTitle: 'Done',
//     testingTitle: 'Testing',
//     progressTitle: 'In progress',
//   },
// };

const titlesMap = {
  todo: 'todoTitle',
  done: 'doneTitle',
  testing: 'testingTitle',
  progress: 'progressTitle',
};

const boardsById = handleActions({
  [boardsActions.fetchBoardsSuccess](_a, { payload }) {
    return payload || {};
  },
  [boardsActions.addBoardSuccess](state, { payload: title }) {
    const id = uid();
    const newBoard = {
      id,
      title,
      todoTitle: 'Todo',
      doneTitle: 'Done',
      testingTitle: 'Testing',
      progressTitle: 'In progress',
    };
    return { ...state, [id]: newBoard };
  },
  [boardsActions.setListTitle](state, { payload: { id, listId, newTitle } }) {
    return { ...state, [id]: { ...state[id], [titlesMap[listId]]: newTitle } };
  },
  [boardsActions.removeBoard](state, { payload: id }) {
    return _.omit(state, [id]);
  },
  [boardsActions.renameBoard](state, { payload: { id, newTitle } }) {
    const board = state[id];
    const updatedBoard = { ...board, title: newTitle };
    return { ...state, [id]: updatedBoard };
  },
}, {});

const boardsFetchingState = handleActions({
  [boardsActions.fetchBoardsRequest]() {
    return 'requested';
  },
  [boardsActions.fetchBoardsSuccess]() {
    return 'success';
  },
  [boardsActions.fetchBoardsFailure]() {
    return 'failed';
  },
}, 'none');

export default combineReducers({
  boardsById,
  boardsFetchingState,
});
