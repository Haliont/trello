import './CardList.css';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card';
import AddCardForm from '../AddCardForm';
import TextEditor from '../TextEditor';

import { getCommentsByCardId } from '../../store/comments/selectors';

function CardList({
  id,
  title,
  cards,
  comments,
  onSetTitle,
  onOpenCard,
  onAddNewCard,
  onRemoveCard,
}) {
  return (
    <div className="CardList">
      <div className="CardList-Content panel">
        <TextEditor
          value={title}
          onTextSave={onSetTitle}
          editorType="input"
          formDirection="row"
          viewClassName="panel-heading"
        />
        <Droppable
          droppableId={id}
        >
          {provided => (
            <div
              ref={provided.innerRef}
              className="CardList-Cards panel-block"
            >
              {cards.map(({ id: cardId, title: cardTitle }, index) => (
                <Card
                  id={cardId}
                  key={cardId}
                  index={index}
                  title={cardTitle}
                  onOpen={onOpenCard(cardId)}
                  onRemove={onRemoveCard(cardId)}
                  commentsCount={getCommentsByCardId(comments, cardId).length}
                />
              ))}
            </div>
          )}
        </Droppable>
        <div className="CardList-Footer panel-block">
          <AddCardForm onAddNewCard={onAddNewCard} />
        </div>
      </div>
    </div>
  );
}

export default CardList;
