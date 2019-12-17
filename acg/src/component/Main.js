import React, { Component } from 'react';
import View from './main/View';
import Title from './main/Title';
export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            content_num:'',
            person_num:'',
            today_num:''
        }
    }
    render() {
        let style = {
            width:'100%',
            top:'100px',
            position:'relative',
            backgroundImage:'url(/bg2.png)'

        }
        return (
            <div>
                <Title title='首页'/>
                <div style={style}>
                <View title='文章总数' num={this.state.content_num}/>
                <View title='用户总量' num={this.state.person_num}/>
                <View title='今日活跃' num={this.state.today_num}/>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.fetch_Num()
    }
    fetch_Num(){
        fetch('https://daitianfang.1459.top/api/v1/main').then(req=>req.json()).then(data=>{
            console.log(data);
            this.setState({
                content_num:data.data[1].context_count,
                person_num:data.data[0].user_count
            })
        })
    }
}