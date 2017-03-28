var net = require("net");
var cluster = require("cluster");
var os = require("os");
if(cluster.isMaster){
	for(var i = 0; i < os.cpus().length; i++){
		cluster.fork();
	}
	var server = net.createServer();
	server.on("listening", function(){
		console.log("Server listening at 8880.");
	});
	server.on("connection", function(socket){
		cluster.send("Connection established");
		console.log("Connection established on: " + socket.address());
	});
	server.listen(8880);
}
else if(cluster.isWorker){
	cluster.on("message", function(err, msg){
		if(err == null || err == undefined){
			console.log("Error in child while reading message: " + err);
		}else{
			console.log(msg);
		}
	});
}