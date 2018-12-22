import { connect } from 'react-redux';
import Board from '../components/Board';

// import { setListTitle } from '../reducers/lists';
// import { addCard, removeCard, moveCard } from '../reducers/cards';

import * as cardsActions from '../store/cards/actions';
import * as boardsActions from '../store/boards/actions';

import * as userSelectors from '../store/user/selectors';
import * as boardsSelectors from '../store/boards/selectors';
import * as cardsSelectors from '../store/cards/selectors';
import * as commentsSelectors from '../store/comments/selectors';

const mapStateToProps = (state, { match: { params: { id } } }) => {
  const boardsById = boardsSelectors.getBoardsMap(state)[id];
  const boardCards = cardsSelectors.getCardsByBoardId(state, id);

  const lists = [
    {
      id: 'todo',
      title: boardsById.todoTitle,
      cards: cardsSelectors.filterCardsByState(boardCards, 'todo'),
    },
    {
      id: 'progress',
      title: boardsById.progressTitle,
      cards: cardsSelectors.filterCardsByState(boardCards, 'progress'),
    },
    {
      id: 'testing',
      title: boardsById.testingTitle,
      cards: cardsSelectors.filterCardsByState(boardCards, 'testing'),
    },
    {
      id: 'done',
      title: boardsById.todoTitle,
      cards: cardsSelectors.filterCardsByState(boardCards, 'done'),
    },
  ];

  return {
    lists,
    username: userSelectors.getUsername(state),
    comments: commentsSelectors.getComments(state),
  };
};

export default connect(
  mapStateToProps,
  { ...cardsActions, ...boardsActions },
)(Board);
