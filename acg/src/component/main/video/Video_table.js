import React, {Component} from 'react';
import ReactDOM from "react-dom";

class Form extends Component {
    render() {
        return (
            <div className='insert_From'>
                <div className={'add'}>
                    <span>添加内容</span>
                    <button className={'close'} onClick={this.close}>关闭</button>
                </div>
                <input type={'file'} name={'img'} id={'img_upload'} onChange={this.upload} style={{display:'none'}}/>
                <img src={'./add.png'} width={'50px'} id={'img_show'}  onClick={this.upFile} alt={'封面'} title='封面'/>
                <input type={'file'} name={'img'} id={'img_upload1'} onChange={this.upload1} style={{display:'none'}}/>
                <img src={'./add.png'} width={'50px'} id={'img_show1'}  onClick={this.upFile1} alt={'视频'} title='视频'/>
                {
                    this.props.data.map(item=>{
                        return(
                            <input 
                                id='video_from'
                                type="text" 
                                name={item} 
                                placeholder={item} 
                                autoComplete={'off'}
                                />
                        )
                    })
                }
                <button onClick={this.fetch_insert} className={'insert_btn'}>确认添加</button>
            </div>
        );
    }
    close = ()=>{
        document.getElementsByClassName('insert_From')[0].className='insert_From animated fadeOut';
        setTimeout(()=>{
            document.getElementsByClassName('insert_From')[0].style.display='none';
        },1500)

    }

    fetch_insert = ()=>{
        let data = {};
        data.type = 'insert';
        this.props.data.map(item=>{

            data[item] = ReactDOM.findDOMNode(document.getElementsByName(item)[0]).value;
        })
        let reader = new FileReader();
        let cover = document.getElementById('img_upload').files[0];
        let video = document.getElementById('img_upload1').files[0];
        reader.readAsDataURL(cover);
        reader.onload = ()=>{
            data.imgType = reader.result.split('/')[1].split(';')[0];
            data.imgData = reader.result.split(',')[1];
            reader.readAsDataURL(video);
            reader.onload = ()=>{
                data.videoType = reader.result.split('/')[1].split(';')[0];
                data.videoData = reader.result.split(',')[1];
                let confirm = window.confirm('确定要添加该信息吗?');
                if(confirm){
                    console.log(data);
                    fetch(`https://daitianfang.1459.top/api/v1/video`,{
                        method:'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        mode:'cors',
                        body:JSON.stringify(data)
                    }).then(req=>req.text()).then(data=>{
                        if(data=='success'){
                            alert('操作成功');
                            document.getElementsByClassName('insert_From')[0].style.display='none';
                        }else{
                            alert('操作失败');
                            document.getElementsByClassName('insert_From')[0].style.display='none';
                        }
                    })
                }
            }
        }
    }
    upload = ()=>{
        let reader = new FileReader();
        let file = document.getElementById('img_upload').files[0];
        console.log(file);
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            console.log(reader.result);
            document.getElementById('img_show').src = reader.result;
            document.getElementById('img_show').className = 'animated fadeIn';
        }
    }
    upFile = ()=>{
        document.getElementById('img_upload').click();
        document.getElementById('img_show').className = '';
    }
    upload1 = ()=>{
        let reader = new FileReader();
        let file = document.getElementById('img_upload1').files[0];
        console.log(file);
        reader.readAsDataURL(file);
        reader.onload = ()=>{
            console.log(reader.result);
            document.getElementById('img_show1').src = '/video.jpg';
            document.getElementById('img_show1').className = 'animated fadeIn';
        }
    }
    upFile1 = ()=>{
        document.getElementById('img_upload1').click();
        document.getElementById('img_show1').className = '';
    }
}

export default Form;