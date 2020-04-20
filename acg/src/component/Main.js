import React, { Component } from 'react';
import View from './main/View';
import Title from './main/Title';
import echarts from 'echarts/lib/echarts';
export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            content_num:'',
            person_num:'',
            today_num:''
        }
    }
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('main'));
        var option = {
            title: {
                text: '后台统计'
            },
            tooltip: {},
            legend: {
                data:['排名']
            },
            xAxis: {
                data: ['文章量','用户数量','今日活跃']
            },
            yAxis: {},
            series: [{
                name: '排名',
                type: 'line',
                data: [this.state.content_num,this.state.person_num,this.state.today_num]
            }]
        };
        myChart.setOption(option);
    }
    render() {
        let style = {
            width:'500px',
            top:'100px',
            height:'500px'
        }
        return (
            <div>
                <Title title='首页'/>
                <div id="main" style={style}></div>
                <View title='文章总数' num={this.state.content_num}/>
                <View title='用户总量' num={this.state.person_num}/>
                <View title='今日活跃' num={this.state.today_num}/>
            </div>
        )
    }
    componentDidMount(){
        this.fetch_Num()
    }
    fetch_Num(){
        fetch('https://daitianfang.1459.top/api/v1/main').then(req=>req.json()).then(data=>{
            this.setState({
                content_num:data.data[1].context_count,
                person_num:data.data[0].user_count
            })
        })
    }
}