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
  addCommentInCard,
  removeCommentFromCard,
} from '../state/cards';

import { addComment, setCommentText, removeComment } from '../state/comments';

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
      cards: makeCards([]),
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
      desc: '',
      commentIds: [],
    };

    this.setState(({ lists, cards }) => ({
      lists: addCardInList(listId, newCardId, lists),
      cards: addCard(newCard, cards),
    }));
  };

  removeCardFromList = listId => cardId => (event) => {
    event.stopPropagation();

    this.setState(({ lists, cards }) => ({
      lists: removeCardFromList(listId, cardId, lists),
      cards: removeCard(cardId, cards),
    }));
  };

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

  setCardTitle = cardId => (newTitle) => {
    this.setState(({ cards }) => ({
      cards: setCardTitle(cardId, newTitle, cards),
    }));
  };

  updateCardDesc = cardId => (newDesc) => {
    this.setState(({ cards }) => ({
      cards: setCardDesc(cardId, newDesc, cards),
    }));
  };

  addCommentInCard = cardId => (commentText) => {
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

  updateComment = commentId => (newCommentText) => {
    this.setState(({ comments }) => ({
      comments: setCommentText(commentId, newCommentText, comments),
    }));
  };

  removeCommentFromCard = cardId => commentId => () => {
    this.setState(({ cards, comments }) => ({
      comments: removeComment(commentId, comments),
      cards: removeCommentFromCard(cardId, commentId, cards),
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
        title, desc, listTitle, cardId,
      },
    } = this.state;

    const { commentIds } = cards.find(({ id }) => id === cardId);
    const cardComments = comments.filter(({ id }) => commentIds.includes(id));

    return (
      <CardModal
        title={title}
        desc={desc}
        username={username}
        listTitle={listTitle}
        updateTitle={this.setCardTitle(cardId)}
        updateDesc={this.updateCardDesc(cardId)}
        comments={cardComments}
        onUpdateComment={this.updateComment}
        onRemoveComment={this.removeCommentFromCard(cardId)}
        onAddComment={this.addCommentInCard(cardId)}
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
