import { updateItem, uid } from '../helpers';

/*
comments = [
  {
    id: 0,
    title: 'Card title',
    desc: '',
    commentIds: [],
  },
]
* */

const make = (comments = []) => comments;
const getComment = (id, comments) => comments.find(comment => id === comment.id);
const getComments = (ids, comments) => comments.filter(comment => ids.includes(comment.id));

const addComment = (
  comment = {
    id: uid(),
    text: '',
    author: 'Anonim',
  },
  comments,
) => make([...comments, comment]);

const setCommentText = (commentId, text, comments) => updateItem(commentId, { text }, comments);
const removeComment = (commentId, comments) => comments.filter(comment => commentId !== comment.id);

export {
  make,
  getComment,
  getComments,
  addComment,
  setCommentText,
  removeComment,
};
