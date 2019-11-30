var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var backloginRouter = require('./routes/login_back');//后台登录注册
var pagesRouter = require('./routes/pages');//后台页面
var mainRouter = require('./routes/main');//后台主页
var checkRouter = require('./routes/check');//邮箱检测
var fontloginRouter = require('./routes/login');//前端登录注册
// var personRouter = require('./routes/person');
// var consumerRouter = require('./routes/consumer');
// var chapterRouter = require('./routes/chapter');
// var talkRouter = require('./routes/talk');
// var ordersRouter = require('./routes/orders');
// var goodsRouter = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/backlogin', backloginRouter);
app.use('/pages', pagesRouter);
app.use('/check',checkRouter);
app.use('/data/api/main',mainRouter);
// app.use('data/api/person',personRouter);
// app.use('data/api/consumer',consumerRouter);
// app.use('data/api/chapter',chapterRouter);
// app.use('data/api/talk',talkRouter);
// app.use('data/api/orders',ordersRouter);
// app.use('data/api/goods',goodsRouter);

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
