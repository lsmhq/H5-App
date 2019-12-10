import React, { Component } from 'react';
import Pages from './container/page';
import Login from './container/Login';
import {HashRouter as Router,Route} from 'react-router-dom';
export default class App extends Component {
    render() {
        return (
            <Router>
                <Route path='/login' component={Login}/>
                <Route path='/pages' component={Pages}/>
            </Router>
        )
    }

}
