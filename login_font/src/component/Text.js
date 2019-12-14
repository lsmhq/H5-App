import React, { Component } from 'react';

export default class Text extends Component {
    render() {
        return (
            <div>
                {
                    this.props.num.map((item,index)=>{
                        if(index === 0){
                        return(<div  className='content' contenteditable="true" id='content#0' style={{marginTop:'90px'}}></div>)
                        }else{
                            let top = (10)+'px';
                            return(<div  className='content' style={{marginTop:top}} contenteditable="true" id={'content#'+index}></div>)
                        }
                    })
                }
            </div>
        )
    }
}
