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
// const pool = new pg.Pool(pgConfig);
/* GET home page. */

router.get('/',function(req,res,next){
  pgdb.connect(function(error, client, done) {
    let sqlStr = 'SELECT * FROM test';      // 查表的SQL语句
    client.query(sqlStr, [], function(err, res) {
        done();
        console.log(res.rows)  		  // 根据SQL语句查出的数据
    })
  })
})
module.exports = router;
