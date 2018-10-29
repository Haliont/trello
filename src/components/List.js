import './List.css';
import React from 'react';
import Card from './Card';
import AddCardForm from './AddCardForm';
import TextEditor from './TextEditor';

const List = ({
  title,
  titleUpdate,
  onAddNewCard,
  cards,
  onRemoveCard,
  onOpenCard,
}) => (
  <div className="List panel">
    <TextEditor onTextSave={titleUpdate} value={title} />
    <div className="List-Cards panel-block">
      {cards.map(({ id, title: cardTitle, commentIds }) => (
        <Card
          key={id}
          commentsCount={commentIds.length}
          onOpen={onOpenCard(id)}
          onRemove={onRemoveCard(id)}
          title={cardTitle}
        />
      ))}
    </div>
    <div className="List-Footer panel-block">
      <AddCardForm onAddNewCard={onAddNewCard} />
    </div>
  </div>
);

export default List;
