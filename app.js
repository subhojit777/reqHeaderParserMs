var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/whoami', function(req, res) {
  // Obtain the requester's IP.
  // This becomes necessary when you are accessing the microservice from Heroku.
  // https://lostechies.com/derickbailey/2013/12/04/getting-the-real-client-ip-address-on-a-heroku-hosted-nodejs-app
  var ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  res.status(200).json({
    'ipaddress': ipAddr,
    'language': req.headers['accept-language'],
    'software': req.headers['user-agent']
  });
});

app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
