import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Alert from '../component/main/Alert';
import Loading from './Loading';
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            loading:true
        }
    }
    componentDidMount(){
        this.setState({
            loading:false
        },()=>{
            // ReactDom.findDOMNode(document.getElementById('alert')).style.display = 'none';
        })
        
    }
    render() {
        let li = {
            marginTop:"30px"
        }
        if(this.state.loading === true){
            return(<Loading/>)
        }else{
            return (
                <div id = 'login_container'>
                <div id='login_bg'></div>
                <div>
                    <div id='login_title' className='animated bounceIn'><span>后台管理系统</span></div>
                    <div id = 'login' className='animated bounceIn'>
                    <Alert title="用户名或密码错误"/>
                    <form id='login_form'>
                        <ul>
                            <li style={li}><input type="text" placeholder="用户名" name='username' class='user' required='required' autocomplete="off"/></li>
                            <li style={li}><input type="password" placeholder="密码" name='password' class='pwd' required='required' autocomplete="off"/></li>
                            <li style={li}><input type="button" value="管理员登录" id='btn' onClick={(e)=>{this.fetchForm(e)}}/></li>
                        </ul>
                    </form>
                    </div>
                </div>
                </div>
            ) 
        }

    }
    fetchForm = (e)=>{
        let data = {
            username:document.getElementsByClassName('user')[0].value,
            password:document.getElementsByClassName('pwd')[0].value,
            type:'admin'
        }
        fetch('https://daitianfang.1459.top/admin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            mode:"cors",//跨域
            body: JSON.stringify(data)
          }).then(res=>{
              return res.text();
          }).then(data=>{
              switch (data) {
                  case 'success':{
                    this.props.history.push('/pages');
                    break;
                  }
                  case 'failed':{
                    let alert = document.getElementById('alert');
                    ReactDom.findDOMNode(alert).style.display = 'block';
                    break;
                  }
              }
          })
    }
}
