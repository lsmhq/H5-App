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


router.post('/admin',(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control","no-cache"); 
    let data = req.body;
    // console.log(data);
    let len = Object.getOwnPropertySymbols(data).length;
    if(len == 1){
        // console.log('删除成功');
        let sql_del = `DELETE FROM admin WHERE userid=${data.userid}#${col}`;
        pgdb.query(sql_del,[],(err,val)=>{
            if(err){
                res.send('error');
            }else if(val.rows.length > 0){
                res.send('success');
            }else{
                res.send('error');
            }
        })
    }else{
        let sql_update = `UPDATE admin SET userid=${data.userid} WHERE userid=${data.userid}#${col}`;
        pgdb.query(sql_update,[],(err,val)=>{
            if(err){
                res.send('error');
            }else if(val.rows.length > 0){
                res.send('success');
            }else{
                res.send('error');
            }
        })
    }
});
module.exports = router;