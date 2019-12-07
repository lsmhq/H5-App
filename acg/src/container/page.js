import React, { Component } from 'react';
import Header from './pages/Nav';
import LeftNav from './pages/Left_nav';
import Body from './pages/Body';
import Footer from './pages/Footer';
import {HashRouter as Router} from 'react-router-dom';
import Notfound from './pages/Notfound';
export default class App extends Component {
    render() {
        let cookie = this.cookieToObj(document.cookie);
        if(cookie.loginStatus == 'b326b5062b2f0e69046810717534cb09'){
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
        }else if(cookie){
            return (
                <Router>
                    <Header/>
                    <Notfound/>
                </Router>
            )
        }

    }
        //解析cookie
        cookieToObj = (cookie) => {
            let obj = {};
            if(cookie){
                cookie.split(';').map(item=>{
                    item = item.trim();
                    let arr = item.split('=');
                    obj[arr[0]] = arr[1];
                });
            }
            return obj;
          }
}
