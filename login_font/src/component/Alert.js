import React, { Component } from 'react';
import ReactDom from 'react-dom';


export default class Alert extends Component {
    render() {
        return (
            <div id='alert'>
                <img src={this.props.src!=''? this.props.src : '/images/failed.png'} width='80px'/>
                <span>{this.props.msg}</span>
                <input type='button' value={this.props.btn||'确认'} className='input_btn' style={{marginTop:'10px'}} onClick={(e)=>{this.props.toPath(e)}}/>
            </div>
        )
    };

}
