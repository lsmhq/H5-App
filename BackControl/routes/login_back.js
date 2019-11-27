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

router.post('/',function(req,res,next){
  let data = req.body;
  res.setHeader('Content-Type','text/plain;charset=utf-8');

  if(body.length === 2){
    pgdb.connect((error,client,done)=>{
      let sqlStr = 'SELETE  FROM users';
      client.query(sqlStr,[body.username],(err,value) => {
        if(value){
          
        }
      })
    })
    if(json.username === data.username && json.password === data.password){
      console.log('success!');
      res.setHeader('Set-cookie',[`loginStatus=true`]);
      res.redirect('/pages?page=main');
    }else{
      console.log('failed!');
      res.setHeader('Set-cookie',[`loginStatus=false`]);
      res.end('用户名或密码错误');
    }
  }else{
    
  }
});

module.exports = router;
