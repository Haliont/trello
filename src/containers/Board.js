import { connect } from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = ({
  username, lists, cards, comments,
}) => ({
  cards,
  username,
  comments,
  lists: Object.values(lists),
});

export default connect(mapStateToProps)(Board);
