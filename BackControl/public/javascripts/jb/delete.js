var pg = require('pg');

//数据库基本配置  
var pgdb = new pg.Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'suhuijun',
    password: '147852369',
    database: 'ACG'
  });
  function delunActive(){
      let sqlStr = "SELECT * FROM users WHERE status = '未激活'";
      pgdb.query(sqlStr,[],(err,val)=>{
          if(err){
              console.log(err.message);
          }else{
              let sqlStr_del = "DELETE FROM users WHERE id=$1";
              for(let i = 0;i<val.rowCount;i++){
                  pgdb.query(sqlStr_del,[val.rows[i].id],(err,val)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        console.log('del success');
                    }
                  })
              }
          }
      })
  }
  delunActive();