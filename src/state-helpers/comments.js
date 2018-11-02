import _ from 'lodash';
import { uid } from '../helpers';

const getComment = (id, comments) => comments[id];
const getCommentsByCardId = (cardId, comments) => Object
  .values(_.pickBy(comments, comment => comment.cardId === cardId));

const addComment = (
  comment = {
    id: uid(),
    text: '',
    author: 'Anonim',
  },
  comments,
) => ({ ...comments, [comment.id]: comment });

const setCommentText = (commentId, text, comments) => {
  const comment = comments[commentId];
  const updatedComment = { ...comment, text };
  return { ...comments, [commentId]: updatedComment };
};

const removeComment = (commentId, comments) => _.omit(comments, commentId);
const removeCommentsByCardId = (cardId, comments) => _
  .omitBy(comments, comment => comment.cardId === cardId);

export {
  getComment,
  getCommentsByCardId,
  addComment,
  removeCommentsByCardId,
  setCommentText,
  removeComment,
};
