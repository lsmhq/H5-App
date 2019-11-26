var express = require('express');
var qs = require('querystring');
var router = express.Router();
var pages = require('../public/json/list.json');
console.log(pages);
/* GET users listing. */
router.get('/', function(req, res, next) {
  var page = qs.parse(req.url.split('?')[1]).page;
  console.log('page:',page);
  switch(page){
    case 'person':{
      console.log('person');
      let data = {list:pages.list,data:pages.data[1]}
      res.render('pages',{data});
      break;
    }
    case 'consumer':{
      console.log('consumer');
      let data = {list:pages.list,data:pages.data[2]}
      res.render('pages',{data});
      break;
    }
    case 'chapter':{
      console.log('chapter');
      let data = {list:pages.list,data:pages.data[3]}
      res.render('pages',{data});
      break;
    }
    case 'talk':{
      console.log('talk');
      let data = {list:pages.list,data:pages.data[4]}
      res.render('pages',{data});
      break;
    }
    case 'orders':{
      console.log('order');
      let data = {list:pages.list,data:pages.data[5]}
      res.render('pages',{data});
      break;
    }
    case 'goods':{
      let data = {list:pages.list,data:pages.data[6]}
      res.render('pages',{data});
    }
    default:{
      res.render('main',{pages:pages.list});
    }
  }
});

module.exports = router;
