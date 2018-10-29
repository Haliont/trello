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
    updateTitle,
    updateDesc,
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
          <CardDesc
            desc={desc}
            updateDesc={updateDesc}
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
