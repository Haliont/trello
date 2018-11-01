import './ModalCard.css';
import React from 'react';
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
  title, listTitle, onSetTitle, username,
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
            ['Автор карточки:', username],
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
  comments, onAddComment, onUpdateComment, onRemoveComment,
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
                onUpdateComment={onUpdateComment(id)}
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

function ModalCard({
  title,
  listTitle,
  desc,
  username,
  onSetDesc,
  onSetTitle,
  comments,
  onAddComment,
  onRemoveComment,
  onSetCommentText,
}) {
  return (
    <div className="modal-card">
      <ModalCardHeader
        title={title}
        username={username}
        listTitle={listTitle}
        onSetTitle={onSetTitle}
      />
      <section className="modal-card-body">
        <ModalCardDesc
          desc={desc}
          onSetDesc={onSetDesc}
        />
        <ModalCardComments
          comments={comments}
          onAddComment={onAddComment}
          onUpdateComment={onSetCommentText}
          onRemoveComment={onRemoveComment}
        />
      </section>
      <footer className="modal-card-foot" />
    </div>
  );
}

export default ModalCard;
