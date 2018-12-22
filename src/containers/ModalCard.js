import { connect } from 'react-redux';
import ModalCard from '../components/ModalCard';

import * as cardsActions from '../store/cards/actions';
import * as commentsActions from '../store/comments/actions';

import { getCommentsByCardId, getComments } from '../store/comments/selectors';
import { getUsername } from '../store/user/selectors';
import { getCardsMap } from '../store/cards/selectors';

const mapStateToProps = (
  state,
  { match: { params: { id } } },
) => {
  const {
    title, author, desc, state: cardState,
  } = getCardsMap(state)[id];

  const comments = getComments(state);

  return {
    desc,
    title,
    author,
    username: getUsername(state),
    listTitle: cardState,
    comments: getCommentsByCardId(comments, id),
  };
};

const mapDispatchToProps = (dispatch, { match: { params: { id } } }) => ({
  setCardTitle: title => dispatch(cardsActions.setCardTitle({ id, title })),
  setCardDesc: desc => dispatch(cardsActions.setCardDesc({ id, desc })),
  addComment: comment => dispatch(commentsActions.addComment({ cardId: id, ...comment })),
  removeComment: commentId => dispatch(commentsActions.removeComment(commentId)),
  setCommentText: comment => dispatch(commentsActions.setCommentText(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
