import './TextEditor.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';

function View({
  className, value, hint, toggleEditing,
}) {
  return (
    <p
      onClick={toggleEditing}
      title={hint}
      className={`TextEditor-View ${className}`}
    >
      {value}
      <span className="TextEditor-ViewPencil" />
    </p>
  );
}

class TextEditor extends Component {
  static propTypes = {
    hint: PropTypes.string,
    value: PropTypes.string,
    btnText: PropTypes.string,
    onTextSave: PropTypes.func.isRequired,
    editorType: PropTypes.oneOf(['input', 'textarea']),
    viewClassName: PropTypes.string,
    formDirection: PropTypes.oneOf(['row', 'column']),
  };

  static defaultProps = {
    value: '',
    btnText: '',
    viewClassName: '',
    hint: 'Изменить текст',
    editorType: 'textarea',
    formDirection: 'column',
  };

  static View = View;

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditing: false,
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    const { isEditing } = this.state;
    if (isEditing) {
      this.inputRef.current.focus();
    }
  }

  valueChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  toggleEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { value } = this.state;
    if (value === '') {
      return;
    }
    const { onTextSave } = this.props;
    onTextSave(value);
    this.toggleEditing();
  };

  render() {
    const { value, isEditing } = this.state;
    const {
      btnText, hint, viewClassName, editorType, formDirection,
    } = this.props;

    return isEditing
      ? (
        <Form
          ref={this.inputRef}
          value={value}
          btnText={btnText}
          editorType={editorType}
          formDirection={formDirection}
          onChange={this.valueChange}
          onSubmit={this.handleSubmitForm}
        />
      ) : (
        <TextEditor.View
          hint={hint}
          value={value}
          className={viewClassName}
          toggleEditing={this.toggleEditing}
        />
      );
  }
}

export default TextEditor;
