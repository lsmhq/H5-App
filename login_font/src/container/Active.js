import React, { Component } from 'react'

export default class Active extends Component {
    constructor(){
        super();
        this.state = {
            src:''
        }
    }
    render() {
        return (
            <div>
                <img src={this.state.src}/>
                <div className='content' contenteditable="true"></div>
            </div>
        )
    }
}
