import React, { Component } from 'react';
export default class Table extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            inputVal:''
        }
    }
    input = (e)=>{
        
    }
    componentDidMount(){
        fetch(this.props.url || 'null').then(req=>req.json()).then(data=>{
            this.setState({
                data:data.data
            });
            console.log(data);
        })    
    }
    render() {
        let ul_out = {
            position:'relative',
            top:'50px',
            zIndex:'10',
            left:'10px'
        }
        let ul_inner = {
            borderBottom:'1px solid gray',
            float:'left',
            width:'100%'
        }
        return (
            <div>
                <ul style = {ul_out}>
                    <li key='ul_th'>
                        <ul style={ul_inner}>
                            {this.props.title.map(item=>{
                            return(<li className='li_inner' key={item}>{item}</li>);
                        })}
                            <li className='li_inner_form' key={`search${Math.random()*10000}`}>
                                <form method='POST'>
                                    <input type='search' placeholder='搜索' style={{position:'relative'}} id='search' name='search'/>
                                    <input type='submit' value='搜索' id='search_btn'/>
                                </form>
                            </li>
                        </ul>
                    </li>
                    {
                        this.state.data.map(item=>{
                            return(
                                <ul className='ul_inner'>
                                    {
                                        this.props.data.map(item1=>{
                                            return(<li className='li_inner' key={item[item1]||' '}><input type='text' value={item[item1]||' '}/></li>)
                                        })
                                    }
                                    <li className='li_inner' key={`submit${Math.random()*10000}`}>
                                        <form method='POST'>
                                            <input type='submit' value='提交' id='alter' name='alter'/>
                                            <input type='submit' value='删除' id='delete' name='delete'/>
                                        </form>
                                    </li> 
                                </ul>    
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
