var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('log level', 1);

server.listen(8081);
console.log("listening on 8081")

app.use(express.static(__dirname + '/public'));
//app.use(express.logger());



io.sockets.on('connection', function (socket) {

  socket.on('clicked', function(position){
    io.sockets.emit('update', position);
  });

});