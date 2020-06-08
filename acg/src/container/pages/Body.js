import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Main from '../../component/Main';
import Root from '../../component/Root';
import Person from '../../component/Person';
import Goods from '../../component/Goods';
import Chapter from '../../component/Chapter';
import Orders from '../../component/Orders';
import Video from '../../component/Video'
export default class Body extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                <Route path='/pages/' exact component={Main}/>
                <Route path='/pages/root' component={Root}/>
                <Route path='/pages/person' component={Person}/>
                <Route path='/pages/goods' component={Goods}/>
                <Route path='/pages/chapter' component={Chapter}/>
                <Route path='/pages/orders' component={Orders}/>
                <Route path='/pages/video' component={Video}/>
            </div>
        )
    }
}
