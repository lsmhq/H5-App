var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var backloginRouter = require('./routes/login_back');//后台登录注册
var pagesRouter = require('./routes/pages');//后台页面
var checkRouter = require('./routes/check');//邮箱检测
var fontloginRouter = require('./routes/login');//前端登录注册
var apiRouter = require('./routes/api');//api接口

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', backloginRouter);//后台登录
app.use('/pages', pagesRouter);//后台页面
app.use('/check',checkRouter);//检测
app.use('/login',fontloginRouter);//前端登录
app.use('/api/v1',apiRouter);


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
