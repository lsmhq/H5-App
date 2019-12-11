import React, { Component } from 'react';
import Nav from '../component/Nav';
import Alert from '../component/Alert';
import ReactDom from 'react-dom';

export default class Signin extends Component {
    constructor(){
        super();
        this.state = {
            msg:'用户名或密码错误'
        }
    } 
    render() {
        return (
            <div className='bg'>
                <Nav title='登录'/>
                <div className='logo'>
                    <img src='/images/logo.png' width='100px'/>
                </div>
                <Alert msg={this.state.msg} toPath = {()=>{this.hidden()}}/>
               <input type='text' placeholder='用户名' className='input' name='username' autoComplete='off'/>
               <input type='password' placeholder='密码' className='input' name='password' autoComplete='off'/>
               <input type='button' value='登录' className='input_btn' onClick={(e)=>{this.fetch_login(e)}} required/>
               <input type='button' value='注册' className='input_btn' onClick={(e)=>{this.toLogup(e)}} required/>
               <span id='pass' onClick={()=>{this.toMain()}}>跳过</span>
            </div>
        )
    }
    toMain = ()=>{
        this.props.history.push('/acg');
    }
    toLogup = (e)=>{
        this.props.history.push('/logup');
    }
    fetch_login = (e)=>{
        let data = {};
        data.type = 'login';
        data.username = document.getElementsByName('username')[0].value;
        data.password = document.getElementsByName('password')[0].value;
        if(data.username == '' || data.password == ''){
            this.setState({
                msg:'用户名或密码不能为空'
            },()=>{
                ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
            })
        }else{
                    fetch('https://daitianfang.1459.top/acg',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(data)
        }).then(req=>{return req.text()}).then(data=>{
            if(data==='success'){
                this.props.history.push('/acg');
            }else{
                this.setState({
                    msg:'用户名或密码错误'
                },()=>{
                    ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
                })   
            }
        });
        }

    }
    hidden = (e)=>{
        ReactDom.findDOMNode(document.getElementById('alert')).style.display='none';
    }
}
