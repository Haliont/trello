import { connect } from 'react-redux';
import Board from '../components/Board';
import { setListTitle } from '../reducers/lists';

import { addCard, removeCard } from '../reducers/cards';
import { openCard, closeCard } from '../reducers/activeCardId';

const mapStateToProps = ({
  username, lists, cards, comments, activeCardId,
}) => ({
  cards,
  username,
  comments,
  activeCardId,
  lists: Object.values(lists),
});

const mapDispatchToProps = {
  setListTitle,
  addCard,
  openCard,
  closeCard,
  removeCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
