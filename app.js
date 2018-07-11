var createError = require('http-errors');                                   //https://www.npmjs.com/package/http-errors
var express = require('express');                                           //https://www.npmjs.com/package/express
var path = require('path');                                                 //https://www.npmjs.com/package/path
var cookieParser = require('cookie-parser');                                //https://www.npmjs.com/package/cookie-parser
var logger = require('morgan');                                             //https://www.npmjs.com/package/morgan

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));                                                     //Concise output colored by response status for development use
app.use(express.json());                                                    //https://expressjs.com/en/api.html#express.json
app.use(express.urlencoded({ extended: false }));                           //parsing the URL-encoded data with the querystring library
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));                    //determines the file to serve static files such as images, CSS files, and JavaScript files by combining req.url with the provided root directory

app.use('/', indexRouter);                                                  //
app.use('/users', usersRouter);                                             //loads router modules

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
