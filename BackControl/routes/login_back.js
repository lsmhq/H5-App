var express = require('express');
var router = express.Router();
var pg = require('pg');
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
      let sqlStr = 'SELECT username,password FROM users WHERE username=$1';
      pgdb.query(sqlStr,[data.username],(err,value) => {
        // console.log(value.rows[0].password);
        if(value.rowCount > 0){
          if(value.rows[0].password === data.password){
            console.log(1);
            res.setHeader('Set-cookie',[`loginStatus=true`]);
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
      let sqlStr_insert = 'INSERT INTO users (email,userid,password,username) VALUES($1,$2,$3,$4)';
      let sqlStr_select = 'SELECT username,email FROM users WHERE username=$1 OR email=$2'; 
      pgdb.query(sqlStr_select,[data.username,data.email],(err,val)=>{
        console.log(val.rows[0]);
        if (val.rowCount <= 0){
            pgdb.query(sqlStr_insert,[data.email+'',strRandom(10),data.pwd[0]+'',data.username+''],(err,val1)=>{
              if(val1.rowCount > 0)
                res.render('success',{success:'注册成功'});
          });
        }else if(val.rows[0].username === data.username){
          res.render('wrong',{error:'用户名已存在'});
        }else if(val.rows[0].email === data.email){
          res.render('wrong',{error:'邮箱已被注册过'});
        }
      })
  }
});
function getObjLen(obj){
  let i = 0;
  for(let j in obj) {
      i++;
  }
  return i;
}

function strRandom(j){
  var str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz123456789';
  var outStr = '';
  for(let i =0;i<j;i++){
    outStr += str[parseInt(Math.random()*str.length-1)];
  }
  return outStr;
}
module.exports = router;
