var express = require('express');
var router = express.Router();
var pages = require('../public/json/list.json');
var md5 = require('md5-node');
console.log(pages);
let msg = {
  error:'',
  val:'',
  title:''
}
/* GET users listing. */
router.get('/main', function(req, res, next) {
  var cookie = cookieToObj(req.headers.cookie);
  if(cookie.loginStatus === md5('true')){
    res.render('main',{pages:pages.list});
  }else if(cookie.loginStatus === md5('false')){
    msg = {
      error:'用户名或密码错误',
      val:'尝试注册或激活账号',
      title:'Error',
      url:'/admin'
    }
    res.render('msg',{msg});
  }
});

router.get('/person',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[1]}
  res.render('pages',{data});
});
router.get('/consumer',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[2]}
  res.render('pages',{data});
});
router.get('/chapter',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[3]}
  res.render('pages',{data});
});
router.get('/talk',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[4]}
  res.render('pages',{data});
});
router.get('/orders',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[5]}
  res.render('pages',{data});
});
router.get('/goods',(req,res,next)=>{
  let data = {list:pages.list,data:pages.data[6]}
  res.render('pages',{data});
});
router.get('/person',(req,res,next)=>{
  
});
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
module.exports = router;
