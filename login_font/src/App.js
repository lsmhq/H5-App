import React, { Component } from 'react';
import Signin from './container/Signin';
import Signup from './container/Signup';
import Activate from './container/Activate';
import {Route,HashRouter as Router} from 'react-router-dom';
import './login.css';
export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path={'/login'} component={Signin}/>
        <Route path={'/logup'} component={Signup}/>
        <Route path={'/email'} component={Activate}/>
      </Router>
        
    )
  }
}

