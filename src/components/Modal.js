import React from 'react';

function Modal({ children, isResealable = true }) {
  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">
        {children}
      </div>
      {isResealable && (
        <button
          className="modal-close is-large"
          aria-label="close"
          type="button"
        />)}
    </div>

  );
}

export default Modal;
