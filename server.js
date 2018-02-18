var mqtt = require('mqtt')
var MQTT_TOPIC = "homeGet/light";
var MQTT_ADDR = "mqtt://broker.i-dat.org:80";
var MQTT_PORT = 80;
var client  = mqtt.connect(MQTT_ADDR,{clientId: "webClient", keeplive: 1, clean: false, debug:true});

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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  //The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

//function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);
	socket.on('ws-iot-network', emitFunction);
	//setInterval(() =>socket.broadcast.emit('ServerToClient', getRandomInt(0, 100)), 1000);

  let randNum;
  randNum = getRandomInt(0, 100);
  socket.broadcast.emit('ServerToClient', randNum);

	function emitFunction(data){
		//socket.broadcast.emit('ServerToClient', data);
		//console.log(data);
		//setInterval(() => socket.broadcast.emit('ServerToClient', new Date().toTimeString()), 1000);

		setInterval(function(){
			//get a random value, and assign it a new variable
			let randNum;
			randNum = getRandomInt(0, 100);
			socket.broadcast.emit('ServerToClient', randNum);
			//console.log(randNum);
		},1000);
	}
}

//MQTT
client.on('connect', function() {
    client.subscribe(MQTT_TOPIC, { qos: 2 });
    client.publish(MQTT_TOPIC, '1000');
});

client.on('message', function (topic, message) {
    // message is Buffer
    let getMessage = message.toString();
    let getNum = parseInt(getMessage);
    console.log(getNum);
    io.sockets.emit('ServerToClient', getNum);
    //io.sockets.on('connection', function (socket) {
    //  socket.broadcast.emit(getNum);
    //});
    //client.end();
});

/*
client.on('error', function(){
    console.log("ERROR")
    client.end()
})
client.on('offline', function() {
    console.log("offline");
});

client.on('reconnect', function() {
    console.log("reconnect");
});
*/
