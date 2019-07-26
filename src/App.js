import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { Login } from './Login';
import { Signup } from './Signup';
import { Tasks } from './Tasks';

import { PrivateRoute } from './helpers';
import { userService } from './services'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('user'),
    }
  }

  logout() {
    userService.logout().then(() => location.reload());
  }

  login() {
    location.href = '/login';
  }

  render() {
    const { username } = this.state;
    let userDiv;
    if (username)
      userDiv = <div className="App-user">{username} <a href="#" onClick={this.logout}>sign out</a></div>;
    else
      userDiv = <div className="App-user"><a href="#" onClick={this.login}>login</a></div>;
    return (
      <div className="App">
        <div className="App-header">
          {userDiv}
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Basic TO-DO app</h2>
        </div>
        <div className="App-main">
          <Router>
            <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10 offset-sm-1">
              <PrivateRoute exact path="/" component={Tasks} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
