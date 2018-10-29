import React from 'react';
import './Card.css';

const Card = ({
  title, onOpen, onRemove, commentsCount,
}) => (
  <div className="Card card" onClick={onOpen}>
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
);

export default Card;
