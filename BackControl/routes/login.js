var express = require('express');
var router = express.Router();
var pg = require('pg');
var nodemailer = require('nodemailer');
var md5 = require('md5-node');
var server = 'qq';
var url = '';
//msg.html 页面提示信息
let msg = {
  error:'',
  val:'',
  title:''
}
//临时变量
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
  //设置头
  res.setHeader('Content-Type','text/html;charset=utf-8');
  if(getObjLen(data) === 2){
    console.log('登录验证');
    //接入数据库查询
      let sqlStr = 'SELECT username,password,state FROM users WHERE username=$1';
      pgdb.query(sqlStr,[data.username],(err,value) => {
        // console.log(value.rows[0].password);
        //返回error页面
        if(err){
          msg.error = `似乎出了点问题`;
          msg.val = '返回';
          msg.title = 'Error';
          res.render('msg',{msg});
        }else{
          //对比信息
          if(value.rowCount > 0){
            if(value.rows[0].password === md5(data.password)&&value.rows[0].username===data.username&&value.rows[0].state==='已激活'){
              console.log(1);
              res.setHeader('Set-cookie',[`loginStatus=${md5('true')}`]);
              res.redirect('/pages');
            }else if(value.rows[0].state==='未激活'){
              res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
              res.redirect('/pages');
            }else{
              res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
              res.redirect('/pages');
            }
          }else{
            res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
            res.redirect('/pages');
          }
        }
      })
  }else if(getObjLen(data) === 3){
    console.log('注册提交');
      let sqlStr_insert = 'INSERT INTO users (email,userid,password,username) VALUES($1,$2,$3,$4)';
      let sqlStr_select = 'SELECT username,email FROM users WHERE username=$1 OR email=$2'; 
      pgdb.query(sqlStr_select,[data.username,data.email],(err,val)=>{
        // console.log(val.rows[0]);
        if(err){
          msg.error = '后台又双叒叕炸了';
          msg.val = '稍后再试';
          msg.title = 'Error'
          res.render('msg',{msg});
        }else{
          if (val.rowCount <= 0){
            // console.log(val);
            pgdb.query(sqlStr_insert,[data.email+'',strRandom(10),md5(data.pwd[0]+''),data.username+''],(err,val1)=>{
              // console.log(val1);
              if(err){
                msg.error = err.message;
                msg.val = '稍后再试';
                msg.title = 'Error';
                res.render('msg',{msg});
                // console.log(err.message);
              }else if(val1.rowCount > 0){
                data_time = data;
                res.render('success',{success:'注册成功,点击下方激活'});
              }
          });
        }else if(val.rows[0].username === data.username){
          msg.error = '用户名已存在';
          msg.val = '返回登录界面';
          msg.title = 'msg'
          res.render('msg',{msg});
        }else if(val.rows[0].email === data.email){
          msg.error = '邮箱已被注册过';
          msg.val = '点击激活';
          msg.title = 'msg';
          res.render('success',{success});
        }else{
          msg.error = '似乎出了些问题';
          msg.val = '返回登录界面';
          msg.title = 'msg';
          res.render('msg',{msg});
        }
        }
      })
  }else if(getObjLen(data) === 0){
    //发送邮件
    console.log('发送邮件');
    server = data_time.email.split('@')[1].split('.')[0];
    url = `https://daitianfang.1459.top/check?email=${data_time.email}&username=${data_time.username}&type=font`;
    const mailTransport = nodemailer.createTransport({
      host : `smtp.${server}.com`,
      secure: true,
      auth : { 
        user : 'acg_wiki@qq.com',
        pass : 'ogavunslmkqxbcif'
      },
  });
    let mailOptions = {
      from: '784433957@qq.com',
      to: `${data_time.email}`,
      subject: 'acg--账号激活(官方)',
      html: `<div style='background-color:#636363;width: 100%;height: 300px;'>
	<div style="background-color:#303030;height: 50px;line-height: 50px;">
		<img src="/images/logo.png" width='45px' style="float: left;margin-left: 2%;margin-top: 1px;border:1px solid pink;>
		<span style="font-size: 25px;float: left;margin-left: 2%;font-weight: 800;color: #D6D6D6;">账号激活</span>
	</div>
	<hr style="height:5px;background-color: white;margin-top: -5px;width: 100%;" />
	<div style="text-indent: 50px;line-height: 40px;font-family: 'SimHei'">
		<span style="font-size: 20px;text-indent: 20px;">
    		亲爱的< ${data_time.username} >,您已注册成功,请尽快点击下方链接进行激活操作,否则系统将自动清除注册信息
    	</span>
    	<br/>
    	<div style="text-align: center; font-family: 'Microsoft Yahei';font-weight: 500;">
			<a href=${url} style="text-decoration: none;color: #EE5C42;font-size: 20px;width: 100%;margin-top: 10px;display: block;text-decoration-line:underline;">这是一个神秘链接</a>
    	</div>
    	<div style="text-align: center; font-family: 'Microsoft Yahei'">
			<span style="font-size: 10px;margin-top: 10px;color: #BABABA;">@第六开发集团</span>
    	</div>
	</div>
</div>`
    };
    mailTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
        msg.error = `发送失败<${error.message}>`;
        msg.val = '返回重新注册';
        msg.title = 'Error';
        res.render('msg',{msg});
      }else{
        msg.error='邮件已发送成功,注意查收';
        msg.val = '激活后点击返回登录';
        msg.title = 'Success';
        res.render('msg',{msg});
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