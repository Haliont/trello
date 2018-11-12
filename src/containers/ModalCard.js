import { connect } from 'react-redux';
import ModalCard from '../components/ModalCard';
import { getCommentsByCardId } from '../state-helpers/comments';
import { getCard } from '../state-helpers/cards';
import { getList } from '../state-helpers/lists';

const mapStateToProps = ({
  lists, cards, activeCardId, comments, username,
}) => {
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

export default connect(mapStateToProps)(ModalCard);
