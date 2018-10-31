import './TextEditor.css';
import React, { Component } from 'react';
import Form from './Form';

function View({
  className, value, hint, toggleEditing,
}) {
  return (
    <p
      onClick={toggleEditing}
      title={hint}
      className={className}
    >
      {value}
    </p>
  );
}

class TextEditor extends Component {
  static View = View;

  static defaultProps = {
    hint: 'Изменить текст',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isEditing: false,
    };
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
