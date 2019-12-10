import React, { Component } from 'react';
export default class Table extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            inputVal:'',
            addVal:''
        }
    }
    inputOnchange = (e)=>{
        let arr = e.target.name.split('#');
        this.state.data.map((item,index)=>{
            if(index == arr[1]){
                item[arr[0]]=e.target.value
            }
        })
        this.setState({
            data:this.state.data
        })
    }
    componentDidMount(){
        this.fetchData();
    }
    componentWillMount(){
        this.fetchData();
    }
    fetchData = ()=>{
        fetch(this.props.url || 'null').then(req=>req.json()).then(data=>{
            console.log(data.data);
            this.setState({
                data:data.data
            });
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
                                    <input type='button' value='搜索' id='search_btn' onClick={(e)=>{this.fetch_select(e)}}/>
                                </form>
                            </li>
                        </ul>
                    </li>
                    {
                        this.state.data.map((item,index)=>{
                            return(
                                <ul className='ul_inner'>
                                    <form method='POST'>
                                    {
                                        this.props.data.map((item1,index1)=>{                                                                                                                              //item:属性名#item1:属性索引
                                            return(<li className='li_inner' key={index1}><input type='text' name={item1+'#'+index} value={item[item1]} onChange={(e)=>{this.inputOnchange(e)}}/></li>)
                                        })
                                    }
                                    <li className='li_inner' key={item+index}>
                                            <input type='button' value='提交' id='alter' name={`alter#${index}`} onClick={(e)=>{this.fetch_update(e)}}/>
                                            <input type='button' value='删除' id='delete' name={`delete#${index}`} onClick={(e)=>{this.fetch_del(e)}}/>
                                    </li> 
                                </form>
                                </ul>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    fetch_del = (e)=>{
        let col = e.target.name.split('#')[1];
        let name = this.props.data[0];
        console.log(name+'#'+col);
        let id = document.getElementsByName(name+'#'+col)[0].value;
        console.log(name);
        let data = {};
        data.type = 'del'
        data[name] = id;
        var confirm = window.confirm('点击确认删除信息');
        if(confirm){
            fetch(`https://daitianfang.1459.top/api/v1/${this.props.type}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },mode:"cors",
                body: JSON.stringify(data)
              }).then(req=>req.text()).then(data=>{
                  console.log(data);
                  if(data === 'success'){
                    this.fetchData();
                  }

              })
        }else{
            return 0;
        }

    }
    fetch_update =(e)=>{
        let col = e.target.name.split('#')[1];
        let name = this.props.data;
        let data = {};
        data.type = 'update';
        for(let i =0 ;i<name.length;i++){
            data[name[i]] = document.getElementsByName(name[i]+'#'+col)[0].value;
        }
        let confirm = window.confirm('点击确定修改信息');
        if(confirm){
            fetch(`https://daitianfang.1459.top/api/v1/${this.props.type}`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },mode:"cors",
                body: JSON.stringify(data)
              }).then(res=>res.text()).then((data)=>{
                console.log(data);
                this.fetchData();
              })
        }else{
            return 0;
        }
    }
    fetch_select = (e)=>{
        let data = {
            search:document.getElementById('search').value
        };
        data.type = 'select';
        fetch(`https://daitianfang.1459.top/api/v1/${this.props.type}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },mode:"cors",
            body: JSON.stringify(data)
        }).then(req=>req.json()).then(data=>{
            this.setState({
                data:data
            })
        })
    }   
}
