import React, { Component } from 'react';

export default class View extends Component {
    render() {
        let style = {
            width:'150px',
            height:'150px',
            borderRidus:'5px',
            backgroundColor:'pink',
            float:'left',
            textAlign:'center',
            fontSize:'20px',
            marginLeft:'15%',
            lineHeight:'50px',
        }
        return (
            <div style={style}>
                <span>{this.props.title}</span>
                <p><span>{this.props.num}</span></p>
            </div>
        )
    }
}
