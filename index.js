const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
var secure = require('express-force-https');
var forceSsl = require('express-force-ssl');
var https = require('https');
// var privateKey = fs.readFileSync('etc/key.pem', 'utf8');
// // var certificate = fs.readFileSync('ssl/file.crt', 'utf8');
// var credentials = { key: privateKey, cert: certificate };
const httpsOptions = {
    key: fs.readFileSync('etc/key.pem'),
    cert: fs.readFileSync('etc/cert.pem')
}

const hostname = '0.0.0.0';
// const hostname = '127.0.0.1';

// api
const PORT = process.env.PORT || 3000;
var app = require('express')();
app.use("/", serveStatic(path.join(__dirname, '/dist')));
app.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

// var app2 = require('express')();
// // var https = require('http').Server(app2);
// var https = require('https').createServer(httpsOptions, app2);
// // var https = https.createServer(credentials, app2);
// var io = require('socket.io')(https);
// // var server = require('http').createServer();
// var io = require('socket.io')(server);
// https.listen(4040);
// console.log("socket listen on 4040");

//https & socket port
var https = require('https').createServer(httpsOptions);
https.listen(4040)
var io = require('socket.io')(https);

// var httpsServer = https.createServer(credentials, app).listen(4040, '0.0.0.0');
// var io = require('socket.io').listen(httpsServer);
// console.log("socket listen on 4040");

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
