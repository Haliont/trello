import React, { Component } from 'react';
import Modal from './Modal';
import Board from '../containers/Board';
import SignupForm from './SignupForm';

class App extends Component {
  handleSignup = (event) => {
    event.preventDefault();
    const { signup, username } = this.props;
    if (username === '') {
      return;
    }
    signup();
  };

  handleUserNameChange = ({ target }) => {
    const { updateUsername } = this.props;
    updateUsername(target.value);
  };

  render() {
    const { isRegistered, username } = this.props;
    return isRegistered ? (
      <Board />
    ) : (
      <Modal isResealable={false} bgColor="#fff" isOpen>
        <SignupForm
          value={username}
          onSubmit={this.handleSignup}
          onChange={this.handleUserNameChange}
        />
      </Modal>
    );
  }
}

export default App;
