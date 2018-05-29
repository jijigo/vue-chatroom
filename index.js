const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static')
// var server = require('http').createServer();
// var io = require('socket.io')(server);
// server.listen(4040);
// console.log("socket listen on 4040");

// // 用api 方式取得
// var app = require('express')();
// var port = 3000;
// // app.use(express.static(path.resolve(__dirname, '/dist')));
// // app.get('*', function (req, res) {
// //     const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
// //     res.send(html);
// // });
// // app.use(express.static(__dirname + '/dist'));
// // app.get('*', (req, res) => {
// //     res.sendFile(path.resolve(__dirname, 'index.html'));
// // });
// app.listen(process.env.PORT || port, function () {
//     console.log('api listen on 4000');
// });

// // app.get('/', (req, res) => {
// //     res.sendfile(__dirname + '/index.html');
// // });

// const messages = [
//     { name: 'Majar', message: 'Good Night.' }
// ];

// io.on('connection', function (socket) {
//     console.log('a user connected.');
//     // 廣播 歷史訊息
//     socket.emit('syncMessages', messages);
//     // 接收新訊息
//     socket.on('newMessage', (msg) => {
//         console.log(msg.name + ' says: ' + msg.message);
//         messages.push(msg);
//         socket.emit('syncMessages', messages);
//     });
// });

const http = require('http');
const hostname = '0.0.0.0';
// const hostname = '127.0.0.1';
const PORT = process.env.PORT || 3000;
var app = require('express')();
app.use("/", serveStatic(path.join(__dirname, '/dist')));

// Catch all routes and redirect to the index file
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// });
// app.use(serveStatic(__dirname + "/dist"));
// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// });
app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});