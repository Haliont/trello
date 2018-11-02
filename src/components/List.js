import './List.css';
import React from 'react';
import Card from './Card';
import AddCardForm from './AddCardForm';
import TextEditor from './TextEditor';

import { getCommentsByCardId } from '../state-helpers/comments';

function List(props) {
  const {
    title,
    cards,
    comments,
    onSetTitle,
    onOpenCard,
    onAddNewCard,
    onRemoveCard,
  } = props;

  return (
    <div className="List">
      <div className="List-Content panel">
        <TextEditor
          value={title}
          onTextSave={onSetTitle}
          editorType="input"
          formDirection="row"
          viewClassName="panel-heading"
        />
        <div className="List-Cards panel-block">
          {cards.map(({ id, title: cardTitle }) => (
            <Card
              key={id}
              title={cardTitle}
              onOpen={onOpenCard(id)}
              onRemove={onRemoveCard(id)}
              commentsCount={getCommentsByCardId(id, comments).length}
            />
          ))}
        </div>
        <div className="List-Footer panel-block">
          <AddCardForm onAddNewCard={onAddNewCard} />
        </div>
      </div>
    </div>
  );
}

export default List;
