import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import AddForm from './AddForm';
import './Boards.css';

const BoardCard = ({ id, title, onRemove }) => (
  <Link to={`/dashboard/${id}-${title}`} className="Boards-Board">
    <h3 className="Boards-BoardTitle">
      <div>
        {title}
      </div>
    </h3>
    <span className="Boards-BoardFade" />
    <button
      style={{ opacity: '1' }}
      type="button"
      onClick={onRemove}
      className="Card-Del delete btn-reset"
    />
  </Link>
);

class Boards extends Component {
  componentDidMount() {
    const { fetchComments, fetchCards, fetchBoards } = this.props;
    fetchBoards();
    fetchCards();
    fetchComments();
  }

  handleAddNewBoard = (boardTitle) => {
    const { addBoard } = this.props;
    addBoard(boardTitle);
  };

  handleRemoveBoard = boardId => (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { removeBoard } = this.props;
    removeBoard(boardId);
  }

  render() {
    const { isBusy, username, boards } = this.props;

    if (isBusy) {
      return <Spinner />;
    }

    return (
      <div className="Boards">
        <div className="Boards-Inner">
          <h2 className="Boards-Header">
            Привет,
            {' '}
            {username}
            . Выбери проект над которым хочешь работать или добавь новый.
          </h2>
          <div className="Boards-List">
            {boards.map(props => (
              <BoardCard
                key={props.id}
                onRemove={this.handleRemoveBoard(props.id)}
                {...props}
              />
            ))}
            <AddForm onSubmit={this.handleAddNewBoard} />
          </div>
        </div>
      </div>
    );
  }
}

export default Boards;
