import './List.css';
import React from 'react';
import Card from './Card';
import AddCardForm from './AddCardForm';
import TextEditor from './TextEditor';

function List(props) {
  const {
    title,
    cards,
    onSetTitle,
    onOpenCard,
    onAddNewCard,
    onRemoveCard,
  } = props;

  return (
    <div className="List">
      <div className="List-Content panel">
        <TextEditor onTextSave={onSetTitle} value={title} />
        <div className="List-Cards panel-block">
          {cards.map(({ id, title: cardTitle, commentIds }) => (
            <Card
              key={id}
              title={cardTitle}
              onOpen={onOpenCard(id)}
              onRemove={onRemoveCard(id)}
              commentsCount={commentIds.length}
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
