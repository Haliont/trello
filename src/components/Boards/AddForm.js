import React, { Component } from 'react';

class AddForm extends Component {
  state = {
    isAdding: false,
    value: '',
  }

  toggle = () => this
    .setState(({ isAdding }) => ({ isAdding: !isAdding }));


  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    if (value === '') {
      return;
    }
    onSubmit(value);
    this.setState({ value: '' });
    this.toggle();
  }

  onChange = ({ target }) => this.setState({ value: target.value });

  render() {
    const { isAdding, value } = this.state;

    return (
      <div
        onClick={() => this.setState({ isAdding: true })}
        className="Boards-Board Boards-Board--AddNew"
      >
        {!isAdding
          ? (
            <>
              <h3 className="Boards-BoardTitle">
                <div>
                  Добавить новый проект
                </div>
              </h3>
              <span className="Boards-BoardFade" />
            </>
          )
          : (
            <form
              onSubmit={this.handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div
                style={{
                  color: '#6b808c',
                }}
              >
                Название проекта:
              </div>
              <input style={{ width: '100%' }} value={value} onChange={this.onChange} />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  marginTop: '10px',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  style={{ flexGrow: '1', marginRight: '5px' }}
                  type="submit"
                >
                  Добавить
                </button>

                <button
                  style={{ flexGrow: '1' }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    this.setState({ isAdding: false });
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          )
        }
      </div>
    );
  }
}

export default AddForm;
