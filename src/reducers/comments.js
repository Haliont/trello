import { createAction, handleActions } from 'redux-actions';
import { omit, omitBy } from 'lodash';
import { uid } from '../helpers';
import { removeCard } from './cards';

export const addComment = createAction('ADD_COMMENT');
export const removeComment = createAction('REMOVE_COMMENT');
export const setCommentText = createAction('SET_COMMENT_TEXT');

export default handleActions({
  [addComment](state, { payload: comment }) {
    const commentId = uid();
    return { ...state, [commentId]: { id: commentId, ...comment } };
  },
  [removeComment](state, { payload: id }) {
    return omit(state, [id]);
  },
  [removeCard](state, { payload: id }) {
    return omitBy(state, ({ cardId }) => cardId === id);
  },
  [setCommentText](state, { payload: { id, text } }) {
    const comment = state[id];
    const updatedComment = { ...comment, text };
    return { ...state, [id]: updatedComment };
  },
}, {});
