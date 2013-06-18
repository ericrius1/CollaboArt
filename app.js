var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);
console.log("listening on 8080")

app.use(express.static(__dirname + '/public'));
//app.use(express.logger());



io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('clicked', function(position){
    console.log(position.x);
  })
});