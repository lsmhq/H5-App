var express = require('express');
var router = express.Router();
const pg = require("pg");

// var list = {

// }
var pgdb = new pg.Pool({
  host: '127.0.0.1',
  port: 5432,
  user: 'suhuijun',
  password: '147852369',
  database: 'ACG'
})
/* GET home page. */

router.get('/',function(req,res,next){
  let sql = 'SELECT userid,username FROM users';
  let ret = pgdb.query(sql);
  if(ret.rowCount <=0 ){
    res.json({status:-1});
    console.log(-1);
  }else{
    res.json({status:0,data:ret.rows});
    console.log(0);
  }
})
module.exports = router;
