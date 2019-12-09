import React, { Component } from 'react';
import Header from './main/Title';
import Table from './main/Table';
export default class Goods extends Component {
    render() {
        return (
            <div>
                <Header title='商品管理'/>
                <Table title={["ID","商品名","库存","价格","操作"]} url='https://daitianfang.1459.top/api/v1/goods?type=a181a603769c1f98ad927e7367c7aa51' data={['id','name','collect','price']}/>
            </div>
        )
    }
}
