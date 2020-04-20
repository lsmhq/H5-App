import React, { Component } from 'react'
import Header from './main/Title';
import Video from './main/Video';
export default class Person extends Component {

    render() {
        return (
            <div>
                <Header title="视频管理"/>
                <Video/>
            </div>
        )
    }
}

