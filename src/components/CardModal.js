import './CardModal.css';
import React from 'react';
import TextEditor from './TextEditor';
import CardComments from './CardComments';

const Bg = () => <div className="CardModal-Bg modal-background" />;
const Card = ({ children }) => (
  <div className="CardModal-Card modal-card">{children}</div>
);
const CardBody = ({ children }) => (
  <section className="modal-card-body">{children}</section>
);

const CardHeader = ({
  title, updateTitle, listTitle, username, onClose,
}) => (
  <header className="CardModal-CardHead modal-card-head">
    <div className="CardModal-CardHeadInfo">
      <TextEditor value={title} onTextSave={updateTitle} />
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

function CardDescription({ description, updateDescription }) {
  return (
    <div className="Description">
      <h2>Описание:</h2>
      <TextEditor
        value={description || 'Добавить описание карточки'}
        onTextSave={updateDescription}
      />
    </div>
  );
}

const CardModal = (props) => {
  const {
    title,
    description,
    listTitle,
    username,
    updateTitle,
    updateDescription,
    onClose,
    comments,
    onAddComment,
    onRemoveComment,
    onUpdateComment,
  } = props;

  return (
    <div className="CardModal modal">
      <Bg />
      <Card>
        <CardHeader
          title={title}
          username={username}
          listTitle={listTitle}
          onClose={onClose}
          updateTitle={updateTitle}
        />
        <CardBody>
          <CardDescription
            description={description}
            updateDescription={updateDescription}
          />
          <CardComments
            comments={comments}
            onAddComment={onAddComment}
            onUpdateComment={onUpdateComment}
            onRemoveComment={onRemoveComment}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CardModal;
