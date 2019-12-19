import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Nav extends Component {

    render() {
        let header_style = {
            width:"100%",
            height:'50px',
            backgroundColor:'#272727',
            lineHeight:'50px'
        }
        return (
            <div style = {header_style}>
                <img src='/images/logo.png' width='50px' style={{marginLeft:'6%'}}/>
                <div style={{float:'right',width:'300px'}}>
                    <span style={{color:'white',float:'left'}}>{`欢迎< ${decodeURIComponent(atob(this.cookieToObj(document.cookie).username)) ||'？？？'} >登录`}</span>
                   <Link to={'/login'}><input type='button' value='退出登录' onClick={this.exit} className='exit'/></Link>
                </div>
            </div>
        )
    }
    exit = ()=>{
        document.cookie = `username=${''}`;
        document.cookie = `loginStatus=${''}`;
    }

    //解析cookie
 cookieToObj = (cookie)=>{
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
