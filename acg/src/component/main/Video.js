import React, { Component } from 'react';
import Upload from '../main/video/Video_table';
import { findDOMNode } from 'react-dom';
export default class Video extends Component {
    constructor(){
        super()
        this.state = {
            url:'https://daitianfang.1459.top/api/v1/video?id=all',
            data:[]
        }
    }
    componentDidMount(){
        this.myfetch(this.state.url);
    }
    myfetch = (url)=>{
        fetch(url).then(data=>data.json()).then(res=>{
            this.setState({
                data:res.data
            })
        })
    }
    remove = ()=>{
        let data = {
            type:'delete',
            id:findDOMNode(document.getElementById('delete')).name.trim()
        }
        console.log(data);
        fetch(this.state.url,
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                mode:'cors',
                body:JSON.stringify(data)
            }).then((res)=>res.text()).then((data)=>{
                alert(data);
            })
    }
    render() {
        return (
            <div style={{height:'100%',width:'100%',float:'left',marginTop:'5%'}}>
                <Upload data={['id','title','dirname']} id = {this.state.data.length+1}/>
                {
                    this.state.data.map((val,idx)=>{
                        console.log(val)
                        var str = idx == 0?'1%':'20%';
                        return(
                            <div style={{width:'95%',height:'70%',marginTop:str,marginLeft:'2%'}}>
                                <div style={{display:'block',backgroundColor:'Gainsboro',height:'10%',textAlign:'center'}}>
                                    <h3 style={{float:'left',marginTop:'1%'}}>
                                        {val.titel+'——————'+(val.autherid?val.autherid:'匿名')}
                                    </h3>
                                    <input 
                                        type='button' 
                                        onClick = {(e)=>{this.remove(e)}} 
                                        title='删除'
                                        value='删除' 
                                        id='delete'
                                        name={val.id}
                                        style={{width:'10%',height:'100%',float:'right',backgroundColor:'OrangeRed',borderRadius:'5px',border:'none',cursor:'pointer'}}  
                                    />
                                </div>
                                <video 
                                    src={val.barragefile} 
                                    width='100%' 
                                    height="100%" 
                                    title={val.titel} 
                                    controls preload
                                    defaultValue={val.titel}
                                    ></video>
                            </div>
                        )
                    })
                }
                <div style={{width:'100',height:'20%'}}></div>
            </div>
        )
    }
}
