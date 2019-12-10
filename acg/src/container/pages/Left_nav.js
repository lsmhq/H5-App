import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Left_nav extends Component {
    render() {
        return (
                <ul className='left_ul'>
                    <Link to={'/pages/'}><li className='left_li' id='main' onClick={this.clickLink}>首页</li></Link>
                    <Link to={'/pages/root'}><li className='left_li' id='root' onClick={this.clickLink}>管理员</li></Link>
                    <Link to={'/pages/person'}><li className='left_li' id='person' onClick={this.clickLink}>普通用户</li></Link>
                    <Link to={'/pages/chapter'}><li className='left_li' id='chapter' onClick={this.clickLink}>文章管理</li></Link>
                    <Link to={'/pages/talk'}><li className='left_li' id='talk' onClick={this.clickLink}>评论管理 </li></Link>
                    <Link to={'/pages/orders'}><li className='left_li' id='orders' onClick={this.clickLink}>订单管理</li></Link>
                    <Link to={'/pages/goods'}><li className='left_li' id='goods' onClick={this.clickLink}>商品管理</li></Link>
                </ul>
        )
    }
    clickLink = () => {
        let li = document.getElementsByClassName('left_li');
        for(let i = 0 ; i<li.length;i++){
            li[i].onclick = ()=>{
                for(let j = 0;j<li.length;j++){
                    li[j].classList.remove('selected');
                }
                li[i].classList.add('selected');
            }
        }
    }
    componentDidMount(){
        let id = window.location.pathname.split('#')[1];
        (id==='/')?id='main':id=id;
        document.getElementById(id);
    }
}
