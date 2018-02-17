'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'public/index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use('/js', express.static(__dirname + '/js'));
app.use('/Blob', express.static(__dirname + 'public/Blob'));
app.use('/Cubes', express.static(__dirname + 'public/Cubes'));
app.use('/sketch', express.static(__dirname + 'public/sketch'));
app.use('/sockets', express.static(__dirname + 'public/sockets'));

	app.all('/*', function(req, res, next) {
	    // Just send the index.html for other files to support HTML5Mode
	    res.sendFile('public/index.html', { root: __dirname });
	});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('ServerToClient', new Date().toTimeString()), 1000);
