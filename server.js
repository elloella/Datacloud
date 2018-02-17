var express = require('express');
var socket = require('socket.io');

//store the express functions to var app
var app = express();
//Create a server on localhost:3000
var server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
//host content as static on public
app.use(express.static('public'));

console.log("Node is running on port 3000...");

//assign the server to the socket
var io = socket(server);
//dealing with server events / connection
io.sockets.on('connection', newConnection); //callback


//function to get a random number, from a minimum to a maximum value
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

//function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);
	socket.on('incomingDataToServer', emitFunction);

	function emitFunction(data){
		let randData;
		//the setInterval function process the content every 1000ms
		setInterval(function(){
			//get a random value, and assign it a new variable
			randData = getRandomInt(0, 100);
		}, 3000);

		//socket.broadcast.emit('ServerToClient', randData);
		//following line refers to sending data to all
		//io.sockets.emit('mouse', data);
		console.log(data);
	}
}
