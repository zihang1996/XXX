var fs=require("fs");
var http=require("http");
var ws=require("nodejs-websocket");
var express=require("express");
var app=express();
app.use(express.static('../'))



http.createServer(app).listen(4000);
console.log("listen 4000..");
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log(str)
		//conn.sendText(str.toUpperCase()+"!!!")
		if(!conn.user){
			conn.user=str;
			broadcast(server,"欢迎"+str+"进入聊天室");
			
		}
		else{
			var d=new Date();
			var time=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
			broadcast(server,conn.user+"说 ("+time+"):"+str);
		}
		
	})
	
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
}).listen(8002)


function broadcast(server, msg) {
	server.connections.forEach(function (conn) {
		conn.sendText(msg)
	})
} 