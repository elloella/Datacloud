'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, './public/index.html');

//app.use(express.static('public'));
//app.get('*',function(req,res){
//  res.sendFile(path.join(__dirname+'./public/index.html'));
  //__dirname : It will resolve to your project folder.
//});

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('ServerToClient', new Date().toTimeString()), 1000);

/*
var express = require('express');
var socket = require('socket.io');

//store the express functions to var app
var app = express();
//Create a server on localhost:3000
var server = app.listen(process.env.PORT || 3000);

//var server = app.listen((process.env.PORT || 3000, function(){
  //console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
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
		//setInterval(() => socket.broadcast.emit('ServerToClient', new Date().toTimeString()), 1000);
		let randNum;
		setInterval(function(){
			//get a random value, and assign it a new variable
			randNum = getRandomInt(0, 100);
		}, 1000);

		socket.broadcast.emit('ServerToClient', randNum);
		//following line refers to sending data to all
		//io.sockets.emit('mouse', data);
		console.log(randNum);
	}
}
*/
