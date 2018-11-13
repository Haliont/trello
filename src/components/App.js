import React, { Component } from 'react';
import Modal from './Modal';
import Board from '../containers/Board';
import SignupForm from './SignupForm';
import { updateUsername, signup } from '../actions';

class App extends Component {
  handleSignup = (event) => {
    event.preventDefault();
    const { dispatch, username } = this.props;
    if (username === '') {
      return;
    }
    dispatch(signup());
  };

  handleUserNameChange = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(updateUsername(target.value));
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
