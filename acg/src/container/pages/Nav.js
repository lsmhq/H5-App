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
                    <span style={{color:'white',float:'left'}}>{`欢迎< ${this.cookieToObj(document.cookie).username ? decodeURIComponent(atob(this.cookieToObj(document.cookie).username)) : 'XXX'} >登录`}</span>
                   <Link to={'/login'}><input type='button' value='退出登录' onClick={this.exit} className='exit'/></Link>
                </div>
            </div>
        )
    }
    exit = ()=>{
        this.setCookie('loginStatus','',-1);
        this.setCookie('username','',-1);
    }

    setCookie = (name, value, seconds) => {
        seconds = seconds || 0;   
        var expires = "";
        if (seconds != 0 ) {      
            var date = new Date();
            date.setTime(date.getTime()+(seconds*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+escape(value)+expires+"; path=/";
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
