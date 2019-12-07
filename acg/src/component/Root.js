import React, { Component } from 'react'
import Header from './main/Title';
import Table from './main/Table';
export default class Root extends Component {
    render() {
        return (
            <div>
               <Header title='管理员'/>
               <Table title={["ID","用户名","权限","联系方式","操作"]} url='https://daitianfang.1459.top/api/v1/admin' data={['userid','username','character','email']} type='admin'/>
            </div>
        )
    }
}
