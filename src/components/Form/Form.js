import React from 'react';
import PropTypes from 'prop-types';

const getEditor = (type, props, ref) => {
  switch (type) {
    case 'input':
      return (
        <input
          className="input"
          {...props}
          ref={ref}
        />
      );

    case 'textarea':
    default:
      return (
        <textarea
          className="textarea"
          {...props}
          ref={ref}
        />
      );
  }
};

const Form = React.forwardRef(({
  value,
  onChange,
  onSubmit,
  btnText,
  editorType,
  formDirection,
}, ref) => {
  const formClassName = [
    'TextEditor-Form',
    `TextEditor-Form--${formDirection === 'row' ? 'Row' : 'Column'}`,
  ].join(' ');

  return (
    <form onSubmit={onSubmit} className={formClassName}>
      <div className="TextEditor-FormField field is-marginless">
        <div className="control">
          {getEditor(editorType, { value, onChange }, ref)}
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
});

Form.displayName = 'Form';

Form.defaultProps = {
  editorType: 'textarea',
  formDirection: 'column',
};

Form.propTypes = {
  value: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  editorType: PropTypes.oneOf(['input', 'textarea']),
  formDirection: PropTypes.oneOf(['row', 'column']),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
