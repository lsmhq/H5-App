var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
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
    }else{
        let sqlStr = `SELECT * FROM context WHERE id = '${params_obj.type}'`;
        lend(sqlStr,res);
    }
});
//文章修改接口
router.post('/chapter',(req,res,next)=>{
    let data = req.body;
    switch (data.type) {
        case 'del':{
            sqlStr = `DELETE FROM context WHERE id = '${data.id}'`;
            del(sqlStr,res);
            break;
        }
        case 'update':{
            sqlStr =  `UPDATE context SET id = '${data.id}',title = '${data.title}',auther = '${data.auther}',timetamp = '${data.timetamp}' WHERE id='${data.id}'`;
            update(sqlStr,res);
            break;
        }
        case 'insert':{
            let id = strRandom(10);
            sqlStr = `INSERT INTO context VALUES(${id},${data.contexttype},${data.autherid},${data.auther},${data.context},${data.good||'0'},${data.visit||'0'},${data.collect||'0'},${data.evaluationnum},${data.timetamp},${data.title})`;
            let content = {
                    title:data.title,
                    content:data.content
            }
            fs.writeFileSync(`../public/content/${data.contexttype}/${id}.json`,JSON.stringify(content));
            if(data.src_img.indexOf('.png'))
                fs.writeFileSync(`../public/images/animation/${id}/0.png`,data.img_data);
            else if(data.src_img.indexOf('.jpg'))
                fs.writeFileSync(`../public/images/animation/${id}/0.jpg`,data.img_data);
            insert(sqlStr,res);
            break;
        }
        case 'select':{
            sqlStr = `SELECT * from context WHERE title LIKE'%${data.search||''}%' OR id='${data.search}' OR auther LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }
    }
});
router.get('/orders',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT * FROM ordercontent`;
        lend(sqlStr,res);
    }else{
        // console.log(decodeURI(params_obj.type));
        let sqlStr = `SELECT * FROM ordercontent WHERE userid = '${decodeURIComponent(params_obj.id)}'`;
        lend(sqlStr,res);
    }
});
router.post('/orders',(req,res,next)=>{
    let data = req.body;
    switch (data.type) {
        case 'select':{
            let sqlStr = `SELECT * FROM ordercontent WHERE id = '${data.id}' OR username LIKE '%${data.username}%' OR commodityid='${data.commodityid}'`;
            select(sqlStr,res);
            break;
        }case 'del':{
            let sqlStr = `DELETE FROM ordercontent WHERE id = '${data.id}'`;
            del(sqlStr,res);
            break;
        }case 'update':{
            let sqlStr = `UPDATE ordercontent SET id = '${data.id}',price = '${data.price}',username = '${data.username}',logistics = '${data.logistics}' `;
            update(sqlStr,res);
            break;
        }case 'insert':{
            let sqlStr ;
            break;
        }
    }
})
router.get('/person',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT id,name,level,email FROM users`;
        lend(sqlStr,res);
    }else{
        // console.log(params_obj);
        // console.log(typeof params_obj.id);
        let sqlStr = `SELECT * FROM users WHERE id = '${decodeURIComponent(params_obj.id)}'`;
        lend(sqlStr,res);
    }
});
router.post('/person',(req,res,next)=>{
    let data = req.body;
    // console.log(data);
    switch (data.type) {
        case 'del':{
            let sqlStr = `DELETE FROM users WHERE id='${data.id}'`;
            // console.log(sqlStr);
            del(sqlStr,res);
            break; 
        }case 'update':{
            let sqlStr =  `UPDATE users SET id='${data.id}',name='${data.name}',level='${data.level},email='${data.email}', WHERE id='${data.id}'`;
            update(sqlStr,res);
            break;
        }case "select":{
            let sqlStr = `SELECT * FROM users WHERE name LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }
    }
})

router.get('/admin',(req,res,next)=>{
    let sqlStr = `SELECT * FROM admin`;
    lend(sqlStr,res);
});
//管理员接口
router.post('/admin',(req,res,next)=>{
    let data = req.body;
    // console.log(getObjLen(data));
    // console.log(data);
    var sqlStr;
    switch (data.type) {
        case 'del':{
            sqlStr = `DELETE FROM admin WHERE userid = '${data.userid}'`;
            del(sqlStr,res);
            break;
        }
        case 'update':{
            sqlStr =  `UPDATE admin SET userid = '${data.userid}',email = '${data.email}',username = '${data.username}',character = '${data.character}' WHERE userid='${data.userid}'`;
            update(sqlStr,res);
            break;
        }
    }
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
    // console.log('goods');
    let params_obj = qs.parse(req.url.split('?')[1]);
    // console.log(params_obj);
        if(params_obj.id === ('all')){
            let sqlStr = `SELECT * FROM market`;
            lend(sqlStr,res);
        }else{
            // console.log(params_obj.id);
            let sqlStr = `SELECT * FROM market WHERE id = '${(params_obj.id)}'`;
            lend(sqlStr,res);
        }
});
router.post('/goods',(req,res,next)=>{
    let data = req.body;
    // console.log(data);
    switch (data.type) {
        case 'select':{
            let sqlStr = `SELECT * FROM market WHERE id = '${data.search}' OR name LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }case 'del':{
            let sqlStr = `DELETE FROM market WHERE id = '${data.id}'`;
            del(sqlStr,res);
            break;
        }case 'insert':{
            let sqlStr = `INSERT INTO market VALUES(${data.id},${data.name},${data.path||'?'},${data.price},${data.source||'？'},${data.brand ||'?'},${data.evaluation||'?'},${data.collect})`;
            insert(sqlStr,res);
            break;
        }case 'update':{
            let sqlStr = `UPDATE market SET id='${data.id}',name='${data.name}',price='${data.price}',collect='${data.collect}' WHERE id = '${data.id}'`;
            update(sqlStr,res);
            break;
        }
    }
});
//动态路由,路由按数据库表名称
router.get('/',(req,res,next)=>{

})

