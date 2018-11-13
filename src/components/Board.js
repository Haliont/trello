import './Board.css';
import React, { Component } from 'react';
import CardList from './CardList';
import Modal from './Modal';
import ModalCard from '../containers/ModalCard';

import { getCardsByListId } from '../helpers';

class Board extends Component {
  handleCloseCard = () => {
    const { closeCard } = this.props;
    closeCard();
  };

  handleOpenCard = cardId => () => {
    const { openCard } = this.props;
    openCard(cardId);
  };

  handleSetListTitle = listId => (newTitle) => {
    const { setListTitle } = this.props;
    setListTitle({ id: listId, title: newTitle });
  };

  handleAddCard = listId => (newCardTitle) => {
    const {
      username,
      addCard,
    } = this.props;

    const newCard = {
      title: newCardTitle,
      author: username,
      desc: '',
      listId,
    };

    addCard(newCard);
  };

  handleRemoveCard = cardId => (event) => {
    event.stopPropagation();
    const { removeCard } = this.props;
    removeCard(cardId);
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
