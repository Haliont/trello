import axios from 'axios';
import { createAction } from 'redux-actions';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const secretKey = 'ygg0KKW6tJ89txLJX5wwJTPyGzHEgrNghoUfOHP5';

export const fetchBoardsRequest = createAction('FETCH_BOARDS_REQUEST');
export const fetchBoardsSuccess = createAction('FETCH_BOARDS_SUCCESS');
export const fetchBoardsFailure = createAction('FETCH_BOARDS_FAILURE');

export const addBoardRequest = createAction('ADD_BOARD_REQUEST');
export const addBoardSuccess = createAction('ADD_BOARD_SUCCESS');
export const addBoardFailure = createAction('ADD_BOARD_FAILURE');

export const removeBoard = createAction('REMOVE_BOARD');
export const renameBoard = createAction('RENAME_BOARD');
export const setListTitle = createAction('SET_LIST_TITLE');


export const fetchBoards = () => async (dispatch) => {
  dispatch(fetchBoardsRequest());
  try {
    // await sleep(2000);
    const { data } = await axios.get(
      `https://canban-projects.firebaseio.com/storage/boardsById.json?auth=${secretKey}`,
    );
    dispatch(fetchBoardsSuccess(data));
  } catch (e) {
    dispatch(fetchBoardsFailure());
  }
};

export const addBoard = boardTitle => async (dispatch) => {
  dispatch(addBoardRequest());
  try {
    // await sleep(2000);
    dispatch(addBoardSuccess(boardTitle));
  } catch (e) {
    dispatch(addBoardFailure());
  }
};
