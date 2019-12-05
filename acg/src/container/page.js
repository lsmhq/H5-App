import React, { Component } from 'react';
import Header from './pages/Nav';
import LeftNav from './pages/Left_nav';
import Body from './pages/Body';
import Footer from './pages/Footer';
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
