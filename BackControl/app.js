var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var backloginRouter = require('./routes/login_back');//后台登录注册
var checkRouter = require('./routes/check');//邮箱检测
var fontloginRouter = require('./routes/login');//前端登录注册
var apiRouter = require('./routes/api');//api
var postRouter = require('./routes/post_api');//post接口

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use('/admin', backloginRouter);//后台登录
app.use('/check',checkRouter);//检测
app.use('/acg',fontloginRouter);//前端登录
app.use('/api/v1',apiRouter);
app.use('/postapi',postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
