import React, { Component } from 'react';
import Header from './main/Title';
import Table from './main/Table';
export default class Chapter extends Component {
    render() {
        return (
            <div>
                <Header title='文章管理'/>
                <Table title={['ID','标题','作者','发布日期','操作']} url='https://daitianfang.1459.top/api/v1/chapter?type=all' type='chapter' data={['id','title','auther','timetamp']}/>
            </div>
        )
    }
}
