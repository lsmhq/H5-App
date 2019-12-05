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
                <Route path='/pages/' exact component={Main}/>
                <Route path='/pages/root' component={Root}/>
                <Route path='/pages/person' component={Person}/>
                <Route path='/pages/goods' component={Goods}/>
                <Route path='/pages/chapter' component={Chapter}/>
                <Route path='/pages/talk' component={Talk}/>
                <Route path='/pages/orders' component={Orders}/>
            </div>
        )
    }
}
