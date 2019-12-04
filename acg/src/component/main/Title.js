import React, { Component } from 'react';

export default class Title extends Component {
    render() {
        return (
            <div>
                <div style={{width:'100%',textAlign:'center',fontSize:'20px',backgroundColor:'#BEBEBE',height:'50px',lineHeight:'50px',position:'fixed',zIndex:'20'}}>
                    {this.props.title}
                </div>
            </div>
        )
    }
}
