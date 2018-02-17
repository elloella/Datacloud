var express = require('express');
var socket = require('socket.io');

//store the express functions to var app
var app = express();
//Create a server on localhost:3000
var server = app.listen((process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//host content as static on public
app.use(express.static('public'));

console.log("Node is running on port 3000...");

//assign the server to the socket
var io = socket(server);
//dealing with server events / connection
io.sockets.on('connection', newConnection); //callback

//function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);
	socket.on('incomingDataToServer', emitFunction);

	function emitFunction(data){
		socket.broadcast.emit('ServerToClient', data);
		//following line refers to sending data to all
		//io.sockets.emit('mouse', data);
		console.log(data);
	}
}
