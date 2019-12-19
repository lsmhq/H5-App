import React, { Component } from 'react';
export default class Alert extends Component {
    render() {
        let style = {
            position:'absolute',
            top: '10px',
            width:'370px',
            height:'250px',
            display:'none',
            backgroundColor:"rgb(165, 212, 255)",
            borderRadius:'5px',
            left:'5%',
            opacity:'1',
            zIndex:'100',
            lineHeight:'50px'
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
            <div id="alert" style={style} className='animated shake'>
                <h3 style={{color:'rgb(228, 72, 0)'}}>{this.props.title}</h3>
                <p>请重新输入</p>
                <button style={btn} onClick={()=>{
                    document.getElementById('alert').style.display = 'none'
                    }}>{'确认'}</button>
            </div>
        )
    }

}
