import './Board.css';
import React, { Component } from 'react';
import CardList from './CardList';
// import Modal from './Modal';
// import ModalCard from './ModalCard';
import { uid } from '../helpers';

import {
  addCard,
  removeCard,
  setCardTitle,
  setCardDesc,
  // getCard,
  // getCardsByListId,
} from '../state-helpers/cards';

import {
  addComment,
  setCommentText,
  removeComment,
  removeCommentsByCardId,
  // getCommentsByCardId,
} from '../state-helpers/comments';

import { setListTitle } from '../actions';

class Board extends Component {
  state = {
    // lists: initialLists,
    // cards: {},
    // comments: {},
    // activeCardId: null,
  };

  handleCloseCard = () => {
    // this.setState({ isCardOpen: false, activeCardId: null });
  };

  handleOpenCard = () => () => {
    // this.setState({ activeCardId: cardId, isCardOpen: true });
  };

  handleSetListTitle = listId => (newTitle) => {
    const { dispatch } = this.props;
    dispatch(setListTitle({ id: listId, title: newTitle }));
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

  renderLists() {
    const { lists, cards } = this.props;
    return (
      <div className="Board-ListsWrapper">
        <div className="Board-Lists">
          {lists.map(({ id, title }) => (
            <CardList
              key={id}
              title={title}
              cards={cards}
              // cards={getCardsByListId(id, cards)}
              // comments={comments}
              onSetTitle={this.handleSetListTitle(id)}
              // onOpenCard={this.handleOpenCard}
              // onRemoveCard={this.handleRemoveCard}
              // onAddNewCard={this.handleAddCard(id)}
            />
          ))}
        </div>
      </div>
    );
  }

  // renderModal() {
  //   const {
  //     cards, lists, comments, activeCardId,
  //   } = this.state;

  //   const {
  //     title, desc, author, listId,
  //   } = getCard(activeCardId, cards);

  //   const { title: listTitle } = getList(listId, lists);
  //   const cardComments = getCommentsByCardId(activeCardId, comments);

  // //   return (
  // //     <Modal isOpen onClose={this.handleCloseCard}>
  // //       <ModalCard
  // //         desc={desc}
  // //         title={title}
  // //         comments={cardComments}
  // //         author={author}
  // //         listTitle={listTitle}
  // //         onSetDesc={this.handleSetCardDesc(activeCardId)}
  // //         onSetTitle={this.handleSetCardTitle(activeCardId)}
  // //         onAddComment={this.handleAddComment(activeCardId)}
  // //         onRemoveComment={this.handleRemoveComment}
  // //         onSetCommentText={this.handleSetCommentText}
  // //       />
  // //     </Modal>
  // //   );
  // // }

  render() {
    return (
      <div className="Board">
        {this.renderLists()}
        {/* {isCardOpen && this.renderModal()} */}
      </div>
    );
  }
}

export default Board;
