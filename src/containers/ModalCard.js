import { connect } from 'react-redux';
import ModalCard from '../components/ModalCard';

import { setCardTitle } from '../actions';

import { getCommentsByCardId } from '../state-helpers/comments';
import { getCard } from '../state-helpers/cards';
import { getList } from '../state-helpers/lists';

const mapStateToProps = ({
  lists, cards, comments, username,
}, { activeCardId }) => {
  const {
    title, author, desc, listId,
  } = getCard(activeCardId, cards);

  const { title: listTitle } = getList(listId, lists);

  return {
    desc,
    title,
    author,
    username,
    listTitle,
    comments: getCommentsByCardId(activeCardId, comments),
  };
};

const mapDispatchToProps = (dispatch, { activeCardId }) => ({
  setCardTitle: title => dispatch(setCardTitle({ id: activeCardId, title })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
