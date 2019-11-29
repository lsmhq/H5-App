var express = require('express');
var router = express.Router();
var pg = require('pg');
var nodemailer = require('nodemailer');
var md5 = require('md5-node');
var server = 'qq';
var url = '';

let msg = {
  error:'',
  val:''
}
var data_time;
//数据库基本配置  
var pgdb = new pg.Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'suhuijun',
  password: '147852369',
  database: 'ACG'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
//登录验证
router.post('/',function(req,res,next){
  let data = req.body;
  console.log(data);
  res.setHeader('Content-Type','text/html;charset=utf-8');
  if(getObjLen(data) === 2){
    console.log('登录验证');
      let sqlStr = 'SELECT username,password,state FROM admin WHERE username=$1';
      pgdb.query(sqlStr,[data.username],(err,value) => {
        // console.log(value.rows[0].password);
        if(value.rowCount > 0){
          if(value.rows[0].password === md5(data.password)&&value.rows[0].username===data.username&&value.rows[0].state==='已激活'){
            console.log(1);
            res.setHeader('Set-cookie',[`loginStatus=true`]);
            res.redirect('/pages?page=main');
          }else if(value.rows[0].state==='未激活'){
            res.setHeader('Set-cookie',[`loginStatus=false`]);
            // res.render('success',{success:'账号未激活,无法登录'});
            res.redirect('/pages?page=main');
          }else{
            res.setHeader('Set-cookie',[`loginStatus=false`]);
            res.redirect('/pages?page=main');
          }
        }else{
          res.setHeader('Set-cookie',[`loginStatus=false`]);
          res.redirect('/pages?page=main');
        }
      })
  }else if(getObjLen(data) === 3){
    console.log('注册提交');
      let sqlStr_insert = 'INSERT INTO admin (email,userid,password,username) VALUES($1,$2,$3,$4)';
      let sqlStr_select = 'SELECT username,email FROM admin WHERE username=$1 OR email=$2'; 
      pgdb.query(sqlStr_select,[data.username,data.email],(err,val)=>{
        // console.log(val.rows[0]);
        if(err){
          msg.error = '后台又双叒叕炸了';
          msg.val = '稍后再试';
          res.render('wrong',{msg});
        }else{
          if (val.rowCount <= 0){
            // console.log(val);
            pgdb.query(sqlStr_insert,[data.email+'',strRandom(10),md5(data.pwd[0]+''),data.username+''],(err,val1)=>{
              // console.log(val1);
              if(err){
                msg.error = err.message;
                msg.val = '稍后再试';
                res.render('wrong',{msg});
                // console.log(err.message);
              }else if(val1.rowCount > 0){
                data_time = data;
                res.render('success',{success:'注册成功,点击下方激活'});
              }
          });
        }else if(val.rows[0].username === data.username){
          msg.error = '用户名已存在';
          msg.val = '返回登录界面';
          res.render('wrong',{msg});
        }else if(val.rows[0].email === data.email){
          msg.error = '邮箱已被注册过';
          msg.val = '点击激活';
          res.render('success',{success});
        }else{
          msg.error = '似乎出了些问题';
          msg.val = '返回登录界面';
          res.render('wrong',{msg});
        }
        }
      })
  }else if(getObjLen(data) === 0){
    //发送邮件
    console.log('发送邮件');
    server = data_time.email.split('@')[1].split('.')[0];
    url = `https://daitianfang.1459.top/check?email=${data_time.email}&username=${data_time.username}`;
    const mailTransport = nodemailer.createTransport({
      host : `smtp.${server}.com`,    
      secure: true,   
      auth : { 
        user : '784433957@qq.com',       
        pass : 'ogavunslmkqxbcif'   
      },
  });
    let mailOptions = {
      from: '784433957@qq.com',
      to: `${data_time.email}`,
      subject: 'acg--账号激活(官方)',
      text: `亲爱的${data_time.username},您已注册成功,点击下方链接进行激活操作`, 
      html: `<a href = ${url}>这是一个神秘链接</a>`
    };
    mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error.message);
      }else{
        msg.error='邮件已发送成功,注意查收';
        msg.val = '激活后点击返回登录';
        res.render('wrong',{msg});
      }
      
    });
  }
});
//对象元素个数
function getObjLen(obj){
  let i = 0;
  for(let j in obj) {
      i++;
  }
  return i;
}
//随机字符串
function strRandom(j){
  var str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz123456789';
  var outStr = '';
  for(let i =0;i<j;i++){
    outStr += str[parseInt(Math.random()*str.length-1)];
  }
  return outStr;
}
module.exports = router;
