import './ModalCard.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor';
import Comment from './Comment';
import AddCommentForm from './AddCommentForm';

function ModalCardDesc({ desc, onSetDesc }) {
  return (
    <div className="mb">
      <p className="is-size-5">Описание карточки:</p>
      <TextEditor
        value={desc || 'Добавить описание'}
        btnText="Сохранить"
        onTextSave={onSetDesc}
      />
    </div>
  );
}

function ModalCardHeader({
  title, listTitle, onSetTitle, author,
}) {
  return (
    <header className="modal-card-head flex">
      <div className="fg-1">
        <TextEditor
          value={title}
          editorType="input"
          formDirection="row"
          onTextSave={onSetTitle}
          viewClassName="modal-card-title is-size-3 mb"
        />
        {
          [
            ['На списке:', listTitle],
            ['Автор карточки:', author],
          ].map(([key, value]) => (
            <p key={value} className="is-size-7">
              <span>
                {key}
                {' '}
              </span>
              <span className="is-italic">{value}</span>
            </p>
          ))
        }
      </div>
    </header>
  );
}

function ModalCardComments({
  comments, onAddComment, onRemoveComment, onSetCommentText,
}) {
  return (
    <div className="mb">
      <p className="is-size-5">Комментарии:</p>
      <div className="mb">
        {
          comments.length === 0
            ? 'Комментариев нет'
            : comments.map(({ id, text, author }) => (
              <Comment
                key={id}
                text={text}
                author={author}
                onSetCommentText={onSetCommentText(id)}
                onRemoveComment={onRemoveComment(id)}
              />
            ))
        }
      </div>
      <div>
        <p className="is-size-5">Добавить комментарий</p>
        <AddCommentForm onAddComment={onAddComment} />
      </div>
    </div>
  );
}

class ModalCard extends Component {
  static propTypes = {
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    comments: PropTypes.instanceOf(Array).isRequired,
    listTitle: PropTypes.string.isRequired,
    addComment: PropTypes.func.isRequired,
    setCardDesc: PropTypes.func.isRequired,
    setCardTitle: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    setCommentText: PropTypes.func.isRequired,
  };

  handleSetCardTitle = (newTitle) => {
    const { setCardTitle } = this.props;
    setCardTitle(newTitle);
  };

  handleSetCardDesc = (newDesc) => {
    const { setCardDesc } = this.props;
    setCardDesc(newDesc);
  };

  handleAddComment = (commentText) => {
    const { username, addComment } = this.props;

    const newComment = {
      text: commentText,
      author: username,
    };

    addComment(newComment);
  };

  handleRemoveComment = commentId => () => {
    const { removeComment } = this.props;
    removeComment(commentId);
  };

  handleSetCommentText = commentId => (newCommentText) => {
    const { setCommentText } = this.props;
    setCommentText({ id: commentId, text: newCommentText });
  };

  render() {
    const {
      desc,
      title,
      author,
      comments,
      listTitle,
    } = this.props;

    return (
      <div className="modal-card">
        <ModalCardHeader
          title={title}
          author={author}
          listTitle={listTitle}
          onSetTitle={this.handleSetCardTitle}
        />
        <section className="modal-card-body">
          <ModalCardDesc
            desc={desc}
            onSetDesc={this.handleSetCardDesc}
          />
          <ModalCardComments
            comments={comments}
            onAddComment={this.handleAddComment}
            onSetCommentText={this.handleSetCommentText}
            onRemoveComment={this.handleRemoveComment}
          />
        </section>
        <footer className="modal-card-foot" />
      </div>
    );
  }
}

export default ModalCard;
