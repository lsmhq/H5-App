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
  res.setHeader('Content-Type','text/plain;charset=utf-8');
  if(getObjLen(data) === 2){
    console.log('登录验证');
    pgdb.connect((error,client,done)=>{
      let sqlStr = 'SELECT username,password FROM users WHERE username=$1';
      client.query(sqlStr,[data.username],(err,value) => {
        done();
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
    })
  }
});
//注册提交
router.post('/',function(req,res,next){
  let data = req.body;
  console.log(data);
  res.setHeader('Content-Type','text/plain;charset=utf-8');
  if(getObjLen(data) ===4){
    console.log('注册提交');
    pgdb.connect((error,client,done)=>{
      let sqlStr = 'INSERT INTO users (email,userid,password) VALUES($1,$3,$2)';
      client.query(sqlStr,[data.email,data.username,data.password],(err,value)=>{
        done();
        res.redirect('/');
      });
    });
  }
});

function getObjLen(obj){
  let i = 0;
  for(let j in obj) {
      i++;
  }
  return i;
}
module.exports = router;
