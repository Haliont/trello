import React from "react";
import TextEditor from "./TextEditor";
import AddCommentForm from "./AddCommentForm";

const CardComments = ({
  comments,
  onAddComment,
  onUpdateComment,
  onRemoveComment
}) => (
  <div className="Comments" style={{ margin: "15px 0" }}>
    <div className="Comments-List">
      <h2 className="Comments-ListTitle">Комментарии</h2>
      {comments.map(({ id, text, author }) => (
        <div key={id} style={{ marginBottom: "10px" }}>
          <span>КомментариЙ</span>
          <TextEditor value={text} onTextSave={onUpdateComment(id)} />
          <span>Автор: {author}</span>
          <button type="button" onClick={onRemoveComment(id)}>
            Удалить комментарий
          </button>
        </div>
      ))}
    </div>
    <div className="Comments-AddComment">
      <h2 className="Comments-AddCommentTitle">Добавить комментарий</h2>
      <AddCommentForm onAddComment={onAddComment} />
    </div>
  </div>
);

export default CardComments;
