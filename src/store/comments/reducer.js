import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as commentActions from './actions';
import * as cardsActions from '../cards/actions';
import { uid } from '../../utils';

const commentsById = handleActions({
  [commentActions.fetchCommentsSuccess](_a, { payload }) {
    return payload || {};
  },
  [commentActions.addComment](state, { payload: comment }) {
    const commentId = uid();
    return { ...state, [commentId]: { id: commentId, ...comment } };
  },
  [commentActions.removeComment](state, { payload: id }) {
    return _.omit(state, [id]);
  },
  [cardsActions.removeCard](state, { payload: id }) {
    return _.omitBy(state, ({ cardId }) => cardId === id);
  },
  [commentActions.setCommentText](state, { payload: { id, text } }) {
    const comment = state[id];
    const updatedComment = { ...comment, text };
    return { ...state, [id]: updatedComment };
  },
}, {});

const commentsFetchingState = handleActions({
  [commentActions.fetchCommentsRequest]() {
    return 'requested';
  },
  [commentActions.fetchCommentsSuccess]() {
    return 'success';
  },
  [commentActions.fetchCommentsFailure]() {
    return 'failed';
  },
}, 'none');

export default combineReducers({
  commentsById,
  commentsFetchingState,
});
