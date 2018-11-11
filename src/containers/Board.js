import { connect } from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = ({ username, lists }) => ({
  username,
  lists: Object.values(lists),
});

export default connect(mapStateToProps)(Board);
