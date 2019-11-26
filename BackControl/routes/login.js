var express = require('express');
var router = express.Router();

var list = {

}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

module.exports = router;
