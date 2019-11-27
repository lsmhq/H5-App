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
  if(data.length === 2){
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
  }else if(data.length === 4){
    
  }
});
module.exports = router;
