var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('a user disconnected')
    });

    socket.on('player1', function(player) {
        console.log(player);
        io.emit('player1');
    });

    socket.on('player2', function(player) {
        console.log(player);
        io.emit('player2');
    });

    socket.on('player3', function(player) {
        console.log(player);
        io.emit('player3');
    });

    socket.on('reset', function() {
        console.log("reset");
        io.emit('reset');
    })


});

http.listen('3000', function() {
    console.log('Connection port: 3000');
});


