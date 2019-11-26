function animate(obj,json,callback){
    clearInterval(obj.time);
         obj.time = setInterval(
                        function(){
                             var isStop =true;

                             for (var attr in json){
                                  if(attr == 'opacity'){
                                  var now = parseInt(getStyle(obj,attr)*100);
                             }
                             else
                                  var now = parseInt(getStyle(obj,attr));

                             var speed = ((json[attr]-now)/5);
                             speed = speed>0?Math.ceil(speed):Math.floor(speed);
                             if(attr=="opacity"){
                                  obj.style[attr] = (now +speed)/100;
                             } 
                             else
                                  obj.style[attr] = now +speed +'px';
                             var current = now +speed;
                             if(json[attr]!=current){
                             isStop = false
                             }
                             }
                             if(isStop){
                                  clearInterval(obj.time)
                                  callback&&callback();
                             }
                        }, 10);                  
}