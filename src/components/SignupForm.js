import React from 'react';

function SignupForm({ onSubmit, onChange, value }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label is-large" htmlFor="username">
          Username
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            id="username"
            type="text"
            className="input is-large"
            placeholder="Example: Petya"
            value={value}
            onChange={onChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>
      <div className="field">
        <p className="control">
          <button type="submit" className="button is-success">
            Login
          </button>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
