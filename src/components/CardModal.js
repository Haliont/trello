import './CardModal.css';
import React from 'react';
import Modal from './Modal';
import TextEditor from './TextEditor';
import CardComments from './CardComments';

const Card = ({ children }) => (
  <div className="CardModal-Card modal-card">{children}</div>
);
const CardBody = ({ children }) => (
  <section className="modal-card-body">{children}</section>
);

const CardHeader = ({
  title, onSetTitle, listTitle, username, onClose,
}) => (
  <header className="CardModal-CardHead modal-card-head">
    <div className="CardModal-CardHeadInfo">
      <TextEditor value={title} onTextSave={onSetTitle} />
      <div className="CardModal-CardHeadList">
        <span>На списке: </span>
        <span>{listTitle}</span>
      </div>
      <div className="CardModal-CardHeadAuthor">
        <span>Автор: </span>
        <span>{username}</span>
      </div>
    </div>

    <button
      onClick={onClose}
      className="delete"
      aria-label="close"
      type="button"
    />
  </header>
);

function CardDesc({ desc, updateDesc }) {
  return (
    <div className="desc">
      <h2>Описание:</h2>
      <TextEditor
        value={desc || 'Добавить описание карточки'}
        onTextSave={updateDesc}
      />
    </div>
  );
}

const CardModal = (props) => {
  const {
    title,
    desc,
    listTitle,
    username,
    onSetTitle,
    updateDesc,
    onClose,
    comments,
    onAddComment,
    onRemoveComment,
    onSetCommentText,
  } = props;

  return (
    <Modal>
      <Card>
        <CardHeader
          title={title}
          username={username}
          listTitle={listTitle}
          onClose={onClose}
          onSetTitle={onSetTitle}
        />
        <CardBody>
          <CardDesc
            desc={desc}
            updateDesc={updateDesc}
          />
          <CardComments
            comments={comments}
            onAddComment={onAddComment}
            onSetCommentText={onSetCommentText}
            onRemoveComment={onRemoveComment}
          />
        </CardBody>
      </Card>
    </Modal>
  );
};

export default CardModal;
