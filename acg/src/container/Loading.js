import React, { Component } from 'react';

export default class Loading extends Component {
    render() {
        let li = {
            marginTop:"30px"
        }
        return (
            <div id = 'loading_container'>
                <div id='login_bg'></div>
                <div>
                    <div id='loading_title' className='animated bounceIn'><span>加载中，请稍后</span></div>
                    <div id = 'loading'>
                        <img src='/images/loading.gif'/>
                    </div>
                </div>
            </div>
        )
    }
}
