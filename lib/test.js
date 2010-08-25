server.addListener("prompt", function(socket) {
	sys.print("testar");
	socket.write("omg\r\n");
});