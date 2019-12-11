var express = require('express');
var router = express.Router();
var pg = require('pg');
var md5 = require('md5-node');
let msg = {
  error:'',
  val:'',
  title:'',
  url:''
}
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
  res.render('index');
});
//登录验证
router.post('/',function(req,res,next){
  let data = req.body;
  // console.log(data);
  if(data.type === 'admin'){
    console.log('登录验证');
      let sqlStr = 'SELECT username,password FROM admin WHERE username=$1';
      pgdb.query(sqlStr,[data.username],(err,value) => {
        // console.log(value.rows[0].password);
        if(err){
          res.send('failed');
        }else{
          if(value.rowCount > 0){
            if(value.rows[0].password === md5(data.password)&&value.rows[0].username===data.username){
              console.log(1);
              res.setHeader('Set-cookie',[`loginStatus=${md5('true')}`,`username=${new Buffer(encodeURIComponent(value.rows[0].username)).toString('base64')}`]);
              res.send('success');
            }else{
              res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
              res.send('failed');
            }
          }else{
            res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
            res.send('failed');
          }
        }
      })
  }else if(data.type === 'writer'){
    let sqlStr = 'SELECT name,password,status FROM users WHERE name=$1';
    console.log(data);
    pgdb.query(sqlStr,[data.username],(err,val)=>{
      if(err){
        console.log(err.message);
        res.send('failed');
      }else{
        if(val.rowCount > 0){
          if(val.rows[0].password === md5(data.password)&&val.rows[0].name===data.username){
            console.log(1);
            res.setHeader('Set-cookie',[`loginStatus=${md5('true')}`,`username=${new Buffer(encodeURIComponent(value.rows[0].username)).toString('base64')}`]);
            res.send('success');
          }else{
            res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
            res.send('failed');
          }
        }else{
          res.setHeader('Set-cookie',[`loginStatus=${md5('false')}`]);
          res.send('failed');
        }
      }
    })
  }
});

module.exports = router;