import './Board.css';
import React, { Component } from 'react';
import CardList from './CardList';
import Modal from './Modal';
import ModalCard from '../containers/ModalCard';

import { getCardsByListId } from '../state-helpers/cards';

import {
  setListTitle,
  addCard,
  removeCard,
  openCard,
  closeCard,
} from '../actions';

class Board extends Component {
  handleCloseCard = () => {
    const { dispatch } = this.props;
    dispatch(closeCard());
  };

  handleOpenCard = cardId => () => {
    const { dispatch } = this.props;
    dispatch(openCard(cardId));
  };

  handleSetListTitle = listId => (newTitle) => {
    const { dispatch } = this.props;
    dispatch(setListTitle({ id: listId, title: newTitle }));
  };

  handleAddCard = listId => (newCardTitle) => {
    const {
      username,
      dispatch,
    } = this.props;

    const newCard = {
      title: newCardTitle,
      author: username,
      desc: '',
      listId,
    };

    dispatch(addCard(newCard));
  };

  handleRemoveCard = cardId => (event) => {
    event.stopPropagation();
    const { dispatch } = this.props;
    dispatch(removeCard(cardId));
  };

  renderLists() {
    const { lists, cards, comments } = this.props;
    return (
      <div className="Board-ListsWrapper">
        <div className="Board-Lists">
          {lists.map(({ id, title }) => (
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

  render() {
    const { activeCardId } = this.props;
    return (
      <div className="Board">
        {this.renderLists()}
        {activeCardId && (
          <Modal isOpen onClose={this.handleCloseCard}>
            <ModalCard activeCardId={activeCardId} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Board;
