import React, { Component } from 'react'
import ReactDom from 'react-dom';
export default class Alert extends Component {
    render() {
        let style = {
            position:'absolute',
            top: '0px',
            width:'370px',
            height:'150px',
            display:'',
            backgroundColor:"blue",
            borderRadius:'5px',
            left:'5%',
            opacity:'1',
            zIndex:'100'
        }
        let btn = {
            width: '90%',
            marginLeft: '1%',
            height: '40px',
            border: 'none',
            outline: 'none',
            fontSize: '20px',
            borderRadius: '5px',
            cursor:'pointer',
            backgroundColor:'pink'
        }
        return (
            <div id="alert" style={style}>
                <h3 style={{color:'orange'}}>{this.props.title}</h3>
                <p>请重新输入</p>
                <button style={btn} onClick={()=>{
                    document.getElementById('alert').style.display = 'none'
                    }}>{'确认'}</button>
            </div>
        )
    }

}
