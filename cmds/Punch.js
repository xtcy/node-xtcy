// sys module for certain functions like "print" and?
var sys = require('sys');

// load our own misc module
var Misc = require('../lib/Misc.js');

server.on("command", function(cmd, player) {
	if (cmd.substring(0,6) == "punch ") {

		if (!players[player].balance) {Misc.message(player, false, false, "That attack requires balance.");return false};

		// Set the target if it can find, otherwise display error message if last argument is true.
		var target = Misc.GetPlayer(cmd.substring(6), player, "room", true);

		if (target) {

			players[target].health -= 5 * (Math.random()*10);
			Misc.balSet(player, "balance", false, 2000)

			Misc.message(player, target, players[player].room, "$player punched $target right in the face.")

		}

	}
});