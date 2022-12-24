let express = require('express');
let app = express('Crash_game_multiplayer');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8000;

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {

    socket.on('random_start_numbers', function (data) {
        io.emit('random_start_numbers', data);
    });

    socket.on('start_nums', function(data) {
        io.emit('start_nums', data);
    });

    socket.on('timer_numbers', function(data) {
        io.emit('timer_numbers', data);
    });

    socket.on('left_press_numbers', function(data) {
        io.emit('left_press_numbers', data);
    });

    socket.on('stroy_number', function(data) {
        io.emit('stroy_number', data);
    });

    socket.on('disconnect', function () {
    });

    /* casino game code socket io */

});

http.listen(port, function () {
    console.log(`Server localhost: ${port}`);
});
