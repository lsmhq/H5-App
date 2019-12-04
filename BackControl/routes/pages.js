var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
let msg = {
  error:'',
  val:'',
  title:''
}
//首页
router.get('/', function(req, res, next) {
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
});
router.get('/main',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/root',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/chapter',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/goods',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/orders',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/person',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
router.get('/talk',(req,res,next)=>{
  var cookie = cookieToObj(req.headers.cookie);
  check(res,cookie,msg);
})
//解析cookie
function cookieToObj(cookie){
  let obj = {};
  if(cookie){
      cookie.split(';').map(item=>{
          item = item.trim();
          let arr = item.split('=');
          obj[arr[0]] = arr[1];
      });
  }
  return obj;
}

function check(res,cookie,msg){
  if(cookie.loginStatus === md5('true')){
    res.render('index');
}else if(cookie.loginStatus === md5('false')){
  msg = {
    error:'用户名或密码错误',
    val:'尝试注册或激活账号',
    title:'Error',
    url:'/admin'
  }
  res.render('msg',{msg});
}else{
  msg = {
    error:'您还没有进行登录',
    val:'请注册账号',
    title:'Error',
    url:'/admin'
  }
  res.render('msg',{msg});
}
}
module.exports = router;
