import React, { Component } from 'react';
import './AddCardForm.css';

// TODO: поправить стили

const Form = ({
  valueChange, value, onSubmit, onClose,
}) => (
  <form onSubmit={onSubmit} className="AddCardForm field">
    <div className="control">
      <input
        onChange={valueChange}
        value={value}
        className="input is-medium"
        type="text"
        placeholder="Type a title for new card"
      />
    </div>
    <div className="AddCardForm-Footer">
      <button
        className="AddCardForm-Btn button has-background-primary has-text-white"
        type="submit"
      >
        Add
      </button>
      <button
        onClick={onClose}
        className="AddCardForm-Del delete is-large"
        type="button"
      />
    </div>
  </form>
);

const OpenForm = ({ toggleAddingMode }) => (
  <button
    onClick={toggleAddingMode}
    className="button is-link is-outlined is-fullwidth"
    type="button"
  >
    Add new card +
  </button>
);

class AddCardForm extends Component {
  static OpenForm = OpenForm;

  static Form = Form;

  state = {
    value: '',
    isAdding: false,
  };

  toggleAddingMode = () => {
    const { isAdding } = this.state;
    this.setState({ isAdding: !isAdding });
  };

  valueChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmitForm = (event) => {
    event.preventDefault();
    const { value } = this.state;
    if (value === '') {
      return;
    }
    const { onAddNewCard } = this.props;
    onAddNewCard(value);
    this.toggleAddingMode();
  };

  render() {
    const { isAdding } = this.state;

    return isAdding ? (
      <AddCardForm.Form
        onClose={this.toggleAddingMode}
        onSubmit={this.handleSubmitForm}
        valueChange={this.valueChange}
      />
    ) : (
      <AddCardForm.OpenForm toggleAddingMode={this.toggleAddingMode} />
    );
  }
}

export default AddCardForm;
