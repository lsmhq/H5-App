var express = require('express');
var router = express.Router();
var pg = require('pg');
var nodemailer = require('nodemailer');
var md5 = require('md5-node');
var url = '';
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
  res.render('fontIndex');
});
//登录验证
router.post('/',function(req,res,next){
  let data = req.body;
  console.log(data);
  if(data.type==='login'){
    console.log('登录验证');
      let sqlStr = 'SELECT name,password,status,id FROM users WHERE name=$1';
      pgdb.query(sqlStr,[data.username],(err,value) => {
        // console.log(value.rows[0].password);
        if(err){
          console.log(err);
          res.send('db is error');
        }else{
          if(value.rowCount > 0){
            if(value.rows[0].password == md5(data.password)&&value.rows[0].name==data.username&&value.rows[0].status==='已激活'){
              res.setHeader('Set-cookie',[`loginStatus=${md5('true')}`,`username=${new Buffer(encodeURIComponent(value.rows[0].name)).toString('base64')}`,`userid=${value.rows[0].id}`]);
              res.json({res:'success',id:value.rows[0].id});
            }else if(value.rows[0].status==='未激活'){
              res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
              res.json({res:'账号未激活'});
            }else{
              res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
              res.json({res:'error'});
            }
          }else{
            res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
            res.json({res:'error'});
          }
        }
      })
  }else if(data.type==='logup'){
    // console.log('注册提交');
      let sqlStr_insert = 'INSERT INTO users (email,id,password,name) VALUES($1,$2,$3,$4)';
      let sqlStr_select = 'SELECT name,email FROM users WHERE name=$1 OR email=$2'; 
        pgdb.query(sqlStr_select,[data.username,data.email],(err,val)=>{
          if(err){
            res.send('db is error');
          }else{
            if (val.rowCount <= 0){
              // console.log(val);
              pgdb.query(sqlStr_insert,[data.email,strRandom(10),md5(data.password),data.username],(err,val1)=>{
                // console.log(val1);
                if(err){
                  // console.log(err.message);
                  res.send('注册失败');
                }else if(val1.rowCount > 0){
                  // console.log(val1.rows);
                  res.send('success');
                }
            });
          }else if(val.rows[0].name === data.username){
            res.send('用户名已存在');
          }else if(val.rows[0].email === data.email){
            res.send('邮箱已被注册');
          }else{
            res.send('似乎出了些错误');
          }
          }
        })
  }else if(data.type==='check'){
    //发送邮件
    // console.log('发送邮件');
    let sqlStr = 'SELECT name,email FROM users WHERE name=$1';
    pgdb.query(sqlStr,[data.username],(err,val)=>{
      if(err){
        res.send('error');
      }else{
        let buf = new Buffer(`email=${val.rows[0].email}&username=${val.rows[0].name}`).toString('base64');
        url = `https://daitianfang.1459.top/check?${buf}`;
        const mailTransport = nodemailer.createTransport({
          host : `smtp.qq.com`,    
          secure: true,
          auth : { 
            user : 'acg_wiki@qq.com',
            pass : 'ogavunslmkqxbcif'
          },
      });
      let mailOptions = {
        from: '784433957@qq.com',
        to: `${val.rows[0].email}`,
        subject: 'acg--账号激活(官方)',
        html: `<div style='background-color:#636363;width: 100%;height: 300px;'>
        <div style="background-color:#303030;height: 50px;line-height: 50px;">
          <img src="https://daitianfang.1459.top/images/logo.png" width='45px' style="float: left;margin-left: 2%;margin-top: 1px;">
          <span style="font-size: 25px;float: left;margin-left:2%;font-weight: 800;color: #D6D6D6;">账号激活</span>
        </div>
        <hr style="height:5px;background-color: white;margin-top: -5px;width: 100%;" />
        <div style="text-indent: 50px;line-height: 40px;font-family: 'SimHei'">
          <span style="font-size: 20px;text-indent: 20px;">
              亲爱的< ${val.rows[0].name} >,您已注册成功,请尽快点击下方链接进行激活操作,否则系统将于1小时后自动清除未激活信息
            </span>
            <br/>
            <div style="text-align: center; font-family: 'Microsoft Yahei';font-weight: 500;width:100%;">
            <a href=${url} style="text-decoration: none;color: #EE5C42;font-size: 20px;margin-top: 10px;display: block;text-decoration-line:underline;">这是一个神秘链接</a>
            </div>
            <div style="text-align: center; font-family: 'Microsoft Yahei'">
            <span style="font-size: 10px;margin-top: 10px;color: #BABABA;">@第六开发集团</span>
            </div>
        </div>
      </div>`
      };
      mailTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.send('发送失败,请检查邮箱');
        }else{
          res.send('success');
        }
      });
    }
  });
}
});
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