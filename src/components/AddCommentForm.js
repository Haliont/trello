import React, { Component } from 'react';

class AddCommentForm extends Component {
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
      <form onSubmit={this.handleSubmit}>
        <textarea onChange={this.valueChange} value={value} />
        <button type="submit">Добавить комментарий</button>
      </form>
    );
  }
}

export default AddCommentForm;
