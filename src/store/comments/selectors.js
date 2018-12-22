import _ from 'lodash';
import { createSelector } from 'reselect';

export const getComments = state => state.comments.commentsById;

export const getCommentsByCardId = (comments, cardId) => Object.values(
  // eslint-disable-next-line
  _.pickBy(comments, comment => comment.cardId == cardId),
);

export const isFetching = createSelector(
  state => state.comments,
  comments => comments.commentsFetchingState === 'requested',
);
