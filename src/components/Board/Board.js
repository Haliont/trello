import './Board.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import Route from 'react-router-dom/Route';
import CardList from '../CardList';
import Modal from '../Modal';
import ModalCard from '../../containers/ModalCard';
import TextEditor from '../TextEditor';

class Board extends Component {
  static propTypes = {
    lists: PropTypes.instanceOf(Array).isRequired,
    comments: PropTypes.instanceOf(Object).isRequired,
    setListTitle: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired,
    activeCardId: PropTypes.number,
  };

  static defaultProps = { activeCardId: null };

  componentDidMount() {
    // const { fetchCards } = this.props;
    // fetchCards();
  }

  handleCloseCard = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleOpenCard = cardId => () => {
    const { history, match: { url } } = this.props;
    history.push(`${url}/card-${cardId}`);
  };

  handleSetListTitle = listId => (newTitle) => {
    const { setListTitle, match } = this.props;
    const { params: { id: boardId } } = match;

    setListTitle({ id: boardId, listId, newTitle });
  };

  handleAddCard = state => (newCardTitle) => {
    const {
      username,
      addCard,
      match: { params },
    } = this.props;

    const newCard = {
      title: newCardTitle,
      author: username,
      boardId: params.id,
      desc: '',
      state,
    };

    addCard(newCard);
  };

  handleRemoveCard = cardId => (event) => {
    event.stopPropagation();
    const { removeCard } = this.props;
    removeCard(cardId);
  };

  handleRenameBoard = (newTitle) => {
    const { match, renameBoard } = this.props;
    const { params: { id: boardId } } = match;
    renameBoard({ id: boardId, newTitle });
  }

  onDragEnd = (result) => {
    const { moveCard } = this.props;
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }

    moveCard({
      cardId: draggableId,
      state: destination.droppableId,
    });
  }

  renderLists() {
    const { lists, comments } = this.props;
    const { onDragEnd } = this;

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="Board-ListsWrapper">
          <div className="Board-Lists">
            {lists.map(({ id, title, cards }) => (
              <CardList
                id={id}
                key={id}
                title={title}
                cards={cards}
                comments={comments}
                onSetTitle={this.handleSetListTitle(id)}
                onOpenCard={this.handleOpenCard}
                onRemoveCard={this.handleRemoveCard}
                onAddNewCard={this.handleAddCard(id)}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    );
  }

  render() {
    const { match } = this.props;
    const { title } = match.params;

    return (
      <div className="Board">
        <div className="Board-Header">
          <h2
            style={{ display: 'flex' }}
            className="Board-HeaderTitle"
          >
            Проект:
            {' '}
            <div style={{ marginLeft: '10px', width: '100%' }}>
              <TextEditor
                value={title}
                onTextSave={this.handleRenameBoard}
                editorType="input"
                formDirection="row"
              />
            </div>
          </h2>
        </div>
        {this.renderLists()}
        <Route
          path={`${match.url}/card-:id`}
          render={props => (
            <Modal isOpen onClose={this.handleCloseCard}>
              <ModalCard {...props} />
            </Modal>
          )}
        />
      </div>
    );
  }
}

export default Board;
