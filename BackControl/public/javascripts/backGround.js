var Num = 1;
var agent = navigator.userAgent;
//console.log(agent);
function backGround(time,Jobj) {
    var left = window.innerWidth;
    setInterval(function () {
        Jobj.css({
            left:parseInt(-left)*(Num-1)
        }).animate({
            left:parseInt(-left)*(Num)
        },"linear",function(){
        if(agent.indexOf('Windows') == -1){
            if(Num == 2){
                Num = 1;
            }
            else{
                Num++;
            }
        }else{
            if(Num == 7){
                Num = 1;
            }else{
                Num++;
            }
        }
        //console.log(Num);
    });
    },time);
}