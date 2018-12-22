import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  static defaultProps = {
    isOpen: false,
    bgColor: null,
    onClose: () => {},
    isResealable: true,
  };

  static propTypes = {
    isOpen: PropTypes.oneOf([true, false]),
    bgColor: PropTypes.string,
    onClose: PropTypes.func,
    isResealable: PropTypes.oneOf([true, false]),
  }

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
      isResealable,
      isOpen,
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
