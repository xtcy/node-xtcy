// net module for TCP connection?
var net = require('net');
// sys module for certain functions like "print" and?
var sys = require('sys');


// load our own character module
var Character = require('./lib/Character.js');
// load our own misc module
var Misc = require('./lib/Misc.js');


server = net.createServer(function (socket) {

	// standard UTF-8 encoding
	socket.setEncoding("utf8");

	// On connect do this
	socket.addListener("connect", function () {

		sys.print(socket.remoteAddress + " connected.\n")
		socket.write(" Welcome back " + socket.remoteAddress + "\n");
		socket.write(" What's your name?\r\n");

	});

	// On data recieved do
	socket.addListener("data", function (data) {

		// remove newlines from data recieved
		data = data.replace(new RegExp( "\\n", "g" ), "");
		data = data.replace(new RegExp( "\\r", "g" ), "");

		// handle Login
		if (!socket.login) {

			data = Misc.toProperCase(data);

			Character.load(data, socket);

			this.name = data;
			players[this.name].write(" Welcome to our world, " + players[this.name].name + "!\r\n\r\n");


		// parse command and -always- show prompt
		} else {


			// emits command to all the listeners with two arguments <command>, <player>
			server.emit("command", data, this.name);


		}
	});



    
	// When disconnected end socket
	socket.addListener("end", function () {
		sys.print(socket.remoteAddress + " disconnected.\n")
		socket.end();
	});


});
server.listen(7000);



// 
require('./cmds/Punch.js');