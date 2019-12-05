import React, { Component } from 'react'

export default class Login extends Component {

    render() {
        let li = {
            marginTop:"30px"
        }
        return (
            <div id = 'login_container'>
            <div id='login_bg'>
                <div id='login_title'><span>后台管理系统</span></div>
                <div id = 'login'>
                <form action="/admin" method="POST">
                    <ul>
                        <li style={li}><input type="text" placeholder="用户名" name='username' class='user' required='required' autocomplete="off"/></li>
                        <li style={li}><input type="password" placeholder="密码" name='password' class='pwd' required='required' autocomplete="off"/></li>
                        <li style={li}><input type="submit" value="登录" id='btn'/></li>
                    </ul>
                </form>
                </div>
            </div>
            </div>
        )
    }
}
