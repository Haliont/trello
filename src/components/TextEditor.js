import React, { Component } from 'react';

const View = ({ value, hint, toggleEditing }) => (
  <button
    type="button"
    title={hint}
    className="btn-reset"
    onClick={toggleEditing}
  >
    <p>{value}</p>
  </button>
);

const Editor = ({ value, onChange, btnText }) => (
  <>
    <textarea className="textarea" value={value} onChange={onChange} />
    <button type="submit">
      {btnText || (
        <span className="icon has-text-success">
          <i className="fas fa-check-square" />
        </span>
      )}
    </button>
  </>
);

class TextEditor extends Component {
  static View = View;

  static Editor = Editor;

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
    const { btnText, hint } = this.props;

    return (
      <form className="form" onSubmit={this.handleSubmitForm}>
        {isEditing ? (
          <TextEditor.Editor
            value={value}
            btnText={btnText}
            onChange={this.valueChange}
          />
        ) : (
          <TextEditor.View
            value={value}
            hint={hint}
            toggleEditing={this.toggleEditing}
          />
        )}
      </form>
    );
  }
}

export default TextEditor;
