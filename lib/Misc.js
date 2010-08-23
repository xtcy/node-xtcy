// sys module for certain functions like "print" and?
var sys = require('sys');

// load our own character module
var Character = require('../lib/Character.js');


exports.toProperCase = function(s) {
	return s.toLowerCase().replace(/^(.)|\s(.)/g, function($1) { return $1.toUpperCase(); });
}


//
exports.message = function(player, target, room, string) {

	if (room) {
		for (i in players) {
			if (players[i].room == room && i != player && i != target) {
				players[i].write(string + "\r\n");
			}
		}
	}

	players[player].write(string + "\r\n");
	players[player].write(Character.prompt(player));

	if (target) {
		players[target].write(string + "\r\n");
		players[target].write(Character.prompt(target));
	}
}


// function(<search string>, <player>, <room>, <return error message?>)
exports.GetPlayer = function(search, player, room, error) {
	for (name in players) {
		// check if the search string matches any name in player array
		if (name.match("^" + exports.toProperCase(search))) {

			// if room equal to "room" then both players must be in the same room
			if (room == "room" && players[name].room == players[player].room) {
				return name;
			}

			// if room equal to "zone" then both players must be in the same zone -- unnecessary variables needed in player array
			//else if (room == "zone" && players[name].zone == players[player].zone) {
			//	return name;
			//}
		}
	};
	if (error && players[player]) {players[player].write("You cant find that target.\r\n")};
	return false;
}


// 
exports.balSet = function(player, balance, value, timer) {
	players[player][balance] = value;
	// Always make the timer vary up too 200 MS
	setTimeout(balRes, timer + Math.floor(Math.random()*200), player, balance)	
}

function balRes(player, balance) {
	players[player][balance] = true;
	exports.message(player, false, false, exports.toProperCase(balance) + " has been recoved.")
}