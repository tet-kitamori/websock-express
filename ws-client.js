const WebSocket = require("ws");
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

// 処理の効率化のために、同期型のファイル読み込みを使う
var rootPage = fs.readFileSync('./ws-client.html', 'utf-8');

var s_data = {
  name : "",
  age  : "",
  message : "",
};

// HTTPサーバを生成する
var server = http.createServer(function(req, res){
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var params = qs.parse(body);
      s_data.name = params.name;
      s_data.age = params.name;
      s_data.message = params.message;
      // 入力したメッセージを送信
      clientSocket.send(JSON.stringify(s_data));
    });
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(rootPage);
  res.end();
});

// WebSocketクライアントを作成してサーバーに接続
const clientSocket = new WebSocket('ws://localhost:8080');

// サーバ接続ができた時の処理
clientSocket.onopen = () => {
  console.log('Connected to Server!');
};

// サーバーからのメッセージ受信
clientSocket.onmessage = (event) => {
  console.log(`Received: ${event.data}`);
};

// サーバから接続中止
clientSocket.onclose = () => {
  console.log('Server closed Connection!');
};

server.listen(3001);    // ポート番号3001で待ち受ける
console.log('HTTP server listen on port3001!');