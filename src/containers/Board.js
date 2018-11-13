import { connect } from 'react-redux';
import Board from '../components/Board';
import * as actions from '../actions';

const mapStateToProps = ({
  username, lists, cards, comments, activeCardId,
}) => ({
  cards,
  username,
  comments,
  activeCardId,
  lists: Object.values(lists),
});

export default connect(mapStateToProps, actions)(Board);
