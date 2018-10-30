import './Board.css';
import React, { Component } from 'react';
import List from './List';
import CardModal from './CardModal';
import { uid } from '../helpers';

import {
  make as makeLists,
  setListTitle,
  addCardInList,
  removeCardFromList,
  getList,
} from '../state/lists';

import {
  make as makeCards,
  addCard,
  removeCard,
  setCardTitle,
  setCardDesc,
  getCard,
  getCards,
  addCommentInCard,
  removeCommentFromCard,
} from '../state/cards';

import {
  addComment,
  setCommentText,
  removeComment,
  getComments,
} from '../state/comments';

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
  state = {
    lists: makeLists(initialLists),
    cards: makeCards([]),
    comments: [],
    modalData: {
      title: '',
      desc: '',
      listTitle: '',
      cardId: [],
    },
    isOpenModal: false,
  };

  componentWillMount() {
    this.fetchData();
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidUpdate() {
    const { lists, cards, comments } = this.state;
    const boardData = JSON.stringify({ lists, cards, comments });
    localStorage.boardData = boardData;
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = ({ key }) => {
    if (key !== 'Escape') {
      return;
    }
    this.closeCardModal();
  }

  closeCardModal = () => {
    this.setState({ isOpenModal: false });
  };

  openCardModal = listId => cardId => () => {
    this.setState(({ cards, lists }) => {
      const { desc, title, commentIds } = getCard(cardId, cards);
      const { title: listTitle } = getList(listId, lists);

      return {
        modalData: {
          desc,
          title,
          cardId,
          listTitle,
          commentIds,
        },
        isOpenModal: true,
      };
    });
  };

  handleSetListTitle = listId => (newTitle) => {
    this.setState(({ lists }) => ({
      lists: setListTitle(listId, newTitle, lists),
    }));
  };

  handleAddCard = listId => (newCardTitle) => {
    const newCardId = uid();

    const newCard = {
      id: newCardId,
      title: newCardTitle,
      desc: '',
      commentIds: [],
    };

    this.setState(({ lists, cards }) => ({
      lists: addCardInList(listId, newCardId, lists),
      cards: addCard(newCard, cards),
    }));
  };

  handleRemoveCard = listId => cardId => (event) => {
    event.stopPropagation();

    this.setState(({ lists, cards }) => ({
      lists: removeCardFromList(listId, cardId, lists),
      cards: removeCard(cardId, cards),
    }));
  };

  handleSetCardTitle = cardId => (newTitle) => {
    this.setState(({ cards }) => ({
      cards: setCardTitle(cardId, newTitle, cards),
    }));
  };

  handleSetCardDesc = cardId => (newDesc) => {
    this.setState(({ cards }) => ({
      cards: setCardDesc(cardId, newDesc, cards),
    }));
  };

  handleAddComment = cardId => (commentText) => {
    this.setState(({ cards, comments }, { username }) => {
      const newCommentId = uid();

      const newComment = {
        id: newCommentId,
        text: commentText,
        author: username,
      };

      return {
        comments: addComment(newComment, comments),
        cards: addCommentInCard(cardId, newCommentId, cards),
      };
    });
  };

  handleRemoveComment = cardId => commentId => () => {
    this.setState(({ cards, comments }) => ({
      comments: removeComment(commentId, comments),
      cards: removeCommentFromCard(cardId, commentId, cards),
    }));
  };

  handleSetCommentText = commentId => (newCommentText) => {
    this.setState(({ comments }) => ({
      comments: setCommentText(commentId, newCommentText, comments),
    }));
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
        {lists.map(({ id, title, cardIds }) => (
          <List
            key={id}
            title={title}
            cards={getCards(cardIds, cards)}
            onSetTitle={this.handleSetListTitle(id)}
            onOpenCard={this.openCardModal(id)}
            onRemoveCard={this.handleRemoveCard(id)}
            onAddNewCard={this.handleAddCard(id)}
          />
        ))}
      </div>
    );
  }

  renderModal() {
    const {
      cards,
      comments,
      modalData: {
        title,
        desc,
        listTitle,
        cardId,
      },
    } = this.state;

    const { username } = this.props;
    const { commentIds } = getCard(cardId, cards);

    return (
      <CardModal
        title={title}
        desc={desc}
        username={username}
        listTitle={listTitle}
        updateTitle={this.handleSetCardTitle(cardId)}
        updateDesc={this.handleSetCardDesc(cardId)}
        comments={getComments(commentIds, comments)}
        onUpdateComment={this.handleSetCommentText}
        onRemoveComment={this.handleRemoveComment(cardId)}
        onAddComment={this.handleAddComment(cardId)}
        onClose={this.closeCardModal}
      />
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
