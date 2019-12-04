import React, { Component } from 'react'

export default class Nav extends Component {

    render() {
        let header_style = {
            width:"100%",
            height:'50px',
            backgroundColor:'#272727'
            
        }
        console.log(document.cookie);
        return (
            <div style = {header_style}>
                <img src='/logo.png' width='50px' style={{marginLeft:'6%'}}/>
                <div style={{float:'right'}}>
                    <span style={{color:'white'}}>{`欢迎${this.cookieToObj(document.cookie).username||'？？？'}登录`}</span>
                    <input type='button' value='退出登录' onClick={this.exit}/>
                </div>
            </div>
        )
    }
    exit = ()=>{
        window.location.pathname='/admin';
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
