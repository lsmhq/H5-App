import React, { Component } from 'react';
import Nav from '../component/Nav';
import ReactDom from 'react-dom';
import Alert from '../component/Alert';
export default class Signup extends Component {
    constructor(){
        super();
        this.state = {
            msg:'',
            btn:'',
            fun:()=>{}
        }
    }
    render() {
        return (
            <div className='bg'>
                <Nav title='注册'/>
                <div className='logo'>
                    <img src='/Logo-big.png' width='100px'/>
                </div>
                <Alert msg={this.state.msg} toPath={()=>{this.state.fun()}} btn={this.state.btn}/>
                <input type='email' placeholder='邮箱' className='input' name='email'/>
                <input type='text' placeholder='用户名' className='input' name='username'/>
               <input type='password' placeholder='密码' className='input' id='password' name='password' onKeyUp={(e)=>{this.check(e)}}/>
               <input type='password' placeholder='确认密码' className='input' onKeyUp={(e)=>{this.check(e)}} id='password_check'/>
                <span id='check'>{'两次密码不一致'}</span>
               <input type='button' value='注册' className='input_btn' id='logup_btn' onClick={(e)=>{this.fetch_logup(e)}}/>
               <input type='button' value='返回' className='input_btn' onClick={(e)=>{this.toLogin(e)}}/>
            </div>
        )
    }
    toLogin = (e)=>{
        this.props.history.push('/login');
    }
    check = (e)=>{
        let value =  ReactDom.findDOMNode(document.getElementById('password_check')).value;
        let value1 = ReactDom.findDOMNode(document.getElementById('password')).value;
        if(value == value1){
            ReactDom.findDOMNode(document.getElementById('check')).style.display='none';
            ReactDom.findDOMNode(document.getElementById('logup_btn')).disable=true;
        }else{
            ReactDom.findDOMNode(document.getElementById('check')).style.display='block';
            ReactDom.findDOMNode(document.getElementById('check')).disable=false;
        }
    }
    fetch_logup=(e)=>{
        let data = {};
        data.type='logup';
        data.email = document.getElementsByName('email')[0].value;
        data.username = document.getElementsByName('username')[0].value;
        data.password = document.getElementsByName('password')[0].value;
        if(data.email == ''||data.username==''||data.password==''){
            this.setState({
                msg:'以上输入框未填完整',
                btn:'确认',
                fun:()=>{
                    ReactDom.findDOMNode(document.getElementById('alert')).style.display='none';
                }
            },()=>{
                ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
            })
        }else{
            fetch('https://daitianfang.1459.top/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                mode:'cors',
                body:JSON.stringify(data)
            }).then(req=>req.text()).then(text=>{
                if(text === 'success'){
                    
                    console.log(data);
                    this.setState({
                        msg:'注册成功,点击确定跳转激活',
                        btn:'点击激活',
                        fun:()=>{
                            sessionStorage.setItem('username',data.username);
                            sessionStorage.setItem('email',data.email);
                            this.props.history.push('/email');
                        }
                    },()=>{
                        ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
                    })
                }else{
                    this.setState({
                        msg:data,
                        btn:'确定',
                        fun:()=>{
                            ReactDom.findDOMNode(document.getElementById('alert')).style.display='none';
                        }
                    },()=>{
                        ReactDom.findDOMNode(document.getElementById('alert')).style.display='block';
                    })
                }
            })
        }

    }
}
