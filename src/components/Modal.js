import React from 'react';

function Modal({
  children, isResealable = true, isOpen = false, bgColor,
}) {
  const bgStyle = bgColor ? { backgroundColor: bgColor } : {};

  return (
    <div className={`modal ${isOpen ? 'is-active' : ''}`}>
      <div className="modal-background" style={bgStyle} />
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
