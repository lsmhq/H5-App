var express = require('express');
var qs = require('querystring');
var router = express.Router();
var pages = require('../public/json/list.json');
console.log(pages);
let msg = {
  error:'',
  val:'',
  title:''
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  var cookie = cookieToObj(req.headers.cookie);
  if(cookie.loginStatus === 'true'){
    var page = qs.parse(req.url.split('?')[1]).page;
    // console.log('page:',page);
    switch(page){
      case 'person':{
        // console.log('person');
        let data = {list:pages.list,data:pages.data[1]}
        res.render('pages',{data});
        break;
      }
      case 'consumer':{
        // console.log('consumer');
        let data = {list:pages.list,data:pages.data[2]}
        res.render('pages',{data});
        break;
      }
      case 'chapter':{
        // console.log('chapter');
        let data = {list:pages.list,data:pages.data[3]}
        res.render('pages',{data});
        break;
      }
      case 'talk':{
        // console.log('talk');
        let data = {list:pages.list,data:pages.data[4]}
        res.render('pages',{data});
        break;
      }
      case 'orders':{
        // console.log('order');
        let data = {list:pages.list,data:pages.data[5]}
        res.render('pages',{data});
        break;
      }
      case 'goods':{
        let data = {list:pages.list,data:pages.data[6]}
        res.render('pages',{data});
      }
      default:{
        res.render('main',{pages:pages.list});
      }
    }
  }else if(cookie.loginStatus === 'false'){
    msg = {
      error:'用户名或密码错误',
      val:'尝试注册或激活账号',
      title:'Error'
    }
    res.render('msg',{msg});
  }
  else if(cookie.loginStatus == undefined){
    msg = {
      error:'您还没有进行登录',
      val:'马上登录',
      title:'Error'
    }
    res.render('msg',{msg});
  }
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
