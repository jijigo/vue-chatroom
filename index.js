var server = require('http').createServer();
var io = require('socket.io')(server);
server.listen(3000);
console.log("socket listen on 3000");

// 用api 方式取得
var app = require('express')();
var port = 4000;
app.listen(port, function () {
    console.log('api listen on 4000')
});
app.get('/', (req, res) => {
    res.send('hello');
});

const messages = [
    { name: 'Majar', message: 'Good Night.' }
];

io.on('connection', function (socket) {
    console.log('a user connected.');
    // 廣播 歷史訊息
    socket.emit('syncMessages', messages);
    // 接收新訊息
    socket.on('newMessage', (msg) => {
        console.log(msg.name + ' says: ' + msg.message);
        messages.push(msg);
        socket.emit('syncMessages', messages);
    });
});
