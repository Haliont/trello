import './Comment.css';
import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from './TextEditor';

function Comment({
  text, author, onUpdateComment, onRemoveComment,
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
            onTextSave={onUpdateComment}
          />
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
  onRemoveComment: PropTypes.func.isRequired,
};

export default Comment;
