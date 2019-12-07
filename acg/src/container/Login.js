import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Alert from '../component/main/Alert';
export default class Login extends Component {

    componentDidMount(){
        ReactDom.findDOMNode(document.getElementById('alert')).style.display = 'none';
    }
    render() {
        let li = {
            marginTop:"30px"
        }
        return (
            <div id = 'login_container'>
            <div id='login_bg'>
                <div id='login_title'><span>后台管理系统</span></div>
                <div id = 'login'>
                <Alert title="用户名或密码错误"/>
                <form id='login_form'>
                    <ul>
                        <li style={li}><input type="text" placeholder="用户名" name='username' class='user' required='required' autocomplete="off"/></li>
                        <li style={li}><input type="password" placeholder="密码" name='password' class='pwd' required='required' autocomplete="off"/></li>
                        <li style={li}><input type="button" value="登录" id='btn' onClick={(e)=>{this.fetchForm(e)}}/></li>
                    </ul>
                </form>
                </div>
            </div>
            </div>
        )
    }
    fetchForm = (e)=>{
        let data = {
            username:document.getElementsByClassName('user')[0].value,
            password:document.getElementsByClassName('pwd')[0].value
        }
        console.log(data);
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
              console.log(data);
              switch (data) {
                  case 'success':{
                    console.log('0');
                    this.props.history.push('/pages');
                    break;
                  }
                  case 'failed':{
                    console.log('1');
                    let alert = document.getElementById('alert');
                    ReactDom.findDOMNode(alert).style.display = 'block';
                    break;
                  }
              }
          })
    }
}
