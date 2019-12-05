var express = require('express');
var router = express.Router();
var pg = require('pg');
var qs = require('querystring');
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
                res.json({status:'0',data:[{user_count:val.rowCount},{context_count:val1.rowCount}]});
            }
        });
    });
});

router.get('/chapter',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.type == 'animation'){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'animation'`;
        lend(sqlStr,res);            
    }
    else if(params_obj.type == 'comic'){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'comic'`;
        lend(sqlStr,res);  
    }
    else if(params_obj.type == 'game'){
        let sqlStr = `SELECT * FROM context WHERE contexttype = 'game'`;
        lend(sqlStr,res); 
    }
    else if(params_obj.type == 'all'){
        let sqlStr = 'SELECT * FROM context';
        lend(sqlStr,res);
    }
});
router.get('/orders',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT * FROM ordercontent`;
        lend(sqlStr,res);
    }else{
        console.log(decodeURI(params_obj.type));
        let sqlStr = `SELECT * FROM ordercontent WHERE userid = '${decodeURIComponent(params_obj.id)}'`;
        lend(sqlStr,res);
    }
});
router.get('/person',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT id,name,level,email FROM users`;
        lend(sqlStr,res);
    }else{
        console.log(params_obj);
        console.log(typeof params_obj.id);
        let sqlStr = `SELECT * FROM users WHERE id = '${decodeURIComponent(params_obj.id)}'`;
        lend(sqlStr,res);
    }
});
router.get('/admin',(req,res,next)=>{
    let sqlStr = `SELECT * FROM admin`;
    lend(sqlStr,res);
});
router.get('/talk',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT * FROM evaluation`;
        lend(sqlStr,res);
    }else{
        let sqlStr = `SELECT * FROM evaluation WHERE contentid = '${decodeURIComponent(params_obj.id)}'`;
        lend(sqlStr,res);
    }
});
router.get('/goods',(req,res,next)=>{
    console.log('goods');
    let params_obj = qs.parse(req.url.split('?')[1]);
    console.log(params_obj);
    if(params_obj.id){
        if(params_obj.id === ('all')){
            let sqlStr = `SELECT * FROM market`;
            lend(sqlStr,res);
        }else{
            console.log(params_obj.id);
            let sqlStr = `SELECT * FROM market WHERE id = '${(params_obj.id)}'`;
            lend(sqlStr,res);
        }
    }
});
router.post('/person',(req,res,next)=>{
    let data = req.body;
    console.log(data);
    switch(sign){
        case DLE://不合格，DLE应该是字符串
            let sqlStr = `DELETE FROM users WHERE `;
            break;
        case UPDATA:
            break;
    }
})
router.post('/chapter',(req,res,next)=>{

});
function lend(sqlStr,res){
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err || val.rowCount < 0){
            console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            res.json({status:'0',data:val.rows});
        }
    });
}
module.exports = router;