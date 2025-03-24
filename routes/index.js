var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'Expresso',
    greet: 'Hello!',
    content1: 'Express を使ったアプリケーション例',
    content2: 'とっても簡単なバックエンドサーバ'
  };
  res.render('index', data);
});

module.exports = router;
