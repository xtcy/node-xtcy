// sys module for certain functions like "print" and?
var sys = require('sys');

players = new Array();

exports.load = function(name, socket) {

	players[name] = socket;
	players[name].health = 100;
	players[name].balance = true;
	players[name].login = true;
	players[name].room = 3215;


	players[name].emit("command", this.name);


};


exports.save = function(name) {
};


exports.prompt = function(player) {
	return("H: " + Math.floor(players[player].health + 0,9999) + " <" + players[player].balance + ">\r\n");
}