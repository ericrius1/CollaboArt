var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

io.set('log level', 1);

server.listen(8082);
console.log("listening on 8081")

app.use(express.static(__dirname + '/public'));
//app.use(express.logger());

var id = 0;

io.sockets.on('connection', function (socket) {

  socket.on('clicked', function(position){
    io.sockets.emit('update', position);
  });

  io.sockets.emit('turn_on', id);
  id++;

});