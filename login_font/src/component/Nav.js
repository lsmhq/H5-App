import React, { Component } from 'react';
import '../login.css';
import {Link} from 'react-router-dom';
export default class Nav extends Component {
    render() {
        return (
            <div className='nav'>
                <span>{this.props.title}</span>
            </div>
        )
    }
}
