var express = require('express');
var router = express.Router();
var pages = require('../public/json/list.json');
var md5 = require('md5-node');
var fetch = require('node-fetch');
var md5 = require('md5-node');
let msg = {
  error:'',
  val:'',
  title:''
}
//首页
router.get('/main', function(req, res, next) {
  var cookie = cookieToObj(req.headers.cookie);
  if(cookie.loginStatus === md5('true')){
    api_url = `https://daitianfang.1459.top/api/v1/main`;
    fetch(api_url).then(req_f => req_f.json()).then(data=>{
      data = {list:pages.list,data:pages.data[1]};
      data.tableData = data.data;
      res.render('main',{data});
    });
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
  api_url = `https://daitianfang.1459.top/api/v1/person?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});
  });
}); 

router.get('/consumer',(req,res,next)=>{
  api_url = `https://daitianfang.1459.top/api/v1/consumer?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});
  });
});

router.get('/chapter',(req,res,next)=>{
  api_url = `https://daitianfang.1459.top/api/v1/chapter?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});
  });
});
router.get('/talk',(req,res,next)=>{
  api_url = `https://daitianfang.1459.top/api/v1/talk?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});                                                                                      
  });
});
router.get('/orders',(req,res,next)=>{
  api_url = `https://daitianfang.1459.top/api/v1/orders?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});
  });
});
router.get('/goods',(req,res,next)=>{
  api_url = `https://daitianfang.1459.top/api/v1/goods?${md5('all')}`;
  fetch(api_url).then(req_f => req_f.json()).then(data=>{
    data = {list:pages.list,data:pages.data[1]};
    data.tableData = data.data;
    res.render('pages',{data});
  });
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
