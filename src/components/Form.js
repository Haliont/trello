import React from 'react';

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

export default Form;