router.post('/',(req,res,next)=>{
    let data = req.body;
    switch (data.type) {
        case 'insert':{
            let sqlStr = ``;
            insert(sqlStr,res);
            break;
        }case '':{

        }
    }
})
function lend(sqlStr,res){
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            // console.log(err);
            res.json({status:'1',data:'error'});
        }else{
            if(val.rowCount<=0)
                res.json({status:'0',data:[]})
            else
                res.json({status:'0',data:val.rows});
        }
    });
}

  //删除
let del = (sqlStr,res)=>{
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            // console.log(err.message);
            res.send('error:');
        }else{
            if(val.rowCount<=0){
                res.send(JSON.stringify([]));
            }else{
                res.send('success');
            }
            
        }
    });
  }
  //更新数据
  let update = (sqlStr,res)=>{
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            // console.log(err.message);
            res.send('error');
        }else{
            if(val.rowCount <= 0){
                res.send('可能存在外部约束');
            }else{
                res.send('success');
            }
        }
    });
  }
//插入
let insert = (sqlStr,res)=>{
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            // console.log(err.message);
            res.send('error');
        }else{
            if(val.rowCount<=0){
                res.send(JSON.stringify([]))
            }else{
                res.send('success');
            }
        }
    })
}
//查询
let select = (sqlStr,res)=>{
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            // console.log(err.message);
            res.send('error');
        }else{
            if(val.rowCount<=0){
                res.send(JSON.stringify([]))
            }else{
                // console.log(val.rows);
                res.send(JSON.stringify(val.rows));
            }
        }
    })
}

  //随机字符串
function strRandom(j){
    var str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz123456789';
    var outStr = '';
    for(let i =0;i<j;i++){
      outStr += str[parseInt(Math.random()*str.length-1)];
    }
    return outStr;
  }
module.exports = router;