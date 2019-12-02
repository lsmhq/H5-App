var express = require('express');
var router = express.Router();
var qs = require('querystring');
var pg = require('pg');
var url = require('url');
//数据库基本配置  
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'suhuijun',
    password: '147852369',
    database: 'ACG'
  });

let msg = {
    error:'',
    val:'',
    title:'',
    url:''
}
router.get('/',(req,res,next)=>{
    let buf = new Buffer(req.url.split('?')[1],'base64');
    let data = buf.toString('utf8').split("&");
    let data_obj = arrToObj(data,'=');
    switch(data_obj.type){
        case 'back':{
            check('admin',data_obj,res,msg);
            break;
        }
        case 'font':{
            check('users',data_obj,res,msg);
            break;
        }
    }
});

// router.post('/',(req,res,next)=>{
//     switch (obj.type){
//         case 'back':{
//             msg.url = '/admin';
//             check('admin',data,res,msg);
//             break;
//         }
//         case 'font':{
//             msg.url = '/login';
//             check('users',data,res,msg);
//             break;
//         }
//     }
// });

check = (table_name,data,res,msg)=>{
let sqlStr = `SELECT username,email FROM ${table_name} WHERE username=$1 AND email=$2`;
let sqlStr_Alter = `UPDATE ${table_name} SET state='已激活' WHERE username=$1 AND email=$2`;
pgdb.query(sqlStr,[data.username,data.email],(err,val)=>{
        if(val.rowCount > 0){
            if(err){
                console.log(err.message);
            }else if(data.username === val.rows[0].username && data.email === val.rows[0].email){
                pgdb.query(sqlStr_Alter,[data.username,data.email],(err,val1)=>{
                    if(val1.rowCount > 0){
                        msg.error = '激活成功,请关闭当前页';
                        msg.title = 'Success';
                        res.render('msg',{msg});
                        return true;
                    }
                });
            }else{
                msg.error = '激活失败,请检查注册信息是否正确';
                msg.title = 'Failed';
                res.render('msg',{msg});
                return false;
            }
        }else{
            msg.error = '查找不到该信息';
            msg.title = 'Lost';
            res.render('msg',{msg});
            return false;
        }
    })
}
//数组->对象
function arrToObj(arr,sign = '&'){
    let obj = {};
    for(let i =0;i<arr.length;i++){
        let brr = arr[i].split(sign);
        let attr = brr[0];
        let val = brr[1];
        obj[attr] = val;
    }
    return obj;
}
module.exports = router;