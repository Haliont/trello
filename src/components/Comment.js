import './Comment.css';
import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor';

function Comment({
  text, author, onSetCommentText, onRemoveComment,
}) {
  return (
    <div className="Comment card">
      <header className="card-header">
        <p className="card-header-title">
          {author}
        </p>
        <button
          type="button"
          onClick={onRemoveComment}
          className="card-header-icon btn-reset"
        >
          <span className="delete" />
        </button>
      </header>
      <div className="card-content">
        <div className="content">
          <TextEditor
            value={text}
            btnText="Сохранить"
            onTextSave={onSetCommentText}
          />
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onSetCommentText: PropTypes.func.isRequired,
  onRemoveComment: PropTypes.func.isRequired,
};

export default Comment;
