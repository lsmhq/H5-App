import React, { Component } from 'react'
import Header from './main/Title';
import Table from './main/Table';
export default class Talk extends Component {
    render() {
        return (
            <div>
                <Header title='评论管理'/>
                <Table title={["文章ID","用户名","内容","日期"]} url='https://daitianfang.1459.top/api/v1/talk?id=all' data={['contentid','evalutor','evaluation','good']} type='admin'/>
            </div>
        )
    }
}
