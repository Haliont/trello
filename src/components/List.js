import "./List.css";
import React from "react";
import Card from "./Card";
import AddCardForm from "./AddCardForm";
import TextEditor from "./TextEditor";

const List = ({
  title,
  titleUpdate,
  onAddNewCard,
  cards,
  onRemoveCard,
  onOpenCard
}) => (
  <div className="List panel">
    <TextEditor value={title} onTextSave={titleUpdate} />
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
);

export default List;
