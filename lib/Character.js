sys.print("loaded " + __filename + "\r\n");


exports.login = function(socket, name) {

	// load into to memory of char[name] object, and link with the correct socket
	char[name] = socket;
	char[name].name = name;
	char[name].health = 100;
	char[name].logged = true;

	sys.print(char[name].name + " logged in.");

}