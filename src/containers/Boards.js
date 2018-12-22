import { connect } from 'react-redux';
import Boards from '../components/Boards';
import * as boardsActions from '../store/boards/actions';
import * as cardsActions from '../store/cards/actions';
import * as commentsActions from '../store/comments/actions';


import * as boardsSelectors from '../store/boards/selectors';
import * as cardsSelectors from '../store/cards/selectors';
import * as commentsSelectors from '../store/comments/selectors';
import * as userSelectors from '../store/user/selectors';

const mapStateToProps = state => ({
  username: userSelectors.getUsername(state),
  boards: boardsSelectors.getBoardsList(state),
  isBusy: boardsSelectors.isFetching(state)
    || cardsSelectors.isFetching(state)
    || commentsSelectors.isFetching(state),
});

export default connect(mapStateToProps, {
  ...boardsActions,
  ...cardsActions,
  ...commentsActions,
})(Boards);
