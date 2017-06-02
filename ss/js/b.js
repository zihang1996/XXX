const express=require("express");
const io=require("socket.io");
const http=require("http");
var app=express();

app.use(express.static("../"));


var b=http.createServer(app).listen(5000,function(){
	console.log("listen 5000...");
});


var io1=io.listen(b);


io1.on('connection', function(socket){
  socket.on("hcclient",function(data){
  	 if(typeof socket.user =="undefined"){
  	 	  socket.user=data;
  	 	  io1.emit("sys",data+"进入聊天室");
  	 }
  	 else{
  	 	  io1.emit("sys",socket.user+"说:"+data);
  	 }
  	 
  	//socket.broadcast.emit("sys","我已收到"+data); //除了自已以外的连接都能收到
  	//io1.emit("sys","我已收到"+data);
  })
  socket.on("img",function(data){
  		  io1.emit("simg",data,socket.user);
  })
  socket.on("disconnect",function(){
  	    socket.broadcast.emit("sys",socket.user+"悄悄的离开了聊天室");
  })
  
});
