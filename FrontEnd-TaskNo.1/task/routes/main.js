var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var http = require('http');
    var myData = '';
    http.get('http://api.bilibili.com/x/web-interface/online', function (req) {
        req.on('data', function (data) {
            myData += data;
        });
        req.on('end', function () {
            myData = JSON.parse(myData).data.web_online;
            res.render('main', { data: myData });
        });
    });
});

module.exports = router