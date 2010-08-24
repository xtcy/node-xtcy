sys.print("loaded " + __filename + "\r\n")

server.addListener('command', function(cmd, player) {
	if (cmd.match("^kick")) {
		player.write("sent kick: " + cmd);
	}
});