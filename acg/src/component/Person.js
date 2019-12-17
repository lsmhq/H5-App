import React, { Component } from 'react'
import Header from './main/Title';
import Table from './main/Table';
export default class Person extends Component {
    render() {
        return (
            <div>
                <Header title='普通用户'/>
                <Table title={["ID","用户名","账号等级","联系方式",'帐号状态']} url='https://daitianfang.1459.top/api/v1/person?id=all' data={['id','name','level','email','status']} type='person'/>
            </div>
        )
    }
}
