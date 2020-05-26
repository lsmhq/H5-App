import React, { Component } from 'react'
import Header from './main/Title';
import Table from './main/Table';
export default class Person extends Component {

    render() {
        return (
            <div>
                <Header title="视频管理"/>
                <Table 
                    title={["序号","标题","封面","视频"]} 
                    url='https://daitianfang.1459.top/api/v1/video?id=all'   
                    data={['id','title','cover','barragefile']} 
                />
            </div>
        )
    }
}

