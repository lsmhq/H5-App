import React, { Component } from 'react'

export default class Video extends Component {
    constructor(){
        super()
        this.state = {
            url:'',
            data:[]
        }
    }
    componentDidMount(){
        this.myfetch(this.state.url);
    }
    myfetch = (url)=>{
        fetch(url).then(data=>data.json()).then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
    render() {
        return (
            <div>
                <div id = 'right' style={{float:"left",height:'100%',width:'20%'}}>
                </div>
                {
                    this.state.data.map(val=>{
                        
                    })
                }
            </div>
        )
    }
}
