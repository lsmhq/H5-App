var express = require('express');
var router = express.Router();
var pg = require('pg');
var qs = require('querystring');
var md5 = require('md5-node');
//数据库基本配置  
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'suhuijun',
    password: '147852369',
    database: 'ACG'
});
router.get('/main',(req,res,next)=>{
    let sqlStr_user = `SELECT id FROM users`;
    let sqlStr_context = `SELECT id FROM context`;
    pgdb.query(sqlStr_context,[],(err,val1)=>{
        pgdb.query(sqlStr_user,[],(err,val)=>{
            if(err || val.rowCount < 0){
                res.json({status:'1',data:'error'});
            }else{
                res.json({status:'0',data:[{user_num:val.rowCount},{context_num:val1.rowCount}]});
            }
        });
    });
});

router.get('/chapter',(req,res,next)=>{
    var params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.type === md5('a')){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'animation'`;
        lend(sqlStr,res);            
    }
    else if(params_obj.type === md5('c')){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'comic'`;
        lend(sqlStr,res);  
    }
    else if(params_obj.type === md5('g')){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'game'`;
        lend(sqlStr,res); 
    }
});
router.get('/goods',(req,res,next)=>{
    let sqlStr = `SELECT * FROM market`;
    lend(sqlStr,res);
});
router.get('/orders',(req,res,next)=>{
    var params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.type === md5('all')){
        let sqlStr = `SELECT * FROM ordercontent`;
        lend(sqlStr,res);
    }else{
        console.log(decodeURI(params_obj.type));
        let sqlStr = `SELECT * FROM ordercontent WHERE userid = ${params_obj.type}`;
        lend(sqlStr,res);
    }
});
router.get('/person',(req,res,next)=>{
    var params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.type === md5('all')){
        let sqlStr = `SELECT id,name,level,email FROM users`;
        lend(sqlStr,res);
    }else{
        let sqlStr = `SELECT * FROM ordercontent WHERE id = ${params_obj.type}`;
        lend(sqlStr,res);
    }
});
router.post('/person',(req,res,next)=>{
    let sign;
    let work;
    switch(sign){
        case DLE:
            let sqlStr = `DELETE FROM users WHERE `
            break;
        case UPDATA:
            break;
    }
})
function lend(sqlStr,res){
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err.message);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });
}
module.exports = router;