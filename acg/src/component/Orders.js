import React, { Component } from 'react'
import Header from './main/Title';
import Table from './main/Table';
export default class Orders extends Component {
    render() {
        return (
            <div>
                <Header title='订单管理'/>
                <Table title={["ID","价格","用户名","状态"]} url='https://daitianfang.1459.top/api/v1/orders?id=all' data={['id','price','username','logistics']} type='orders'/>
            </div>
        )
    }
}
