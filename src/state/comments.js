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
const getCard = (id, comments) => comments.find(card => id === card.id);

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
  getCard,
  addComment,
  setCommentText,
  removeComment,
};
