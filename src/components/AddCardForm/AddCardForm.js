import './AddCardForm.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Form = React.forwardRef(({
  valueChange, value, onSubmit, onClose,
}, ref) => (
  <form onSubmit={onSubmit} className="AddCardForm field">
    <div className="control">
      <input
        ref={ref}
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
));

const OpenForm = ({ toggleAddingMode }) => (
  <button
    onClick={toggleAddingMode}
    className="button is-link is-outlined is-fullwidth"
    type="button"
  >
    Добавить карточку +
  </button>
);

class AddCardForm extends Component {
  static propTypes = {
    onAddNewCard: PropTypes.func.isRequired,
  };

  static OpenForm = OpenForm;

  static Form = Form;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isAdding: false,
    };
    this.inputRef = React.createRef();
  }

  componentDidUpdate() {
    const { isAdding } = this.state;
    if (isAdding) {
      this.inputRef.current.focus();
    }
  }

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
        ref={this.inputRef}
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
