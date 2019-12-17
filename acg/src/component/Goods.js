import React, { Component } from 'react';
import Header from './main/Title';
import Table from './main/Table';
export default class Goods extends Component {
    render() {
        return (
            <div>
                <Header title='商品管理'/>
                <Table title={["ID","商品名","库存","价格","厂家地址","品牌",'简介']}
                 url='https://daitianfang.1459.top/api/v1/goods?id=all'
                 data={['id','name','collect','price','source','brand','description']} type='goods'/>
            </div>
        )
    }
}
