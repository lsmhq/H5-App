import React, { Component } from 'react';
import Nav from '../component/Nav';
import Alert from '../component/Alert';
import ReactDom from 'react-dom';
export default class Activate extends Component {
    constructor(){
        super();
        this.state = {
            msg:'',
            btn:'',
            fun:()=>{

            },
            src:''
        }
    }
    render() {
        return (
            <div className='bg'>
                <Nav title='邮箱激活'/>
                <Alert msg={this.state.msg} btn = {this.state.btn} toPath={()=>{this.state.fun()}} src={this.state.src}/>
                <button className='input_btn' onClick={()=>{this.fetch_send()}}>点击发送邮件</button>
            </div>
        )
    }
    fetch_send = ()=>{
        let data = {};
        data.type = 'check';
        data.username = sessionStorage.getItem('username');
        data.email = sessionStorage.getItem('email');
        // console.log(data);
        ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';            
        this.setState({
            msg:'正在发送中 · · ·',
            btn:'请稍后',
            fun:()=>{
                ReactDom.findDOMNode(document.getElementById('alert')).style.display='none';
            },
            src:'/images/run.gif'
        })
        fetch('https://daitianfang.1459.top/acg',{
            method:'POST',
            mode:'cors',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(req=>req.text()).then(data=>{
            if(data === 'success'){
                this.setState({
                    msg:'邮件已发送请注意查收',
                    btn:'点击返回登录',
                    fun:()=>{
                        this.props.history.push('/login');
                    },
                    src:'/images/success.png'
                },()=>{
                    ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
                })
            }else if(data === '发送失败,请检查邮箱'){
                this.setState({
                    msg:data,
                    btn:'重新注册',
                    fun:()=>{
                        this.props.history.push('/logup');
                    },
                    src:'/images/failed.png'
                },()=>{
                    ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
                })
            }
        })
    }
}
