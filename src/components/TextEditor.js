import './TextEditor.css';
import React, { Component } from 'react';

const getEditor = (type, props) => {
  switch (type) {
    case 'input':
      return (
        <input
          className="input"
          {...props}
        />
      );

    case 'textarea':
    default:
      return (
        <textarea
          className="textarea"
          {...props}
        />
      );
  }
};

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

function Form({
  value,
  onChange,
  onSubmit,
  btnText,
  editorType,
  formDirection,
}) {
  const formClassName = [
    'TextEditor-Form',
    `TextEditor-Form--${formDirection === 'row' ? 'Row' : 'Column'}`,
  ].join(' ');

  return (
    <form onSubmit={onSubmit} className={formClassName}>
      <div className="TextEditor-FormField field is-marginless">
        <div className="control">
          {getEditor(editorType, { value, onChange })}
        </div>
      </div>
      <div className="TextEditor-FormSubmit control">
        <button type="submit" className="button">
          {btnText || (
            <span className="icon has-text-success">
              <i className="fas fa-check-square" />
            </span>
          )}
        </button>
      </div>
    </form>
  );
}

class TextEditor extends Component {
  static View = View;

  static Form = Form;

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
        <TextEditor.Form
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
