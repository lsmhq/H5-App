import React, { Component } from 'react';
import Header from './main/Title';
import Table from './main/Table';
export default class Chapter extends Component {
    render() {
        return (
            <div>
                <Header title='动态管理'/>
                <Table title={['ID','标题','作者','发布日期','访问量','点赞量','评论']} 
                url='https://daitianfang.1459.top/api/v1//activity' 
                type='activity' 
                data={['id','title','name','timetamp','visit','goods','evaulationnum']}/>
            </div>
        )
    }
}
