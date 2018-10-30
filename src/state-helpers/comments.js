import { updateItem, uid } from '../helpers';

const getComment = (id, comments) => comments.find(comment => id === comment.id);
const getComments = (ids, comments) => comments.filter(comment => ids.includes(comment.id));

const addComment = (
  comment = {
    id: uid(),
    text: '',
    author: 'Anonim',
  },
  comments,
) => [...comments, comment];

const setCommentText = (commentId, text, comments) => updateItem(commentId, { text }, comments);
const removeComment = (commentId, comments) => comments.filter(comment => commentId !== comment.id);

export {
  getComment,
  getComments,
  addComment,
  setCommentText,
  removeComment,
};
