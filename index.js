var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Cylon = require('cylon');

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

// GPIO button detection

Cylon.robot({
    connections: {
        raspi: { adaptor: 'raspi' }
    },

    devices: {
        button1: { driver: 'button', pin: 15 },
        button2: { driver: 'button', pin: 16 },
        led1: { driver: 'led', pin: 11}
    },

    work: function(my) {
        my.button1.on('push', function() {
            io.emit('player1');
            my.led1.turnOn();
            console.log('Player 1 Buzzed');
        });

        my.button1.on('release', function() {
            my.led1.turnOff();
            console.log("Player 1 released")
        });

        my.button2.on('push', function() {
           console.log("Player 2");
        });
    }

}).start();

