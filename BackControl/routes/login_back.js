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
      let sqlStr = 'SELETE username,password FROM users WHERE username=$1';
      client.query(sqlStr,[data.username],(err,value) => {
        if(value.rowCount!=0){
          if(value.rows.password === data.password){
            res.setHeader('Set-cookie',[`loginStatus=true`]);
          }else{
            res.setHeader('Set-cookie',[`loginStatus=false`]);
          }
        }else{
          res.setHeader('Set-cookie',[`loginStatus=false`]);
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
