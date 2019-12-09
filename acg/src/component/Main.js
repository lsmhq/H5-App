import React, { Component } from 'react';
import View from './main/View';
import Title from './main/Title';
export default class Main extends Component {
    render() {
        let style = {
            width:'100%',
            top:'100px',
            position:'relative'

        }
        return (
            <div>
                <Title title='首页'/>
                <div style={style}>
                <View title='文章总数' num/>
                <View title='用户总量' num/>
                <View title='今日活跃' num/>
                </div>
            </div>
        )
    }
}
