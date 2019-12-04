import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Main from '../../component/Main';
import Root from '../../component/Root';
import Person from '../../component/Person';
import Goods from '../../component/Goods';
import Chapter from '../../component/Chapter';
import Talk from '../../component/Talk';
import Orders from '../../component/Orders';
export default class Body extends Component {
    render() {
        return (
            <div>
                <Route path='/' exact component={Main}/>
                <Route path='/root' component={Root}/>
                <Route path='/person' component={Person}/>
                <Route path='/goods' component={Goods}/>
                <Route path='/chapter' component={Chapter}/>
                <Route path='/talk' component={Talk}/>
                <Route path='/orders' component={Orders}/>
            </div>
        )
    }
}
