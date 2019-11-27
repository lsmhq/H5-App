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
  pgdb.connect((error, client, done)=>{
    let sqlStr = 'SELECT userid,username FROM users';
    client.query(sqlStr, [],(err, response) => {
        done();
        res.json(response.rows);
    })
  })
})
module.exports = router;
