var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function() {
    console.log('a user connected');
});

http.listen('3000', function() {
    console.log('Connection port: 3000');
});


