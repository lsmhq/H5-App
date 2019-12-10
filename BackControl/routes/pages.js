var express = require('express');
var router = express.Router();
var md5 = require('md5-node');
let msg = {
  error:'',
  val:'',
  title:''
}
//首页
router.get('/', function(req, res, next) {
  res.render('index-font');
});
module.exports = router;
