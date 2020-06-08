import React, { Component } from 'react'

import Video from '../component/main/Video';
export default class Person extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'100%'}}>
                <div style={{width:'85%',textAlign:'center',fontSize:'20px',backgroundColor:'#BEBEBE',height:'50px',lineHeight:'50px',position:'fixed',zIndex:'20'}}>
                    <span>视频管理</span>
                    <input 
                        type='button' 
                        style={{
                            float:'right',
                            marginTop:'5px',
                            marginRight:'2%',
                            color:'white',
                            width:'5%',
                            height:'80%',
                            backgroundColor:'#2E2E2E',
                            borderRadius:'5px',
                            border:'none',
                            cursor:'pointer'
                        }} 
                        value='上传'
                        onClick = {(e)=>{
                            this.upLoad(e);
                        }}
                    />
                </div>
                <Video/>
            </div>
        )
    }
    upLoad = ()=>{
        document.getElementsByClassName('insert_From')[0].className = 'insert_From animated fadeInDown';
        document.getElementsByClassName('insert_From')[0].style.display = 'block';
    }
}

