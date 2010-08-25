// load global modules
sys = require('sys');
char = require('./lib/character.js');

// load file specific modules
var net = require('net');
var fs = require('fs');

// load all commands
fs.readdir('./cmd/', function(err, files) {for(var i = 0; i < files.length; i++) {require('./cmd/' + files[i]);}});

// Server is global so other objects can easily: server.addListener('command', function(arg1, arg2) {});
server = net.createServer(function (socket) {

	socket.setEncoding("utf8");

	socket.on("connect", function () {

		socket.write(" You ip is: " + socket.remoteAddress + "\r\n");
		socket.write(" Please state your name: \r\n");

	});

	socket.on("data", function (data) {

		if (!socket.logged) {
			char.login(this, data);
		} else {
			data = data.replace(/[\r\n]+$/, "").split(/[\n\r]+/g)
			for (var key in data) {
				socket.write("Sent: " + data[key] + "\r\n")
				server.emit("command", data[key], this);
			}
			server.emit("prompt", socket);
		}

	});

	socket.on("end", function () {
		socket.end();
	});


})
server.listen(7000, "127.0.0.1");



