import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

class AddCommentForm extends Component {
  static propTypes = {
    onAddComment: PropTypes.func.isRequired,
  };

  state = { value: '' };

  valueChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    if (value === '') {
      return;
    }
    const { onAddComment } = this.props;
    onAddComment(value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <Form
        btnText="Добавить комментарий"
        value={value}
        onChange={this.valueChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default AddCommentForm;
