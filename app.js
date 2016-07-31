var express = require('express');
var http = require('http');
var publicIp = require('public-ip');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.status(200).send('Nothing here. Check ' + req.protocol + '://' + req.headers['host'] + '/api/whoami');
});

app.get('/api/whoami', function(req, res) {
  var options = {
    'host': 'ipinfo.io',
    'path': '/ip'
  };

  //http.get(options, function(response) {
    //response.setEncoding('utf8');

    //response.on('data', function(chunk) {
      //res.status(200).json({
        //'ipaddress': chunk.trim(),
        //'language': req.headers['accept-language'],
        //'software': req.headers['user-agent']
      //});
    //});
  //});

  publicIp.v4().then(ip => {
    res.status(200).json({
      'ipaddress': ip,
      'language': req.headers['accept-language'],
      'software': req.headers['user-agent']
    });
  });
});

app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
