import './Board.css';
import React, { Component } from 'react';
import CardList from './CardList';
import Modal from './Modal';
import ModalCard from './ModalCard';
import { uid } from '../helpers';

import {
  setListTitle,
  getList,
} from '../state-helpers/lists';

import {
  addCard,
  removeCard,
  setCardTitle,
  setCardDesc,
  getCard,
  getCardsByListId,
} from '../state-helpers/cards';

import {
  addComment,
  setCommentText,
  removeComment,
  removeCommentsByCardId,
  getCommentsByCardId,
} from '../state-helpers/comments';

const initialLists = {
  0: {
    id: 0,
    title: 'TODO',
  },
  1: {
    id: 1,
    title: 'In Progress',
  },
  2: {
    id: 2,
    title: 'Testing',
  },
  3: {
    id: 3,
    title: 'Done',
  },
};

class Board extends Component {
  state = {
    lists: initialLists,
    cards: {},
    comments: {},
    activeCardId: null,
    isCardOpen: false,
  };

  componentWillMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { lists, cards, comments } = this.state;
    const boardData = JSON.stringify({ lists, cards, comments });
    localStorage.boardData = boardData;
  }

  handleCloseCard = () => {
    this.setState({ isCardOpen: false, activeCardId: null });
  };

  handleOpenCard = cardId => () => {
    this.setState({ activeCardId: cardId, isCardOpen: true });
  };

  handleSetListTitle = listId => (newTitle) => {
    this.setState(({ lists }) => ({
      lists: setListTitle(listId, newTitle, lists),
    }));
  };

  handleAddCard = listId => (newCardTitle) => {
    const { username } = this.props;

    const newCard = {
      id: uid(),
      title: newCardTitle,
      author: username,
      desc: '',
      listId,
    };

    this.setState(({ cards }) => ({
      cards: addCard(newCard, cards),
    }));
  };

  handleRemoveCard = cardId => (event) => {
    event.stopPropagation();

    this.setState(({ cards, comments }) => {
      const newComments = removeCommentsByCardId(cardId, comments);
      return {
        comments: newComments,
        cards: removeCard(cardId, cards),
      };
    });
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
    const { username } = this.props;

    const newComment = {
      id: uid(),
      text: commentText,
      author: username,
      cardId,
    };

    this.setState(({ comments }) => ({
      comments: addComment(newComment, comments),
    }));
  };

  handleRemoveComment = commentId => () => {
    this.setState(({ comments }) => ({
      comments: removeComment(commentId, comments),
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
    const { lists, cards, comments } = this.state;
    return (
      <div className="Board-ListsWrapper">
        <div className="Board-Lists">
          {Object.values(lists).map(({ id, title }) => (
            <CardList
              key={id}
              title={title}
              cards={getCardsByListId(id, cards)}
              comments={comments}
              onSetTitle={this.handleSetListTitle(id)}
              onOpenCard={this.handleOpenCard}
              onRemoveCard={this.handleRemoveCard}
              onAddNewCard={this.handleAddCard(id)}
            />
          ))}
        </div>
      </div>
    );
  }

  renderModal() {
    const {
      cards, lists, comments, activeCardId,
    } = this.state;

    const {
      title, desc, author, listId,
    } = getCard(activeCardId, cards);

    const { title: listTitle } = getList(listId, lists);
    const cardComments = getCommentsByCardId(activeCardId, comments);

    return (
      <Modal isOpen onClose={this.handleCloseCard}>
        <ModalCard
          desc={desc}
          title={title}
          comments={cardComments}
          author={author}
          listTitle={listTitle}
          onSetDesc={this.handleSetCardDesc(activeCardId)}
          onSetTitle={this.handleSetCardTitle(activeCardId)}
          onAddComment={this.handleAddComment(activeCardId)}
          onRemoveComment={this.handleRemoveComment}
          onSetCommentText={this.handleSetCommentText}
        />
      </Modal>
    );
  }

  render() {
    const { isCardOpen } = this.state;

    return (
      <div className="Board">
        {this.renderLists()}
        {isCardOpen && this.renderModal()}
      </div>
    );
  }
}

export default Board;
