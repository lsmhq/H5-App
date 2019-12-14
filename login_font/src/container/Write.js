import React, { Component } from 'react';
import Tools from '../component/Tools';
import '../write.css';
import Alert from '../component/Alert';
import ReactDom from 'react-dom';
import '../write.css'
export default class Write extends Component {
    constructor() {
        super();
        this.state= {
            msg:'',
            fun:()=>{
                ReactDom.findDOMNode(document.getElementById('alert')).style.display='none';
            },
            src:undefined,
            btn:'懂了',
            num:[[],[]]
        }
    }
    render() {
        return (
            <div style={{height:'800px'}}>
                <div className='header_write'>
                    <div className='nav_write'><span>写文章</span></div>
                    <span className='pass' onClick={()=>{this.fetch_submit()}} onClick={()=>{this.how()}}>如何写作</span>
                    <button className='back_write' onClick={()=>{this.back()}}><img  src='/back.png' width='30px'/></button>
                </div>
                <Alert
                    msg={this.state.msg}
                    toPath={()=>{this.state.fun()}}
                    btn={this.state.btn}
                    src={this.state.src}
                />
                <div className='title' contentEditable='true'>标题</div>
                <div className='content' contentEditable='true'></div>
                <button className='write_submit' onClick={()=>{this.submit()}}>上传文章</button>
            </div>
        )
    }
    how = ()=>{
        this.setState({
            msg:'第一个输入框为标题,第二个输入框为文章主体,每个段落间使用回车键隔开',
            btn:'懂了',
            src:undefined
        },()=>{
            ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
        })
    }
    submit=()=>{
        this.setState({
            msg:'正在上传中 · · ·',
            btn:'确认',
            src:'/images/run.gif'
        },()=>{
            ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
        });
        let data = {};
        data.type = 'insert';
        data.title = ReactDom.findDOMNode(document.getElementsByClassName('title')[0]).innerHTML;
        data.content = ReactDom.findDOMNode(document.getElementsByClassName('content')[0]).nodeValue;
        data.userid = this.cookieToObj(document.cookie).userid;
        console.log(data);
    }
    back = ()=>{
        this.props.history.goBack()
    }
            //解析cookie
    cookieToObj = (cookie) => {
        let obj = {};
        if(cookie){
            cookie.split(';').map(item=>{
                item = item.trim();
                let arr = item.split('=');
                obj[arr[0]] = arr[1];
            });
        }
        return obj;
    }
}
