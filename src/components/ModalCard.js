import './ModalCard.css';
import React, { Component } from 'react';
import TextEditor from './TextEditor';
import CardComments from './CardComments';

// function CardDesc({ desc, updateDesc }) {
//   return (
//     <div className="desc">
//       <h2>Описание:</h2>
//       <TextEditor
//         value={desc || 'Добавить описание карточки'}
//         onTextSave={updateDesc}
//       />
//     </div>
//   );
// }

// class CardModal extends Component {

//   const {
//     title,
//     desc,
//     listTitle,
//     username,
//     onSetTitle,
//     updateDesc,
//     onClose,
//     comments,
//     onAddComment,
//     onRemoveComment,
//     onSetCommentText,
//   } = props;

//   return (
//     <Modal isOpen>
//       <Card>
//         <CardHeader
//           title={title}
//           username={username}
//           listTitle={listTitle}
//           onClose={onClose}
//           onSetTitle={onSetTitle}
//         />
//         <CardBody>
//           <CardDesc
//             desc={desc}
//             updateDesc={updateDesc}
//           />
//           <CardComments
//             comments={comments}
//             onAddComment={onAddComment}
//             onSetCommentText={onSetCommentText}
//             onRemoveComment={onRemoveComment}
//           />
//         </CardBody>
//       </Card>
//     </Modal>
//   );
// };

class ModalCard extends Component {
  handleKeyUp = () => {

  };

  render() {
    const {
      title,
      listTitle,
      username,
      onSetTitle,
      comments,
      onAddComment,
      onRemoveComment,
      onSetCommentText,
    } = this.props;

    return (
      <div className="modal-card">
        <header className="modal-card-head flex">
          <div className="fg-1">
            <TextEditor
              value={title}
              editorType="input"
              formDirection="row"
              onTextSave={onSetTitle}
              viewClassName="modal-card-title is-size-3 mb"
            />
            {
              [
                ['На списке:', listTitle],
                ['Автор карточки:', username],
              ].map(([key, value]) => (
                <p className="is-size-7">
                  <span>
                    {key}
                    {' '}
                  </span>
                  <span className="is-italic">{value}</span>
                </p>
              ))
            }
          </div>
        </header>
        <section className="modal-card-body">
          <CardComments
            comments={comments}
            onAddComment={onAddComment}
            onUpdateComment={onSetCommentText}
            onRemoveComment={onRemoveComment}
          />
        </section>
        <footer className="modal-card-foot" />
      </div>
    );
  }
}

export default ModalCard;
