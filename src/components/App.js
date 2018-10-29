import React, { Component } from 'react';
import Board from './Board';
import Signup from './Signup';

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
    const foo = x => x;
    foo();
    const { isRegistered, username } = this.state;
    return isRegistered ? (
      <Board username={username} />
    ) : (
      <Signup
        textChange={this.handleUserNameChange}
        onSubmit={this.handleSignup}
      />
    );
  }
}

export default App;
