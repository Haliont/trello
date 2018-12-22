import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Switch from 'react-router-dom/Switch';
import PrivateRoute from '../PrivateRoute';

import Home from '../Home';
import Dashboard from '../../containers/Dashboard';

class App extends Component {
  static propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { isSignedIn } = this.props;
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Home {...props} isSignedIn={isSignedIn} />}
          />
          <PrivateRoute
            path="/dashboard"
            isSignedIn={isSignedIn}
            component={Dashboard}
          />
          <Route render={() => (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <h1 style={{
                fontSize: '72px',
              }}
              >
                404
              </h1>
              <p>
                Страница не найдена
                {' '}
                <br />
                Перейти на
                {' '}
                <Link to="/">Главную</Link>
              </p>
            </div>
          )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
