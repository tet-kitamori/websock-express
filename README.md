# WEBSOCK EXPRESS
EXPRESS フレームワークに、WebSocket を組み込んだ例。
このレポジトリには、EXPRESS を使ったサーバと試験用のクライアントが格納
されています。 

### 前準備
このリポジトリには、実行に必要な node_modules フォルダと bin フォルダを
アップロードしておりません。

EXPRESSジェネレータを使って、以下のように必要なフォルダとファイルを用意します。
```
> express --view=ejs websock-express     // フォルダ名は任意
> cd websock-express
> npm install
```
アプリケーションに必要なその他のモジュールをインストールする。
WebSocketを使うために'Ws'、データの受け渡し用に'node-storage'、
デバグ作業の効率化のために'nodemon'をインストールする。
```
> npm install ws
> npm install node-storage
> npm install nodemon
```

### WebSocketサーバの内容
このソフトでは、'app.js' の中で、WebSocketサーバを定義して起動している。
'http'モジュールと'ws'モジュールを呼び出し、'./bin/www'　で起動する
メインのHTTPサーバ以外のHTTPサーバを生成しそれをWebSocketサーバとして
使用する。

WebSocketサーバのポート番号は、'8080' を使用する。
また、メインのHTTPサーバのポート番号は、'3000' を使用する。
`ws:\\localhost:8080` で、WebSocketサーバにコネクトしてきたクライアント
から受信したJSONデータを表示する。

### テスト用クライアントの内容
'ws-client.js' がクライアントソフトで、WEBブラウザとやり取りするための
HTTPサーバとWebSocketサーバとやり取りするためのWebSocketクライアントを
含んでいます。　

HTTPサーバは、ポート3001を利用しており、'ws-client.html' を使って
WEBブラウザをUIとして利用します。
WEBブラウザで `http://localhost:3001` とすると、WebSocketサーバに
データ送信するための入力画面が表示されます。

WEBブラウザから入力されたデータは、JSONデータとしてWebSocketサーバに
送られます。

### このソフトの使い方について
WebSocketサーバを立ち上げるには、`npm start` とします。
WEBブラウザ画面から、`http:\\localhost:300` とするとインデックスページ
を、`http:\\localhost:300\hello`とするとHelloページが表示されます。

サーバを立ち上げ後に、クライアントを立ち上げます。
コマンドプロンプト、または、ターミナルでソースの格納されたフォルダに
移動して、`> node ws-client.js` としてクライアントを起動します。
WEBブラウザで `http://localhost:3001` とすると、WebSocketサーバに
送信するためのデータを入力する画面が表示されます。
この画面を使用して、サーバにデータを送信します。
