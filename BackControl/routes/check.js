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

router.get('/',(req,res,next)=>{
    res.render('check');
});

router.post('/',(req,res,next)=>{
    let data = req.body;
    console.log(data);
    let sqlStr = 'SELECT username,email FROM admin WHERE username=$1 AND email=$2';
    let sqlStr_Alter = "UPDATE admin SET state='已激活' WHERE username=$1 AND email=$2";
    let msg = {
        error:'',
        val:''
    }
    pgdb.query(sqlStr,[data.username,data.email],(err,val)=>{
        if(err){
            console.log(err.message);
        }else if(data.username === val.rows[0].username && data.email === val.rows[0].email){
            pgdb.query(sqlStr_Alter,[data.username,data.email],(err,val1)=>{
                if(val1.rowCount > 0){
                    msg.error = '激活成功';
                    msg.val = '跳转登录';
                    res.render('wrong',{msg});
                }
            });
        }else{
            msg.error = '激活失败,请检查注册信息是否正确';
            msg.val = '重新注册';
            res.render('wrong',{msg});
        }
    })
});

module.exports = router;