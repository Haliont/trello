import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Redirect from 'react-router-dom/Redirect';
import Boards from '../../containers/Boards';
import Board from '../../containers/Board';
import homeImg from './home.svg';
import './Dashboard.css';

class Dashboard extends Component {
  handleSignOut = () => {
    const { signOut } = this.props;
    signOut();
  }

  render() {
    return (
      <>
        <div className="Header">
          <Link to="/dashboard/boards" className="Header-HomeLink">
            <img src={homeImg} alt="" />
            Проекты
          </Link>
          <div
            onClick={this.handleSignOut}
            className="Header-SignOut"
          >
            Выйти
          </div>
        </div>
        <Switch>
          <Route exact path="/dashboard/boards" component={Boards} />
          <Route
            path="/dashboard/:id-:title"
            component={Board}
          />
          <Redirect to="/dashboard/boards" />
        </Switch>
      </>
    );
  }
}

export default Dashboard;
