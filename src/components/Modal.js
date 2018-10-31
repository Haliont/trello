import React, { Component } from 'react';

class Modal extends Component {
  componentWillMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyUp = ({ key }) => {
    if (key !== 'Escape') {
      return;
    }
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const {
      children,
      isResealable = true,
      isOpen = false,
      onClose,
      bgColor,
    } = this.props;

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
            onClick={onClose}
          />)}
      </div>
    );
  }
}

export default Modal;
