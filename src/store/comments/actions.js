import { createAction } from 'redux-actions';
import axios from 'axios';

const secretKey = 'ygg0KKW6tJ89txLJX5wwJTPyGzHEgrNghoUfOHP5';

export const addComment = createAction('ADD_COMMENT');
export const removeComment = createAction('REMOVE_COMMENT');
export const setCommentText = createAction('SET_COMMENT_TEXT');

export const fetchCommentsRequest = createAction('FETCH_COMMENTS_REQUEST');
export const fetchCommentsSuccess = createAction('FETCH_COMMENTS_SUCCESS');
export const fetchCommentsFailure = createAction('FETCH_COMMENTS_FAILURE');

export const fetchComments = () => async (dispatch) => {
  dispatch(fetchCommentsRequest());
  try {
    // await sleep(2000);
    const { data } = await axios.get(
      `https://canban-projects.firebaseio.com/storage/commentsById.json?auth=${secretKey}`,
    );
    dispatch(fetchCommentsSuccess(data));
  } catch (e) {
    dispatch(fetchCommentsFailure());
  }
};
