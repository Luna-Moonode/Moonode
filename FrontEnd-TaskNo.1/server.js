var http = require('http');
var request = require('request');
var string;
request('https://api.bilibili.com/x/web-interface/online',function(error,response,data){
        string = JSON.parse(data);
        string = ('在线人数：' + string.data.web_online);
    });
http.createServer(function (req, res) {
    res.writeHead(200,{'content-type' : 'text/html;charset="utf-8"'});
    res.write(string);
    res.end();
}).listen(3000);
console.log('server running at http://127.0.0.1:3000');
