var express = require('express');
var router = express.Router();
var pg = require('pg');

//数据库基本配置  
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'suhuijun',
    password: '147852369',
    database: 'ACG'
  });
router.get('/main',(req,res,next)=>{
    let sqlStr = `SELECT * FROM admin`;
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err || val.rowCount < 0){
            res.json({status:'1',data:''});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });
});
router.get('/chapter',(req,res,next)=>{
    let sqlStr = ``;
});
router.get('/goods',(req,res,next)=>{
    let sqlStr = ``;
});
router.get('/orders',(req,res,next)=>{

});
router.get('/person',(req,res,next)=>{

});
module.exports = router;