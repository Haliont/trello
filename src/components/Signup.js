import './Signup.css';
import React from 'react';

const Signup = ({ onSubmit, textChange }) => (
  <div className="Signup modal">
    <div className="Signup-Bg modal-background" />
    <div className="Signup-Content modal-content">
      <h2 className="Signup-Title">Регистрация</h2>
      <form className="Signup-Form" onSubmit={onSubmit}>
        <div className="field">
          <div className="control">
            <label className="Signup-Label" htmlFor="name">
              Введите ваше имя:
              <input
                onChange={textChange}
                id="name"
                className="input is-medium"
                type="text"
                placeholder="Например: Алан"
                required
              />
            </label>
          </div>
        </div>
        <button className="Signup-Btn button has-background-info" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </div>
);

export default Signup;
