var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// kita added for use session
// var session = require('express-session');
var http = require('http');   // Kita add
var WebSocket = require('ws')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');  // Kita added

var app = express();

// Kita add http server for WebSoket
const server = http.createServer();
// ita add WebSocket サーバの生成
const wsServer = new WebSocket.Server({ server });

// Kita add express-session setup
// const session_opt = {
//  secret: '** himitu-no-kagi **',
//  resave: false,
//  saveUninitialized: false,
//  cookie: { maxAge: 60 * 60 * 24 }
// }
// app.use(session(session_opt));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);     // Kita added

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

// WebSocket のイベントリスナー
wsServer.on('connection', (socket) => {
  console.log('Client connected');

  // エラー発生
  socket.on('error', console.error);

  // クライアントメッセージ処理
  socket.on('message', (data) => {
    const msg = JSON.parse(data);
    console.log('Get Message:', msg);

    // 接続している全てのクライアントにメッセージ送信
    //wsServer.clients.forEach((client) => {
    //  if (client !== socket && client.readyState === WebSocket.OPEN) {
    //    client.send(data);
    //  }
    //});
  });

  // クライアント接続断
  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080);

module.exports = app;
