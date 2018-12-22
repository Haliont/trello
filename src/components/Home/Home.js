import './Home.css';
import cn from 'classnames';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import SignUp from '../../containers/SignUp';
import SignIn from '../../containers/SignIn';

const tabs = {
  signUp: {
    btnText: 'Регистрация',
    component: SignUp,
  },
  signIn: {
    btnText: 'Авторизация',
    component: SignIn,
  },
};

class Home extends Component {
  state = {
    activeTab: 'signUp',
  };

  renderTabs() {
    const { activeTab } = this.state;
    const { component: Tab } = tabs[activeTab];

    return (
      <div className="Home-Main">
        <Tab />
      </div>
    );
  }

  renderNav() {
    const { activeTab } = this.state;

    return (
      <div className="Home-Nav">
        {Object.keys(tabs).map((tabName) => {
          const { btnText } = tabs[tabName];
          return (
            <button
              key={tabName}
              type="submit"
              onClick={() => this.setState({ activeTab: tabName })}
              className={cn({
                btn: true,
                'btn-primary': tabName === activeTab,
                'Home-NavBtn': true,
              })}
            >
              {btnText}
            </button>
          );
        })}
      </div>
    );
  }

  render() {
    const { isSignedIn } = this.props;

    if (isSignedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="Home">
        <div className="Home-Inner">
          {/* {this.renderNav()} */}
          {this.renderTabs()}
        </div>
      </div>
    );
  }
}

export default Home;
