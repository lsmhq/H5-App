import React, { Component } from 'react';
import Alert from '../component/Alert';

export default class Tools extends Component {
    constructor(){
        super();
        this.state = {
            num:[['title'],['content']]
        }
    }
    render() {
        return (
            <div className='write_container'>
                <div className='tools'>
                    <button className='tools_btn' onClick={()=>{this.add('content')}}>添加段落</button>
                    <button className='tools_btn' onClick={()=>{this.add('title')}}>添加标题</button>
                    <button className='tools_btn' onClick={()=>{this.del('title')}}>删除标题</button>
                    <button className='tools_btn' onClick={()=>{this.del('content')}}>删除段落</button>
                    <button className='tools_btn' onClick={()=>{this.save()}}>上传封面</button>
                </div>
            </div>
        )
    }
    add = (str)=>{
        console.log('add');
        switch (str) {
            case 'title':{
                this.state.num[0].push('title');
                break;
            }case 'content':{
                this.state.num[1].push('content');
                break;
            }
        }
        this.setState({
            num:[this.state.num[0],this.state.num[1]]
        },()=>{
            this.props.op(this.state.num)
        })
    }
    del = (str)=>{
        console.log('del');
        switch (str) {
            case 'title':{
                this.state.num[0].pop();
                break;
            }case 'content':{
                this.state.num[1].pop();
                break;
            }
        }
        this.setState({
            num:[this.state.num[0],this.state.num[1]]
        },()=>{
            this.props.op(this.state.num)
        })
    }
    save = ()=>{
        console.log('save');
    }
}
