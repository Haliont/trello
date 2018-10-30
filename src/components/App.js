import React, { Component } from 'react';
import Modal from './Modal';
import Board from './Board';
import SignupForm from './SignupForm';

class App extends Component {
  state = {
    username: '',
    isRegistered: false,
  };

  componentWillMount() {
    const { username } = localStorage;
    if (!username) {
      return;
    }
    this.setState({ username, isRegistered: true });
  }

  handleSignup = (event) => {
    event.preventDefault();
    const { username } = this.state;
    localStorage.username = username;
    this.setState({ isRegistered: true });
  };

  handleUserNameChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ username: value });
  };

  render() {
    const { isRegistered, username } = this.state;
    return isRegistered ? (
      <Board username={username} />
    ) : (
      <Modal isResealable={false} bgColor="#fff" isOpen>
        <SignupForm
          onSubmit={this.handleSignup}
          onChange={this.handleUserNameChange}
        />
      </Modal>
    );
  }
}

export default App;
