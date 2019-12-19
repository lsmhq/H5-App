var express = require('express');
var router = express.Router();
var pg = require('pg');
var fs = require('fs');
var qs = require('querystring');
var formidable = require('formidable');
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
    let sqlStr;
    console.log(data);
    switch (data.type) {
        case 'del':{
            sqlStr = `DELETE FROM context WHERE id = '${data.id}'`;
            sqlStr_select = `SELECT * FROM context WHERE id = '${data.id}'`;
            let path = __dirname.split('/');
            path.pop();
            pgdb.query(sqlStr_select,[],(err,val)=>{
                if(err){
                    console.log(err.message);
                    res.send('error');
                }else{
                    if(val.rowCount>0){
                        //删除文章内容文件
                        fs.unlink(path.join('/')+'/public/content/'+val.rows[0].contexttype+'/'+data.id+'.json',(err)=>{
                            if(err){
                                console.log(err.message);
                                res.send('error');
                            }else{
                                //删除文章图片资源
                                delFile(path.join('/')+'/public/images/animation/'+data.id,res);
                            }
                        });
                    }
                }
            })
            del(sqlStr,res);
            break;
        }
        case 'update':{
            sqlStr =  `UPDATE context SET id = '${data.id}',title = '${data.title}',auther = '${data.auther}',timetamp = '${data.timetamp}' WHERE id='${data.id}'`;
            update(sqlStr,res);
            break;
        }
        //发布文章
        case 'insert_font':{
            let id = strRandom(10);
            let time = new Date().getMonth() + '月' + new Date().getDate() + '日';
            let img_type = data.images_type.split('/')[1];
            let images = data.images.split(',')[1];
            let imgtype;
            let imgData = Buffer.from(images,'base64');
            let content = JSON.stringify({title:data.title,content:[{text:data.context,title:''}]});
            console.log("图片类型:",img_type);
            console.log("图片数据:",images);
            switch (img_type) {
                case 'jpg'||'JPG':{
                    imgtype = '.jpg';
                    break;
                }case 'png'||'PNG':{
                    imgtype = '.png';
                    break;
                }case 'gif'||'GIF' : {
                    imgtype = '.gif';
                    break;
                }case 'jpeg'||'JPEG':{
                    imgtype = '.jpeg'
                    break;
                }
            }            
            console.log(imgtype);
            let sqlStr = `INSERT INTO context VALUES('${id}','${data.contexttype}','${data.autherid}','${data.auther}','/content/${data.contexttype}/${id}','${data.good||'0'}','${data.visit||'0'}','${data.collect||'0'}','${data.evaluationnum||'0'}','${time}','${data.title}','/images/animation/${id}/0${imgtype}')`;
            console.log(sqlStr);
            pgdb.query(sqlStr,[],(err,val)=>{
                if(err){
                    console.log('发布错误:',err.message);
                    res.send('error');
                }else{
                    if(val.rowCount>0){
                        console.log(__dirname);
                        let path = __dirname.split('/');
                        path.pop();
                        fs.mkdir(path.join('/')+'/public/images/animation/'+id,{recursive: true},(err)=>{
                            if(err){
                                console.log(err.message);
                                res.send('error');
                            }else{
                                fs.writeFile(path.join('/')+'/public/images/animation/'+id+'/0'+imgtype,imgData,(err)=>{
                                    if(err){
                                        console.log(err.message);
                                        res.send('error');
                                    }else{
                                        fs.writeFile(path.join('/')+'/public/content/'+data.contexttype+'/'+id+'.json',content,(err)=>{
                                            if(err){
                                                console.log(err.message);
                                                res.send('error');
                                            }else{
                                                res.send('success');
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }else{
                        res.send('error');
                    }
                }
            })
            break;
        }
        case 'select':{
            sqlStr = `SELECT * from context WHERE title LIKE'%${data.search||''}%' OR id='${data.search}' OR auther LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }case 'insert':{
            let id = strRandom(10);
            let time = new Date().getMonth() + '月' + new Date().getDate() + '日';
            let sqlStr = `INSERT INTO context VALUES('${id}','${data.contexttype||'game'}','${data.autherid||'wVVbRO4n4Y'}','${data.auther||'蓝色灭火器'}','${data.context||'测试'}','${data.good||'0'}','${data.visit||'0'}','${data.collect||'0'}','${data.evaluationnum||'0'}','${time}','${data.title}')`;
            insert(sqlStr,res);
            break;
        }case 'good':{
            let sqlStr =  `UPDATE context SET good='${parseInt(data.good)+1}' WHERE id = '${data.id}'`;
            update(sqlStr,res);
            break;
        }case 'ungood':{
            let sqlStr =  `UPDATE context SET good='${parseInt(data.good)-1}' WHERE id = '${data.id}'`;
            update(sqlStr,res);
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
    console.log(data);
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
            let sqlStr = `UPDATE ordercontent SET id = '${data.id}',price = '${data.price}',username = '${data.username}',logistics = '${data.logistics}' WHERE id = '${data.id}'`;
            update(sqlStr,res);
            break;
        }case 'insert':{
            let sqlStr = `INSERT INTO ordercontent (id,commodityname,commodityid,userid,username,price,logistics) VALUES('${strRandom(10)}',$1,$2,$3,$4,$5,'准备出库')`;
            let sqlStr_select = `SELECT * from market WHERE id = $1`
            pgdb.query(sqlStr_select,[data.commodityid],(err,val)=>{
                if(err){
                    res.send('error');
                }else if(val > 0){
                    pgdb.query(sqlStr,[val[0].name,val[0].id,data.userid,data.username,val[0].price],(err,val1)=>{
                        if(err){
                            res.send('error');
                        }else if(val1 > 0){
                            res.send('success');
                        }
                    })
                }
            });
            break;
        }
    }
})
router.get('/person',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    if(params_obj.id === ('all')){
        let sqlStr = `SELECT id,name,level,email,status FROM users`;
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
    console.log(data);
    switch (data.type) {
        case 'del':{
            let sqlStr = `DELETE FROM users WHERE id='${data.id}'`;
            // console.log(sqlStr);
            del(sqlStr,res);
            break; 
        }case 'update':{
            let sqlStr =  `UPDATE users SET name='${data.name}',level='${data.level}',email='${data.email}',sex='${data.sex||'秘密'}',hobby='${data.hobby||'吃饭睡觉打豆豆'}',hometown='${data.hometown ||'外太空'}',birthday='${data.birthday||'12·1'}',signatrue='${data.signatrue || '这个人很懒,什么也没留下'}',status='${data.status}' WHERE id='${data.id}'`;
            update(sqlStr,res);
            break;
        }case "select":{
            let sqlStr = `SELECT * FROM users WHERE name LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }case 'update_font':{
            let sqlStr =  `UPDATE users SET sex='${data.sex||'秘密'}',hobby='${data.hobby||'吃饭睡觉打豆豆'}',hometown='${data.hometown ||'外太空'}',birthday='${data.birthday||'12·1'}',signatrue='${data.signatrue || '这个人很懒,什么也没留下'}',name='${data.name}' WHERE id='${data.id}'`;
            update(sqlStr,res);
            break;
        }case 'update_img':{
            let img_type = data.images_type.split('/')[1].split(';')[0];//图片类型
            let images = data.images.split(',')[1];//图片数据
            let imgtype;
            let imgData = Buffer.from(images,'base64');
            let path = __dirname.split('/');
            path.pop();
            console.log(imgData);
            console.log(img_type);
            switch (img_type) {
                case 'jpg'||'JPG':{
                    imgtype = '.jpg';
                    break;
                }case 'png'||'PNG':{
                    imgtype = '.png';
                    break;
                }case 'gif'||'GIF' : {
                    imgtype = '.gif';
                    break;
                }case 'jpeg'||'JPEG':{
                    imgtype = '.jpeg'
                    break;
                }
            }         
            path = `${path.join('/')}/public/images/avatar/${data.id+imgtype}`;
            console.log(path);
            let sqlStr = `UPDATE users SET avatarid='${data.id+imgtype}' WHERE id='${data.id}'`;
            fs.writeFile(path,imgData,(err)=>{
                if(err){
                    console.log('修改头像:',err.message);
                    res.send('error');
                }else{
                    pgdb.query(sqlStr,[],(err,val)=>{
                        if(err){
                            console.log('修改头像:',err.message);
                            res.send('error');
                        }else{
                            if(val.rowCount>0){
                                res.send('success');
                            }else{
                                res.send('error');
                            };
                        }
                    });
                }
            })
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
    console.log(data);
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
    console.log(data);
    switch (data.type) {
        case 'select':{
            let sqlStr = `SELECT * FROM market WHERE id = '${data.search}' OR name LIKE '%${data.search}%'`;
            select(sqlStr,res);
            break;
        }case 'del':{
            let sqlStr = `DELETE FROM market WHERE id = '${data.id}'`;
            let sqlStr_select = `SELECT * FROM market WHERE id = '${data.id}'`;
            let path = __dirname.split('/');
            path.pop();
            pgdb.query(sqlStr_select,[],(err,val)=>{
                if(err){
                    console.log('商品删除:',err.message);
                    res.send('error');
                }else{
                    path = `${path.join('/')}/public/${val.rows[0].path}`;
                    fs.unlink(path,(err)=>{
                        if(err){
                            console.log('删除商品:',err.message);
                            res.send('error');
                        }else{
                            del(sqlStr,res);
                        }
                    })
                }
            })
            break;
        }case 'insert':{
            let path = __dirname.split('/');
            path.pop();
            path = `${path.join('/')}/public/images/avatar/${data.id+'.'+data.imgType}`;
            console.log(path);
            let sqlStr = `INSERT INTO market VALUES('${data.id}','${data.name}','/images/avatar/${data.id+'.'+data.imgType}','${data.price}','${data.source||'0'}','${data.brand ||'0'}','${data.evaluation||'0'}','${data.collect}','${data.description||'暂时还没有简介哦!'}')`;
            pgdb.query(sqlStr,[],(err,val)=>{
                if(err){
                    console.log('商品插入:',err.message);
                    res.send('error');
                }else{
                    if(val.rowCount > 0){
                        let imgData = Buffer.from(data.imgData,'base64');
                        fs.writeFile(path,imgData,(err)=>{
                            if(err){
                                console.log('商品图片:',err.message);
                                pgdb.query("DELETE FROM market WHERE id='data.id'");
                                res.send('error');
                            }else{
                                res.send('success');
                            }
                        });
                    }else{
                        res.send('error');
                    }
                }
            })
            break;
        }case 'update':{
            let sqlStr = `UPDATE market SET id='${data.id}',name='${data.name}',price='${data.price}',collect='${data.collect}',description='${data.description}',brand='${data.brand}' WHERE id = '${data.id}'`;
            update(sqlStr,res);
            break;
        }
    }
});
//粉丝接口
router.get('/fans',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    let sqlStr = `SELECT * FROM fans WHERE id = '${params_obj.id}'`;
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            console.log('粉丝错误:',err.message);
        }else{
            if(val.rowCount > 0){
                let json = {status:0,data:{count:val.rowCount,data:val.rows}}
                res.json(json);
            }else{
                res.json({status:1,data:'error'})
            }
        }
    })
});
router.post('/fans',(req,res,next)=>{
    let data = req.body;
    switch (data.type) {
        case 'insert':{
            let sqlStr = `INSERT INTO fans VALUES('${' '}','${data.fanname}','${fanid}','${avatarid}','${data.id}')`;
            insert(sqlStr,res);
            break;
        }case 'del':{
            let sqlStr = `DELETE FROM fans WHERE id='${data.id}' AND fanid='${data.fanid}'`;
            del(sqlStr,res);
            break;
        }case 'select':{
            break;
        }   
    }
});
//关注接口
router.get('/fouce',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    let sqlStr = `SELECT * FROM fouce WHERE id = '${params_obj.id}'`;
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            console.log('关注错误:',err.message);
        }else{
            if(val.rowCount > 0){
                let json = {status:0,data:{count:val.rowCount,data:val.rows}}
                res.json(json);
            }else{
                res.json({status:1,data:'error'})
            }
        }
    })
});

router.post('/fouce',(req,res,next)=>{
    let data = req.body;
    switch (data.type) {
        case 'insert':{
            let sqlTemp1 = `SELECT name,avatarid FROM users WHERE id='${data.id}'`;
            let sqlTemp2 = `SELECT name,avatarid FROM users WHERE id='${data.fouceid}'`;
            pgdb.query(sqlTemp1,[],(err,val1)=>{
                if(err){
                    console.log('关注错误:',err.message);
                    res.send('error');
                }else{
                    if(val1.rowCount<=0)
                        res.send('error');
                    else{
                        pgdb.query(sqlTemp2,[],(err,val2)=>{
                            if(err){
                                console.log('关注错误:',err.message);
                                res.send('error');
                            }else{
                                if(val2.rowCount<=0)
                                    res.send('error');
                                else{
                                    id1 = strRandom(12);
                                    id2 = strRandom(12);
                                    let sqlStr1 = `INSERT INTO fouce VALUES('${id1}','${val2.rows[0].name}','${data.fouceid}','${val2.rows[0].avatarid}','${data.id}')`;
                                    let sqlStr2 = `INSERT INTO fans VALUES('${id2}','${val1.rows[0].name}','${data.id}','${val1.rows[0].avatarid}','${data.fouceid}')`
                                    pgdb.query(sqlStr1,[],(err,val)=>{
                                        if(err){
                                            console.log('插入错误:',err.message);
                                            res.send('error');
                                        }else{
                                             if(val.rowCount<=0){
                                                res.send(JSON.stringify([]));
                                            }else{
                                                pgdb.query(sqlStr2,[],(err,val)=>{
                                                    if(err){
                                                        console.log('插入错误:',err.message);
                                                        res.send('error');
                                                    }else{
                                                         if(val.rowCount<=0){
                                                            res.send(JSON.stringify([]));
                                                        }else{
                                                            res.send('success');
                                                            return;
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        });
                    }
                }
            });
            break;
        }case 'del':{
            console.log(data.id);
            console.log(data.fouceid);
            let sqlStr1 = `DELETE FROM fouce WHERE id='${data.id}' AND fouceid='${data.fouceid}'`;
            let sqlStr2 = `DELETE FROM fans WHERE id='${data.fouceid}' AND fanid='${data.id}'`;
            pgdb.query(sqlStr1,[],(err,val)=>{
                if(err){
                    console.log('删除错误:',err.message);
                    res.send('error:');
                }else{
                    if(val.rowCount<=0){
                        res.send(JSON.stringify([]));
                    }else{
                        pgdb.query(sqlStr2,[],(err,val)=>{
                            if(err){
                                console.log('删除错误:',err.message);
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
                }
            });
            break;
        }
    }
});
//订单接口
router.get('/order',(req,res,next)=>{
    let params_obj = qs.parse(req.url.split('?')[1]);
    let sqlStr = `SELECT * FROM ordercontent WHERE id = '${params_obj.id}'`;
    lend(sqlStr,res);
});
router.post('/order',(req,res,next)=>{
    let data = req.body;
    let id = strRandom(10);
    let sqlTemp = `SELECT * FROM market WHERE id = '${data.commodityid}'`;
    pgdb.query(sqlTemp,[],(err,val2)=>{
        if(err){
            console.log('查询错误信息:',err.message);
            res.send('error');
        }else{
            if(val.rowCount<=0)
                res.send('error');
            else{
                let sqlStr = `INSERT INTO ordercontent VALUES('${id}','${val2.rows[0].name}','${data.commodityid}','${data.userid}','${data.username}','${val2.rows[0].price}','未发货')`;
                insert(sqlStr,res);
            }
        }
    });   
});
function lend(sqlStr,res){
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            console.log('查询错误信息:',err.message);
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
            console.log('删除错误:',err.message);
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
            console.log('更新错误:',err.message);
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
            console.log('插入错误:',err.message);
            res.send('error');
        }else{
             if(val.rowCount<=0){
                res.send(JSON.stringify([]));
            }else{
                res.send('success');
                return;
            }
        }
    })
}
//查询
let select = (sqlStr,res)=>{
    pgdb.query(sqlStr,[],(err,val)=>{
        if(err){
            console.log('搜索错误:',err.message);
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
//递归删除文件
function delFile(dir,res){
    fs.readdir(dir,(err,files)=>{
        if(err){
            console.log(err.message);
            return false;
        }else{
            files.map(item=>{
                fs.stat(dir+'/'+item,(err,Stats)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        if(Stats.isFile()){
                            fs.unlink(dir+'/'+item,(err)=>{
                                if(err){
                                    res.send('error');
                                }else{
                                    fs.rmdir(dir,(err)=>{
                                        if(err){
                                            console.log(err.message);
                                            res.send('error');
                                        }else{
                                             res.send('success');
                                        }
                                    })
                                }
                            })
                        }
                    }
                });
            })
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