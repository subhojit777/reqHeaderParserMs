var express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.status(200).send('Nothing here. Check ' + req.protocol + '://' + req.headers['host'] + '/api/whoami');
});

app.get('/api/whoami', function(req, res) {
  res.status(200).json({
    'ipaddress': req.headers['host'],
    'language': req.headers['accept-language'],
    'software': req.headers['user-agent']
  });
});

app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});
