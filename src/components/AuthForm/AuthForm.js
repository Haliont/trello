import React from 'react';
import { Form, Field } from 'react-final-form';
import Input from '../Input';

function AuthForm({
  onSubmit, isRequested, submitText, fields,
}) {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%' }}
          className="flexbox flex-wrap justify-space-center"
        >
          {fields.map(({ name, type, placeholder }) => (
            <Field
              key={name}
              name={name}
              type={type}
              placeholder={placeholder}
              component={Input}
            />
          ))}
          <button
            type="submit"
            className="btn w-100"
            disabled={isRequested}
          >
            <span className="button-content">
              {isRequested ? 'Загрузка...' : (submitText || 'Submit')}
            </span>
          </button>
        </form>
      )}
    />
  );
}

export default AuthForm;
