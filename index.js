const fs = require('fs');
const path = require('path');
const express = require('express');
var server = require('http').createServer();
var io = require('socket.io')(server);
server.listen(3000);
console.log("socket listen on 3000");

// 用api 方式取得
var app = require('express')();
var port = 4000;
// app.use(express.static(path.resolve(__dirname, '/dist')));
// app.get('*', function (req, res) {
//     const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
//     res.send(html);
// });
app.use(express.static(__dirname + '/'));
//////////////////////
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
//////////////////////
app.listen(port);
app.listen(process.env.PORT || port, function () {
    console.log('api listen on 4000');
});

// app.get('/', (req, res) => {
//     res.sendfile(__dirname + '/index.html');
// });




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

