import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Card.css';

const Card = ({
  id, title, onOpen, onRemove, commentsCount, index,
}) => (
  <Draggable
    draggableId={id}
    index={index}
  >
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="Card card"
        onClick={onOpen}
      >
        <div className="Card-Text">{title}</div>
        <div className="Card-Comments">
          <i className="fas fa-comments" />
          <div className="Card-CommentsCount">{commentsCount}</div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="Card-Del delete btn-reset"
        />
      </div>
    )}
  </Draggable>
);

export default Card;
