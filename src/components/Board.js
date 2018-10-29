import './Board.css';
import React, { Component } from 'react';
import List from './List';
import CardModal from './CardModal';
import { updateItem, uid } from '../helpers';
import {
  make as makeLists,
  setListTitle,
  addCardInList,
  removeCardFromList,
  getList,
} from '../state/lists';

const initialLists = [
  {
    id: 0,
    title: 'TODO',
    cardIds: [],
  },
  {
    id: 1,
    title: 'In Progress',
    cardIds: [],
  },
  {
    id: 2,
    title: 'Testing',
    cardIds: [],
  },
  {
    id: 3,
    title: 'Done',
    cardIds: [],
  },
];

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: makeLists(initialLists),
      cards: [],
      comments: [],
      modalData: {
        title: '',
      },
      isOpenModal: false,
    };
    window.addEventListener('keyup', ({ key }) => {
      if (key !== 'Escape') {
        return;
      }
      this.closeCardModal();
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { lists, cards, comments } = this.state;
    const boardData = JSON.stringify({ lists, cards, comments });
    localStorage.boardData = boardData;
  }

  setListTitle = listId => (newTitle) => {
    this.setState(({ lists }) => ({
      lists: setListTitle(listId, newTitle, lists),
    }));
  };

  addCardInList = listId => (newCardTitle) => {
    const newCardId = uid();
    const newCard = {
      id: newCardId,
      title: newCardTitle,
      description: '',
      commentIds: [],
    };

    this.setState(({ lists, cards }) => {
      const newCards = [...cards, newCard];
      return {
        lists: addCardInList(listId, newCardId, lists),
        cards: newCards,
      };
    });
  };

  removeCardFromList = listId => cardId => (event) => {
    event.stopPropagation();

    this.setState(({ lists, cards }) => {
      const filteredCards = cards.filter(({ id }) => id !== cardId);
      return {
        lists: removeCardFromList(listId, cardId, lists),
        cards: filteredCards,
      };
    });
  };

  closeCardModal = () => {
    this.setState({ isOpenModal: false });
  };

  openCardModal = listId => cardId => () => {
    const { cards, lists } = this.state;

    const { title: cardTitle, description, commentIds } = cards.find(
      ({ id }) => id === cardId,
    );

    const { title: listTitle } = getList(listId, lists);

    const modalData = {
      title: cardTitle,
      commentIds,
      description,
      listTitle,
      cardId,
    };

    this.setState({ isOpenModal: true, modalData });
  };

  updateCardTitle = cardId => (newTitle) => {
    const { cards } = this.state;
    const updatedCards = updateItem(cardId, { title: newTitle }, cards);
    this.setState({ cards: updatedCards });
  };

  updateCardDescription = cardId => (newDescription) => {
    const { cards } = this.state;
    const updatedCards = updateItem(cardId, {
      description: newDescription,
    }, cards);
    this.setState({ cards: updatedCards });
  };

  addCommentInCard = cardId => (commentText) => {
    const { cards, comments } = this.state;
    const { username } = this.props;
    const newCommentId = uid();
    const newComment = {
      id: newCommentId,
      text: commentText,
      author: username,
    };
    const newComments = [...comments, newComment];
    const { commentIds } = cards.find(({ id }) => cardId === id);
    const newCommentIds = [...commentIds, newCommentId];
    const updatedCards = updateItem(cardId, {
      commentIds: newCommentIds,
    }, cards);
    this.setState({ comments: newComments, cards: updatedCards });
  };

  updateComment = commentId => (newCommentText) => {
    const { comments } = this.state;
    const updatedComments = updateItem(commentId, {
      text: newCommentText,
    }, comments);
    this.setState({ comments: updatedComments });
  };

  removeCommentFromCard = cardId => commentId => () => {
    const { cards, comments } = this.state;
    const { commentIds } = cards.find(({ id }) => cardId === id);
    const newCommentIds = commentIds.filter(id => commentId !== id);
    const updatedCards = updateItem(cardId, {
      commentIds: newCommentIds,
    }, cards);
    const newComments = comments.filter(({ id }) => commentId !== id);
    this.setState({
      comments: newComments,
      cards: updatedCards,
    });
  };

  fetchData() {
    const { boardData } = localStorage;
    if (!boardData) {
      return;
    }
    const { lists, cards, comments } = JSON.parse(boardData);
    this.setState({ lists, cards, comments });
  }

  renderLists() {
    const { lists, cards } = this.state;
    return (
      <div className="Board-Lists">
        {lists.map(({ id, title, cardIds }) => {
          const listCards = cards.filter(card => cardIds.includes(card.id));

          return (
            <List
              key={id}
              cards={listCards}
              title={title}
              titleUpdate={this.setListTitle(id)}
              onOpenCard={this.openCardModal(id)}
              onRemoveCard={this.removeCardFromList(id)}
              onAddNewCard={this.addCardInList(id)}
            />
          );
        })}
      </div>
    );
  }

  renderModal() {
    const { username } = this.props;
    const {
      cards,
      comments,
      modalData: {
        title, description, listTitle, cardId,
      },
    } = this.state;

    const { commentIds } = cards.find(({ id }) => id === cardId);
    const cardComments = comments.filter(({ id }) => commentIds.includes(id));

    return (
      <CardModal
        title={title}
        description={description}
        username={username}
        listTitle={listTitle}
        updateTitle={this.updateCardTitle(cardId)}
        updateDescription={this.updateCardDescription(cardId)}
        comments={cardComments}
        onUpdateComment={this.updateComment}
        onRemoveComment={this.removeCommentFromCard(cardId)}
        onAddComment={this.addCommentInCard(cardId)}
        onClose={this.closeCardModal}
      />
      // <CardModal
      //   title={title}
      //   description={description}
      //   username={username}
      //   listTitle={listTitle}
      //   updateTitle={this.updateCardTitle(cardId)}
      //   updateDescription={this.updateCardDescription(cardId)}
      //   comments={cardComments}
      //   onUpdateComment={this.updateComment}
      //   onAddComment={this.addCommentInCard(cardId)}
      //   onRemoveComment={this.removeCommentFromCard(cardId)}
      //   onClose={this.closeCardModal}
      // />
    );
  }

  render() {
    const { isOpenModal } = this.state;

    return (
      <div className="Board">
        {this.renderLists()}
        {isOpenModal && this.renderModal()}
      </div>
    );
  }
}

export default Board;
