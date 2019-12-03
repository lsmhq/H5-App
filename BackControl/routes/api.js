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
    let sqlStr = `SELECT username FROM users`;
    let sqlStr_context = `SELECT contextid FROM context`;
    pgdb.query(sqlStr_context,[],(err,val1)=>{
        pgdb.query(sqlStr,[],(err,val)=>{
            if(err || val.rowCount < 0){
                res.json({status:'1',data:''});
            }else{
                res.json({status:'0',data:[{users_num:val.rowCount},{context_num:val1.rowCount}]});
            }
        });
    });
});
router.get('/chapter',(req,res,next)=>{
    let sqlStr = `SELECT * FROM context`;
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err || val.rowCount<0){
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:''});
        }
    });

});
router.get('/goods',(req,res,next)=>{
    let sqlStr = ``;
});
router.get('/orders',(req,res,next)=>{

});
router.get('/person',(req,res,next)=>{

});
module.exports = router;