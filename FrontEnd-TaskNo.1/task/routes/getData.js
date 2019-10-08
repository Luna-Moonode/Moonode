function getData() {
    var http = require('http');
    var myData = '';
    http.get('http://api.bilibili.com/x/web-interface/online', function (req) {
        req.on('data', function (data) {
            myData += data;
        });
        req.on('end', function () {
            myData = JSON.parse(myData).data.web_online;
        });
    });
}
module.exports = getData;