import React, { Component } from 'react';
import Header from './container/pages/Nav';
import LeftNav from './container/pages/Left_nav';
import Body from './container/pages/Body';
import Footer from './container/pages/Footer';
import {HashRouter as Router} from 'react-router-dom';
export default class App extends Component {
    render() {
        return (
            <Router>
                <Header/>
                <div id='left_nav'>
                    <LeftNav/>
                </div>
                <div id='body'>
                    <Body/>
                </div>
                <div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
